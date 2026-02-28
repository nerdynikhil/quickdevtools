import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ClearButton from '@/components/shared/ClearButton'
import { diffLines } from 'diff'

export default function TextDiffTool() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [result, setResult] = useState<{ value: string; added?: boolean; removed?: boolean }[]>([])

  const compare = () => {
    setResult(diffLines(left, right))
  }

  return (
    <ToolPage title="Text Diff / Compare" description="Compare two texts and highlight differences">
      <div className="flex gap-2 mb-2">
        <Button onClick={compare}>Compare</Button>
        <ClearButton onClick={() => { setLeft(''); setRight(''); setResult([]) }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Original</Label>
          <Textarea
            placeholder="Paste original text..."
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="min-h-[200px] font-mono"
          />
        </div>
        <div>
          <Label className="mb-1 block">Modified</Label>
          <Textarea
            placeholder="Paste modified text..."
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="min-h-[200px] font-mono"
          />
        </div>
      </div>
      {result.length > 0 && (
        <div className="mt-4 rounded-lg border overflow-auto max-h-[400px]">
          <pre className="p-4 text-sm font-mono">
            {result.map((part, i) => (
              <span
                key={i}
                className={
                  part.added
                    ? 'bg-green-500/20 text-green-400'
                    : part.removed
                      ? 'bg-red-500/20 text-red-400'
                      : 'text-foreground'
                }
              >
                {part.value}
              </span>
            ))}
          </pre>
        </div>
      )}
    </ToolPage>
  )
}
