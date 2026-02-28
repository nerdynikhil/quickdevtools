import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import yaml from 'js-yaml'

export default function JsonYamlTool() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [error, setError] = useState('')

  const jsonToYaml = () => {
    setError('')
    try {
      const parsed = JSON.parse(left)
      setRight(yaml.dump(parsed, { lineWidth: -1 }))
    } catch (e) { setError((e as Error).message) }
  }

  const yamlToJson = () => {
    setError('')
    try {
      const parsed = yaml.load(right)
      setLeft(JSON.stringify(parsed, null, 2))
    } catch (e) { setError((e as Error).message) }
  }

  return (
    <ToolPage title="JSON ↔ YAML" description="Convert between JSON and YAML formats">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={jsonToYaml}>JSON → YAML</Button>
        <Button size="sm" variant="outline" onClick={yamlToJson}>YAML → JSON</Button>
        <ClearButton onClick={() => { setLeft(''); setRight(''); setError('') }} />
      </div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label>JSON</Label>
            <CopyButton text={left} />
          </div>
          <Textarea placeholder="Paste JSON here..." value={left} onChange={(e) => setLeft(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label>YAML</Label>
            <CopyButton text={right} />
          </div>
          <Textarea placeholder="Paste YAML here..." value={right} onChange={(e) => setRight(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
