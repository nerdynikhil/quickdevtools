import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import CopyButton from '@/components/shared/CopyButton'
import { faker } from '@faker-js/faker'

const FIELDS = [
  { id: 'name', label: 'Name', gen: () => faker.person.fullName() },
  { id: 'email', label: 'Email', gen: () => faker.internet.email() },
  { id: 'phone', label: 'Phone', gen: () => faker.phone.number() },
  { id: 'address', label: 'Address', gen: () => faker.location.streetAddress() },
  { id: 'city', label: 'City', gen: () => faker.location.city() },
  { id: 'country', label: 'Country', gen: () => faker.location.country() },
  { id: 'company', label: 'Company', gen: () => faker.company.name() },
  { id: 'job', label: 'Job Title', gen: () => faker.person.jobTitle() },
  { id: 'avatar', label: 'Avatar URL', gen: () => faker.image.avatar() },
  { id: 'uuid', label: 'UUID', gen: () => faker.string.uuid() },
  { id: 'date', label: 'Date', gen: () => faker.date.past().toISOString().split('T')[0] },
  { id: 'sentence', label: 'Sentence', gen: () => faker.lorem.sentence() },
] as const

export default function MockDataGeneratorTool() {
  const [count, setCount] = useState(5)
  const [selected, setSelected] = useState<Set<string>>(new Set(['name', 'email', 'phone', 'city']))
  const [output, setOutput] = useState('')

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const generate = () => {
    const activeFields = FIELDS.filter((f) => selected.has(f.id))
    if (activeFields.length === 0) return
    const data = Array.from({ length: count }, () => {
      const record: Record<string, string> = {}
      for (const field of activeFields) {
        record[field.id] = field.gen()
      }
      return record
    })
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <ToolPage title="Mock Data Generator" description="Generate realistic mock data for testing">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-1">
            <Label>Count</Label>
            <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
          </div>
          <Button onClick={generate}>Generate</Button>
          <CopyButton text={output} />
        </div>
        <div>
          <Label className="mb-2 block">Fields</Label>
          <div className="flex flex-wrap gap-4">
            {FIELDS.map((f) => (
              <div key={f.id} className="flex items-center gap-2">
                <Checkbox id={f.id} checked={selected.has(f.id)} onCheckedChange={() => toggle(f.id)} />
                <Label htmlFor={f.id} className="text-sm">{f.label}</Label>
              </div>
            ))}
          </div>
        </div>
        {output && (
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        )}
      </div>
    </ToolPage>
  )
}
