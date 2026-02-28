import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import yaml from 'js-yaml'

const SAMPLE = `name: John Doe
age: 30
address:
  street: 123 Main St
  city: Springfield
hobbies:
  - reading
  - gaming`

export default function YamlFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (text: string, indent = 2) => {
    setError('')
    if (!text.trim()) { setOutput(''); return }
    try {
      const parsed = yaml.load(text)
      setOutput(yaml.dump(parsed, { indent, lineWidth: -1 }))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  return (
    <ToolPage title="YAML Formatter" description="Format and validate YAML documents">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => format(input, 2)}>Format (2 spaces)</Button>
        <Button size="sm" variant="outline" onClick={() => format(input, 4)}>4 spaces</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); format(SAMPLE) }} />
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste YAML here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
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
