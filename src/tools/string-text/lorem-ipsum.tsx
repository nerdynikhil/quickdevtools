import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CopyButton from '@/components/shared/CopyButton'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function generateWords(count: number): string {
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(WORDS[i % WORDS.length])
  }
  return result.join(' ')
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12)
  const words = generateWords(len)
  return words.charAt(0).toUpperCase() + words.slice(1) + '.'
}

function generateParagraph(): string {
  const sentences = 4 + Math.floor(Math.random() * 4)
  return Array.from({ length: sentences }, generateSentence).join(' ')
}

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')

  const generate = () => {
    switch (unit) {
      case 'paragraphs':
        setOutput(Array.from({ length: count }, generateParagraph).join('\n\n'))
        break
      case 'sentences':
        setOutput(Array.from({ length: count }, generateSentence).join(' '))
        break
      case 'words':
        setOutput(generateWords(count))
        break
    }
  }

  return (
    <ToolPage title="Lorem Ipsum Generator" description="Generate placeholder text">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label>Count</Label>
          <Input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-24" />
        </div>
        <div className="space-y-1">
          <Label>Unit</Label>
          <Select value={unit} onValueChange={(v) => setUnit(v as typeof unit)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Paragraphs</SelectItem>
              <SelectItem value="sentences">Sentences</SelectItem>
              <SelectItem value="words">Words</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generate}>Generate</Button>
        <CopyButton text={output} />
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[250px] mt-4" />
      )}
    </ToolPage>
  )
}
