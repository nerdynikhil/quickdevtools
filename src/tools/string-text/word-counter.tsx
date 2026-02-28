import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import ClearButton from '@/components/shared/ClearButton'

export default function WordCounterTool() {
  const [text, setText] = useState('')

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0
  const lines = text.trim() ? text.split('\n').length : 0

  return (
    <ToolPage title="Word / Character Counter" description="Count words, characters, sentences, and paragraphs">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => setText('')} />
      </div>
      <Textarea
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px] font-mono"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {[
          ['Words', words],
          ['Characters', characters],
          ['Chars (no spaces)', charactersNoSpaces],
          ['Sentences', sentences],
          ['Paragraphs', paragraphs],
          ['Lines', lines],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border p-3 text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </ToolPage>
  )
}
