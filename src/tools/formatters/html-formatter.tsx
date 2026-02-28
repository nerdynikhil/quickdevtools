import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = '<div class="container"><h1>Hello World</h1><p>This is a <strong>test</strong> paragraph.</p><ul><li>Item 1</li><li>Item 2</li></ul></div>'

function formatHtml(html: string, indent = '  '): string {
  let formatted = ''
  let level = 0
  const voidElements = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'])
  const tokens = html.replace(/>\s*</g, '><').split(/(<[^>]+>)/).filter(Boolean)

  for (const token of tokens) {
    if (token.startsWith('</')) {
      level--
      formatted += indent.repeat(Math.max(0, level)) + token + '\n'
    } else if (token.startsWith('<')) {
      formatted += indent.repeat(level) + token + '\n'
      const tagName = token.match(/<\/?(\w+)/)?.[1]?.toLowerCase()
      if (tagName && !voidElements.has(tagName) && !token.endsWith('/>') && !token.includes('</')) {
        level++
      }
    } else {
      formatted += indent.repeat(level) + token.trim() + '\n'
    }
  }
  return formatted.trim()
}

function minifyHtml(html: string): string {
  return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim()
}

export default function HtmlFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <ToolPage title="HTML Formatter / Beautifier" description="Format and beautify HTML markup">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => setOutput(formatHtml(input))}>Format</Button>
        <Button size="sm" variant="outline" onClick={() => setOutput(minifyHtml(input))}>Minify</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); setOutput(formatHtml(SAMPLE)) }} />
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste HTML here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
