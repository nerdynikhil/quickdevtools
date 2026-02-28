import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

type Lang = 'json' | 'html' | 'xml' | 'csv' | 'shell'

function escapeString(input: string, lang: Lang): string {
  switch (lang) {
    case 'json':
      return JSON.stringify(input).slice(1, -1)
    case 'html':
      return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    case 'xml':
      return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    case 'csv':
      return `"${input.replace(/"/g, '""')}"`
    case 'shell':
      return `'${input.replace(/'/g, "'\\''")}'`
  }
}

function unescapeString(input: string, lang: Lang): string {
  switch (lang) {
    case 'json':
      try { return JSON.parse(`"${input}"`) } catch { return 'Invalid JSON escape sequence' }
    case 'html':
    case 'xml':
      return input
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
    case 'csv':
      return input.replace(/^"|"$/g, '').replace(/""/g, '"')
    case 'shell':
      return input.replace(/^'|'$/g, '').replace(/'\\''/, "'")
  }
}

export default function StringEscapeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [lang, setLang] = useState<Lang>('json')
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape')

  const process = (text: string, l: Lang, m: 'escape' | 'unescape') => {
    setInput(text)
    if (!text) { setOutput(''); return }
    setOutput(m === 'escape' ? escapeString(text, l) : unescapeString(text, l))
  }

  return (
    <ToolPage title="String Escape / Unescape" description="Escape or unescape strings for various languages">
      <div className="flex gap-2 mb-2 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Language</Label>
          <Select value={lang} onValueChange={(v) => { setLang(v as Lang); process(input, v as Lang, mode) }}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="shell">Shell</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Mode</Label>
          <Select value={mode} onValueChange={(v) => { setMode(v as 'escape' | 'unescape'); process(input, lang, v as 'escape' | 'unescape') }}>
            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="escape">Escape</SelectItem>
              <SelectItem value="unescape">Unescape</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea
            placeholder="Enter string to escape/unescape..."
            value={input}
            onChange={(e) => process(e.target.value, lang, mode)}
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
