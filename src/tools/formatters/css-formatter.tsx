import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = '.container{display:flex;flex-direction:column;gap:1rem;padding:2rem}.header{background:#333;color:white;padding:1rem}.header h1{margin:0;font-size:1.5rem}'

function formatCss(css: string, indent = '  '): string {
  let formatted = ''
  let level = 0
  const chars = css.replace(/\s+/g, ' ').trim()

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]
    if (c === '{') {
      formatted += ' {\n'
      level++
      // skip whitespace after brace
      while (i + 1 < chars.length && chars[i + 1] === ' ') i++
    } else if (c === '}') {
      level--
      formatted += indent.repeat(Math.max(0, level)) + '}\n'
      if (level > 0) formatted += '\n'
      while (i + 1 < chars.length && chars[i + 1] === ' ') i++
    } else if (c === ';') {
      formatted += ';\n'
      while (i + 1 < chars.length && chars[i + 1] === ' ') i++
      if (i + 1 < chars.length && chars[i + 1] !== '}') {
        formatted += indent.repeat(level)
      }
    } else {
      if (formatted.endsWith('{\n') || formatted.endsWith('}\n') || formatted === '') {
        if (c !== ' ') formatted += indent.repeat(level)
      }
      formatted += c
    }
  }
  return formatted.trim()
}

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

export default function CssFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <ToolPage title="CSS Formatter / Minifier" description="Format or minify CSS stylesheets">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => setOutput(formatCss(input))}>Format</Button>
        <Button size="sm" variant="outline" onClick={() => setOutput(minifyCss(input))}>Minify</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); setOutput(formatCss(SAMPLE)) }} />
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste CSS here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
