import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

function encodeEntities(str: string): string {
  return str.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
    return map[c] || c
  })
}

function decodeEntities(str: string): string {
  const el = document.createElement('textarea')
  el.innerHTML = str
  return el.value
}

export default function HtmlEntityTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const process = (text: string, m: string) => {
    setInput(text)
    if (!text) { setOutput(''); return }
    setOutput(m === 'encode' ? encodeEntities(text) : decodeEntities(text))
  }

  return (
    <ToolPage title="HTML Entity Encode/Decode" description="Encode or decode HTML entities">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <Tabs value={mode} onValueChange={(v) => { setMode(v); process(input, v) }}>
        <TabsList>
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
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
