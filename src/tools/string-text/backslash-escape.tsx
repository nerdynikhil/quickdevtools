import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function escapeBackslash(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\0/g, '\\0')
}

function unescapeBackslash(input: string): string {
  return input
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\0/g, '\0')
    .replace(/\\\\/g, '\\')
}

export default function BackslashEscapeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('escape')

  const process = (text: string, m: string) => {
    setInput(text)
    if (!text) { setOutput(''); return }
    setOutput(m === 'escape' ? escapeBackslash(text) : unescapeBackslash(text))
  }

  return (
    <ToolPage title="Backslash Escape/Unescape" description="Escape or unescape backslash sequences">
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
