import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

const conversions = [
  { label: 'UPPER CASE', fn: (s: string) => s.toUpperCase() },
  { label: 'lower case', fn: (s: string) => s.toLowerCase() },
  {
    label: 'Title Case',
    fn: (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()),
  },
  {
    label: 'Sentence case',
    fn: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: 'camelCase',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join('')
    },
  },
  {
    label: 'PascalCase',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    },
  },
  {
    label: 'snake_case',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w) => w.toLowerCase()).join('_')
    },
  },
  {
    label: 'CONSTANT_CASE',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w) => w.toUpperCase()).join('_')
    },
  },
  {
    label: 'kebab-case',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w) => w.toLowerCase()).join('-')
    },
  },
  {
    label: 'dot.case',
    fn: (s: string) => {
      const words = s.match(/[a-zA-Z0-9]+/g) || []
      return words.map((w) => w.toLowerCase()).join('.')
    },
  },
]

export default function TextCaseConverterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <ToolPage title="Text Case Converter" description="Convert text between camelCase, snake_case, UPPER, and more">
      <div className="flex gap-2 mb-2 flex-wrap">
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <Textarea
        placeholder="Enter your text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[120px] font-mono"
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {conversions.map((c) => (
          <Button key={c.label} variant="outline" size="sm" onClick={() => setOutput(c.fn(input))}>
            {c.label}
          </Button>
        ))}
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[120px] font-mono mt-4" />
      )}
    </ToolPage>
  )
}
