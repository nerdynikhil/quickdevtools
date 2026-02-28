import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = JSON.stringify({name:"John Doe",age:30,email:"john@example.com",address:{street:"123 Main St",city:"Springfield",state:"IL"},hobbies:["reading","gaming","hiking"],active:true})

export default function JsonFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (text: string, indent: number | null) => {
    setError('')
    try {
      const parsed = JSON.parse(text)
      setOutput(indent === null ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  return (
    <ToolPage title="JSON Formatter / Validator" description="Format, validate, and minify JSON">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => format(input, 2)}>Format (2 spaces)</Button>
        <Button size="sm" variant="outline" onClick={() => format(input, 4)}>4 spaces</Button>
        <Button size="sm" variant="outline" onClick={() => format(input, null)}>Minify</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); format(SAMPLE, 2) }} />
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea
            placeholder="Paste JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
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
