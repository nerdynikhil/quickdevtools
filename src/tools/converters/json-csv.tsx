import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import Papa from 'papaparse'

export default function JsonCsvTool() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [error, setError] = useState('')

  const jsonToCsv = () => {
    setError('')
    try {
      const data = JSON.parse(left)
      if (!Array.isArray(data)) throw new Error('JSON must be an array of objects')
      setRight(Papa.unparse(data))
    } catch (e) { setError((e as Error).message) }
  }

  const csvToJson = () => {
    setError('')
    try {
      const result = Papa.parse(right.trim(), { header: true, skipEmptyLines: true })
      if (result.errors.length > 0) throw new Error(result.errors[0].message)
      setLeft(JSON.stringify(result.data, null, 2))
    } catch (e) { setError((e as Error).message) }
  }

  return (
    <ToolPage title="JSON ↔ CSV" description="Convert between JSON and CSV formats">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={jsonToCsv}>JSON → CSV</Button>
        <Button size="sm" variant="outline" onClick={csvToJson}>CSV → JSON</Button>
        <ClearButton onClick={() => { setLeft(''); setRight(''); setError('') }} />
      </div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label>JSON</Label>
            <CopyButton text={left} />
          </div>
          <Textarea placeholder='Paste JSON array here...\n[{"name":"John","age":30}]' value={left} onChange={(e) => setLeft(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label>CSV</Label>
            <CopyButton text={right} />
          </div>
          <Textarea placeholder="Paste CSV here..." value={right} onChange={(e) => setRight(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
