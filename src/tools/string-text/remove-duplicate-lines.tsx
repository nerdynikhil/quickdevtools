import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseInsensitive, setCaseInsensitive] = useState(false)
  const [trimWhitespace, setTrimWhitespace] = useState(true)

  const removeDuplicates = () => {
    const lines = input.split('\n')
    const seen = new Set<string>()
    const result: string[] = []
    for (const line of lines) {
      let key = trimWhitespace ? line.trim() : line
      if (caseInsensitive) key = key.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        result.push(line)
      }
    }
    setOutput(result.join('\n'))
  }

  const removed = input.split('\n').length - output.split('\n').length

  return (
    <ToolPage title="Remove Duplicate Lines" description="Remove duplicate lines from text">
      <div className="flex gap-2 mb-2 flex-wrap items-center">
        <Button variant="default" size="sm" onClick={removeDuplicates}>Remove Duplicates</Button>
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <Checkbox id="case-i" checked={caseInsensitive} onCheckedChange={(v) => setCaseInsensitive(!!v)} />
            <Label htmlFor="case-i" className="text-sm">Case insensitive</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="trim-ws" checked={trimWhitespace} onCheckedChange={(v) => setTrimWhitespace(!!v)} />
            <Label htmlFor="trim-ws" className="text-sm">Trim whitespace</Label>
          </div>
        </div>
      </div>
      <Textarea
        placeholder="Enter text (one item per line)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[200px] font-mono"
      />
      {output && (
        <>
          <p className="text-sm text-muted-foreground mt-3">
            {removed > 0 ? `Removed ${removed} duplicate line${removed !== 1 ? 's' : ''}` : 'No duplicates found'}
          </p>
          <Textarea readOnly value={output} className="min-h-[200px] font-mono mt-2" />
        </>
      )}
    </ToolPage>
  )
}
