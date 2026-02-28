import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = JSON.stringify({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true,
  tags: ["admin", "user"],
  address: { street: "123 Main St", city: "Springfield", zip: "62701" }
}, null, 2)

function jsonToTs(json: string, rootName: string): string {
  const parsed = JSON.parse(json)
  const interfaces: string[] = []

  function getType(value: unknown, name: string): string {
    if (value === null) return 'null'
    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]'
      const itemType = getType(value[0], name.replace(/s$/, ''))
      return `${itemType}[]`
    }
    if (typeof value === 'object') {
      const interfaceName = name.charAt(0).toUpperCase() + name.slice(1)
      generateInterface(value as Record<string, unknown>, interfaceName)
      return interfaceName
    }
    return typeof value
  }

  function generateInterface(obj: Record<string, unknown>, name: string) {
    const lines: string[] = [`interface ${name} {`]
    for (const [key, value] of Object.entries(obj)) {
      const type = getType(value, key)
      lines.push(`  ${key}: ${type};`)
    }
    lines.push('}')
    interfaces.push(lines.join('\n'))
  }

  generateInterface(
    Array.isArray(parsed) ? (parsed[0] as Record<string, unknown>) || {} : parsed,
    rootName
  )

  return interfaces.reverse().join('\n\n')
}

export default function JsonToTypescriptTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [rootName, setRootName] = useState('Root')
  const [error, setError] = useState('')

  const convert = (text: string) => {
    setError('')
    if (!text.trim()) { setOutput(''); return }
    try {
      setOutput(jsonToTs(text, rootName))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <ToolPage title="JSON → TypeScript" description="Generate TypeScript interfaces from JSON">
      <div className="flex gap-2 mb-2 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Root Interface Name</Label>
          <Input value={rootName} onChange={(e) => setRootName(e.target.value)} className="w-40" />
        </div>
        <Button size="sm" onClick={() => convert(input)}>Convert</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); setOutput(''); setTimeout(() => convert(SAMPLE), 0) }} />
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">JSON Input</Label>
          <Textarea placeholder="Paste JSON here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <Label className="mb-1 block">TypeScript Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
