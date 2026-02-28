import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import { format as formatSql } from 'sql-formatter'

const SAMPLE = 'SELECT users.name, users.email, orders.total FROM users INNER JOIN orders ON users.id = orders.user_id WHERE orders.total > 100 AND users.active = true ORDER BY orders.total DESC LIMIT 10;'

export default function SqlFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<'sql' | 'mysql' | 'postgresql' | 'sqlite'>('sql')
  const [error, setError] = useState('')

  const format = (text: string, lang: string) => {
    setError('')
    if (!text.trim()) { setOutput(''); return }
    try {
      setOutput(formatSql(text, { language: lang as 'sql' | 'mysql' | 'postgresql' | 'sqlite' }))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  return (
    <ToolPage title="SQL Formatter" description="Format SQL queries for readability">
      <div className="flex gap-2 mb-2 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Dialect</Label>
          <Select value={language} onValueChange={(v) => { setLanguage(v as typeof language); format(input, v) }}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sql">Standard SQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" onClick={() => format(input, language)}>Format</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); format(SAMPLE, language) }} />
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste SQL query here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
