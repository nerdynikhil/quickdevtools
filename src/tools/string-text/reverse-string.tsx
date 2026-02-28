import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

export default function ReverseStringTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const reverseAll = () => setOutput([...input].reverse().join(''))
  const reverseLines = () => setOutput(input.split('\n').reverse().join('\n'))
  const reverseWords = () => setOutput(input.split(/\s+/).reverse().join(' '))
  const reverseEachLine = () =>
    setOutput(input.split('\n').map((line) => [...line].reverse().join('')).join('\n'))

  return (
    <ToolPage title="Reverse String / Lines" description="Reverse text or individual lines">
      <div className="flex gap-2 mb-2 flex-wrap">
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <Textarea
        placeholder="Enter your text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[150px] font-mono"
      />
      <div className="flex flex-wrap gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={reverseAll}>Reverse All Characters</Button>
        <Button variant="outline" size="sm" onClick={reverseLines}>Reverse Line Order</Button>
        <Button variant="outline" size="sm" onClick={reverseWords}>Reverse Word Order</Button>
        <Button variant="outline" size="sm" onClick={reverseEachLine}>Reverse Each Line</Button>
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[150px] font-mono mt-4" />
      )}
    </ToolPage>
  )
}
