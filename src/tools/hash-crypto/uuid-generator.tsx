import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid'

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5)
  const [version, setVersion] = useState<'v4' | 'v7'>('v4')
  const [output, setOutput] = useState('')

  const generate = () => {
    const fn = version === 'v4' ? uuidv4 : uuidv7
    const uuids = Array.from({ length: count }, () => fn())
    setOutput(uuids.join('\n'))
  }

  return (
    <ToolPage title="UUID / GUID Generator" description="Generate UUIDs (v4 and v7)">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label>Count</Label>
          <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
        </div>
        <Button variant={version === 'v4' ? 'default' : 'outline'} size="sm" onClick={() => setVersion('v4')}>UUID v4</Button>
        <Button variant={version === 'v7' ? 'default' : 'outline'} size="sm" onClick={() => setVersion('v7')}>UUID v7</Button>
        <Button onClick={generate}>Generate</Button>
        <CopyButton text={output} />
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[200px] font-mono mt-4" />
      )}
    </ToolPage>
  )
}
