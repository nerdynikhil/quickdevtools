import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

function escapeUnicode(str: string): string {
  return [...str]
    .map((c) => {
      const code = c.codePointAt(0)!
      if (code > 127) {
        return code > 0xffff
          ? `\\u{${code.toString(16)}}`
          : `\\u${code.toString(16).padStart(4, '0')}`
      }
      return c
    })
    .join('')
}

function unescapeUnicode(str: string): string {
  return str
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

export default function UnicodeEscapeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('escape')

  const process = (text: string, m: string) => {
    setInput(text)
    if (!text) { setOutput(''); return }
    setOutput(m === 'escape' ? escapeUnicode(text) : unescapeUnicode(text))
  }

  return (
    <ToolPage title="Unicode Escape/Unescape" description="Escape or unescape Unicode characters">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <Tabs value={mode} onValueChange={(v) => { setMode(v); process(input, v) }}>
        <TabsList>
          <TabsTrigger value="escape">Escape</TabsTrigger>
          <TabsTrigger value="unescape">Unescape</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea
            placeholder="Enter text..."
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            className="min-h-[200px] font-mono"
          />
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[200px] font-mono" />
        </div>
      </div>
    </ToolPage>
  )
}
