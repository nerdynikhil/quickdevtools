import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import { ulid } from 'ulid'

export default function UlidGeneratorTool() {
  const [count, setCount] = useState(5)
  const [output, setOutput] = useState('')

  const generate = () => {
    const ulids = Array.from({ length: count }, () => ulid())
    setOutput(ulids.join('\n'))
  }

  return (
    <ToolPage title="ULID Generator" description="Generate Universally Unique Lexicographically Sortable Identifiers">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label>Count</Label>
          <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
        </div>
        <Button onClick={generate}>Generate</Button>
        <CopyButton text={output} />
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[200px] font-mono mt-4" />
      )}
    </ToolPage>
  )
}
