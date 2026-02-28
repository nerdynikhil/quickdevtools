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
  address: { street: "123 Main St", city: "Springfield" }
}, null, 2)

function toPascalCase(s: string): string {
  return s.replace(/(^|[_-])([a-z])/g, (_, __, c) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase())
}

function jsonToGo(json: string, rootName: string): string {
  const parsed = JSON.parse(json)
  const structs: string[] = []

  function getGoType(value: unknown, key: string): string {
    if (value === null) return 'interface{}'
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]interface{}'
      return '[]' + getGoType(value[0], key.replace(/s$/, ''))
    }
    if (typeof value === 'object') {
      const structName = toPascalCase(key)
      generateStruct(value as Record<string, unknown>, structName)
      return structName
    }
    switch (typeof value) {
      case 'string': return 'string'
      case 'number': return Number.isInteger(value) ? 'int' : 'float64'
      case 'boolean': return 'bool'
      default: return 'interface{}'
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string) {
    const lines: string[] = [`type ${name} struct {`]
    for (const [key, value] of Object.entries(obj)) {
      const goType = getGoType(value, key)
      const fieldName = toPascalCase(key)
      lines.push(`\t${fieldName} ${goType} \`json:"${key}"\``)
    }
    lines.push('}')
    structs.push(lines.join('\n'))
  }

  const data = Array.isArray(parsed) ? (parsed[0] || {}) : parsed
  generateStruct(data as Record<string, unknown>, rootName)
  return structs.reverse().join('\n\n')
}

export default function JsonToGoStructTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [rootName, setRootName] = useState('Root')
  const [error, setError] = useState('')

  const convert = (text: string) => {
    setError('')
    if (!text.trim()) { setOutput(''); return }
    try { setOutput(jsonToGo(text, rootName)) } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <ToolPage title="JSON → Go Struct" description="Generate Go structs from JSON">
      <div className="flex gap-2 mb-2 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Struct Name</Label>
          <Input value={rootName} onChange={(e) => setRootName(e.target.value)} className="w-40" />
        </div>
        <Button size="sm" onClick={() => convert(input)}>Convert</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); setTimeout(() => convert(SAMPLE), 0) }} />
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
          <Label className="mb-1 block">Go Struct Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
