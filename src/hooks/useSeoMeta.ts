import { useEffect } from 'react'

interface SeoMetaOptions {
    title?: string
    description?: string
    canonical?: string
    keywords?: string
    ogType?: string
    ogSiteName?: string
    ogTitle?: string
    ogDescription?: string
    ogUrl?: string
    ogImage?: string
    twitterCard?: string
    twitterTitle?: string
    twitterDescription?: string
    twitterImage?: string
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

export function useSeoMeta(opts: SeoMetaOptions) {
    useEffect(() => {
        if (opts.title) document.title = opts.title

        if (opts.description) setMeta('description', opts.description)
        if (opts.keywords) setMeta('keywords', opts.keywords)
        if (opts.canonical) setLink('canonical', opts.canonical)

        // Open Graph
        if (opts.ogType) setMeta('og:type', opts.ogType, 'property')
        if (opts.ogSiteName) setMeta('og:site_name', opts.ogSiteName, 'property')
        if (opts.ogTitle) setMeta('og:title', opts.ogTitle, 'property')
        if (opts.ogDescription) setMeta('og:description', opts.ogDescription, 'property')
        if (opts.ogUrl) setMeta('og:url', opts.ogUrl, 'property')
        if (opts.ogImage) setMeta('og:image', opts.ogImage, 'property')

        // Twitter
        if (opts.twitterCard) setMeta('twitter:card', opts.twitterCard)
        if (opts.twitterTitle) setMeta('twitter:title', opts.twitterTitle)
        if (opts.twitterDescription) setMeta('twitter:description', opts.twitterDescription)
        if (opts.twitterImage) setMeta('twitter:image', opts.twitterImage)
    })
}
