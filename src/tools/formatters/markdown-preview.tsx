import { useState, useMemo } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import { marked } from 'marked'

const SAMPLE = `# Hello World

This is a **Markdown** preview tool.

## Features

- Real-time preview
- Syntax highlighting
- GitHub Flavored Markdown

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote

| Column 1 | Column 2 |
|----------|----------|
| Row 1    | Data     |
| Row 2    | Data     |

[Link to Google](https://google.com)
`

export default function MarkdownPreviewTool() {
  const [input, setInput] = useState('')

  const html = useMemo(() => {
    if (!input) return ''
    try {
      return marked.parse(input, { async: false }) as string
    } catch {
      return '<p class="text-destructive">Failed to parse Markdown</p>'
    }
  }, [input])

  return (
    <ToolPage title="Markdown Preview" description="Preview Markdown with syntax highlighting">
      <div className="flex gap-2 mb-2">
        <SampleDataButton onClick={() => setInput(SAMPLE)} />
        <ClearButton onClick={() => setInput('')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Markdown</Label>
          <Textarea
            placeholder="Write Markdown here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
        </div>
        <div>
          <Label className="mb-1 block">Preview</Label>
          <div
            className="prose prose-sm dark:prose-invert max-w-none rounded-lg border p-4 min-h-[400px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolPage>
  )
}
