import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

export default function UrlEncodeDecodeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')
  const [error, setError] = useState('')

  const process = (text: string, m: string) => {
    setInput(text)
    setError('')
    if (!text) { setOutput(''); return }
    try {
      setOutput(m === 'encode' ? encodeURIComponent(text) : decodeURIComponent(text))
    } catch {
      setError('Invalid input')
      setOutput('')
    }
  }

  return (
    <ToolPage title="URL Encode / Decode" description="Encode or decode URL components">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
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
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-encoded text...'}
            value={input}
            onChange={(e) => process(e.target.value, mode)}
            className="min-h-[200px] font-mono"
          />
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[200px] font-mono" />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      </div>
    </ToolPage>
  )
}
