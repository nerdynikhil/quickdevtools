import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import { JSONPath } from 'jsonpath-plus'

const SAMPLE_JSON = JSON.stringify({
  store: {
    books: [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99 },
      { title: "1984", author: "George Orwell", price: 8.99 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", price: 12.99 },
    ],
    location: "Downtown"
  }
}, null, 2)

const SAMPLE_PATH = '$.store.books[*].title'

export default function JsonPathTool() {
  const [json, setJson] = useState('')
  const [path, setPath] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const evaluate = (j: string, p: string) => {
    setError('')
    if (!j.trim() || !p.trim()) { setOutput(''); return }
    try {
      const data = JSON.parse(j)
      const result = JSONPath({ path: p, json: data })
      setOutput(JSON.stringify(result, null, 2))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <ToolPage title="JSON Path Evaluator" description="Evaluate JSONPath expressions against JSON data">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => evaluate(json, path)}>Evaluate</Button>
        <SampleDataButton onClick={() => { setJson(SAMPLE_JSON); setPath(SAMPLE_PATH); evaluate(SAMPLE_JSON, SAMPLE_PATH) }} />
        <ClearButton onClick={() => { setJson(''); setPath(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <div className="space-y-3">
        <div>
          <Label className="mb-1 block">JSONPath Expression</Label>
          <Input
            placeholder="$.store.books[*].title"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="font-mono"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">JSON Data</Label>
            <Textarea placeholder="Paste JSON here..." value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[250px] font-mono text-sm" />
          </div>
          <div>
            <Label className="mb-1 block">Result</Label>
            <Textarea readOnly value={output} className="min-h-[250px] font-mono text-sm" />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
