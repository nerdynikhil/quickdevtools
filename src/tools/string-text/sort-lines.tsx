import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function SortLinesTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseInsensitive, setCaseInsensitive] = useState(false)

  const sort = (mode: 'alpha' | 'alpha-reverse' | 'numeric' | 'length' | 'length-reverse' | 'random') => {
    const lines = input.split('\n')
    let sorted: string[]
    switch (mode) {
      case 'alpha':
        sorted = [...lines].sort((a, b) =>
          caseInsensitive ? a.toLowerCase().localeCompare(b.toLowerCase()) : a.localeCompare(b)
        )
        break
      case 'alpha-reverse':
        sorted = [...lines].sort((a, b) =>
          caseInsensitive ? b.toLowerCase().localeCompare(a.toLowerCase()) : b.localeCompare(a)
        )
        break
      case 'numeric':
        sorted = [...lines].sort((a, b) => parseFloat(a) - parseFloat(b))
        break
      case 'length':
        sorted = [...lines].sort((a, b) => a.length - b.length)
        break
      case 'length-reverse':
        sorted = [...lines].sort((a, b) => b.length - a.length)
        break
      case 'random':
        sorted = [...lines].sort(() => Math.random() - 0.5)
        break
    }
    setOutput(sorted.join('\n'))
  }

  return (
    <ToolPage title="Sort Lines" description="Sort lines alphabetically, numerically, or by length">
      <div className="flex gap-2 mb-2 flex-wrap items-center">
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
        <div className="flex items-center gap-2 ml-auto">
          <Checkbox id="case-insensitive" checked={caseInsensitive} onCheckedChange={(v) => setCaseInsensitive(!!v)} />
          <Label htmlFor="case-insensitive" className="text-sm">Case insensitive</Label>
        </div>
      </div>
      <Textarea
        placeholder="Enter text (one item per line)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[150px] font-mono"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={() => sort('alpha')}>A → Z</Button>
        <Button variant="outline" size="sm" onClick={() => sort('alpha-reverse')}>Z → A</Button>
        <Button variant="outline" size="sm" onClick={() => sort('numeric')}>Numeric</Button>
        <Button variant="outline" size="sm" onClick={() => sort('length')}>Short → Long</Button>
        <Button variant="outline" size="sm" onClick={() => sort('length-reverse')}>Long → Short</Button>
        <Button variant="outline" size="sm" onClick={() => sort('random')}>Shuffle</Button>
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[150px] font-mono mt-4" />
      )}
    </ToolPage>
  )
}
