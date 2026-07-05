/**
 * Pre-render script for QuickDevTools
 *
 * After `vite build` produces the SPA in dist/, this script:
 * 1. Starts a local static server from dist/
 * 2. Uses Puppeteer to visit every route (from the tool registry)
 * 3. Captures the fully-rendered HTML (with correct <title>, <meta>, JSON-LD, SEO content)
 * 4. Writes each page as dist/<slug>/index.html
 *
 * This ensures Googlebot sees fully-rendered HTML on every page
 * instead of an empty <div id="root"></div>.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = resolve(__dirname, '../dist')

// Parse routes from sitemap.xml
function getRoutesFromSitemap() {
  const sitemapPath = resolve(DIST_DIR, 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml not found in dist/. Run vite build first.')
    process.exit(1)
  }

  const sitemap = readFileSync(sitemapPath, 'utf-8')
  const locRegex = /<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g
  const routes = []
  let match

  while ((match = locRegex.exec(sitemap)) !== null) {
    const path = match[1] || '/'
    routes.push(path)
  }

  return routes
}

// Simple static file server for dist/
function startServer(port) {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = resolve(DIST_DIR, '.' + (req.url === '/' ? '/index.html' : req.url))

      // SPA fallback: if the file doesn't exist, serve index.html
      if (!existsSync(filePath)) {
        // Try adding index.html for directory paths
        const withIndex = resolve(filePath, 'index.html')
        if (existsSync(withIndex)) {
          filePath = withIndex
        } else {
          filePath = resolve(DIST_DIR, 'index.html')
        }
      }

      const ext = filePath.split('.').pop()
      const contentTypes = {
        html: 'text/html',
        js: 'application/javascript',
        css: 'text/css',
        json: 'application/json',
        png: 'image/png',
        svg: 'image/svg+xml',
        xml: 'application/xml',
        txt: 'text/plain',
        woff2: 'font/woff2',
        woff: 'font/woff',
      }

      try {
        const content = readFileSync(filePath)
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
    })

    server.listen(port, () => {
      resolvePromise(server)
    })
  })
}

async function prerender() {
  const routes = getRoutesFromSitemap()
  console.log(`\n🔍 Found ${routes.length} routes to pre-render\n`)

  const PORT = 4173
  const server = await startServer(PORT)
  console.log(`📡 Static server running on http://localhost:${PORT}`)

  // Dynamic import of puppeteer
  let puppeteer
  try {
    puppeteer = await import('puppeteer')
  } catch {
    console.error('❌ puppeteer not found. Install it: npm install -D puppeteer')
    server.close()
    process.exit(1)
  }

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let rendered = 0
  let failed = 0

  for (const route of routes) {
    try {
      const page = await browser.newPage()

      // Block unnecessary resources for faster rendering
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const type = req.resourceType()
        if (['image', 'font', 'media'].includes(type)) {
          req.abort()
        } else {
          req.continue()
        }
      })

      const url = `http://localhost:${PORT}${route}`
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })

      // Wait a bit for React to fully render (useEffect hooks)
      await new Promise((r) => setTimeout(r, 500))

      // Get the full rendered HTML
      const html = await page.content()

      // Determine output path
      const cleanRoute = route === '/' ? '' : route.replace(/^\//, '')
      let outputPath

      if (cleanRoute === '') {
        // Homepage: overwrite dist/index.html
        outputPath = resolve(DIST_DIR, 'index.html')
      } else {
        // Tool pages: create dist/<slug>/index.html
        const dir = resolve(DIST_DIR, cleanRoute)
        mkdirSync(dir, { recursive: true })
        outputPath = resolve(dir, 'index.html')
      }

      writeFileSync(outputPath, html, 'utf-8')
      rendered++
      console.log(`  ✅ ${route}`)

      await page.close()
    } catch (err) {
      failed++
      console.error(`  ❌ ${route}: ${err.message}`)
    }
  }

  await browser.close()
  server.close()

  console.log(`\n📊 Pre-rendering complete: ${rendered} rendered, ${failed} failed\n`)

  if (failed > 0) {
    process.exit(1)
  }
}

prerender().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
