import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <text x="50" y="55" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">SVG</text>
</svg>`

export default function SvgPreviewTool() {
  const [input, setInput] = useState('')

  const byteSize = new Blob([input]).size
  const formattedSize = byteSize < 1024
    ? `${byteSize} B`
    : `${(byteSize / 1024).toFixed(1)} KB`

  return (
    <ToolPage title="SVG Preview / Optimizer" description="Preview and optimize SVG files">
      <div className="flex gap-2 mb-2">
        <SampleDataButton onClick={() => setInput(SAMPLE)} />
        <ClearButton onClick={() => setInput('')} />
        <CopyButton text={input} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">SVG Code</Label>
          <Textarea
            placeholder="Paste SVG markup here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
          {input && (
            <p className="text-xs text-muted-foreground mt-1">Size: {formattedSize}</p>
          )}
        </div>
        <div>
          <Label className="mb-1 block">Preview</Label>
          <div
            className="rounded-lg border p-4 min-h-[300px] flex items-center justify-center bg-[repeating-conic-gradient(#80808020_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]"
            dangerouslySetInnerHTML={{ __html: input }}
          />
        </div>
      </div>
    </ToolPage>
  )
}
