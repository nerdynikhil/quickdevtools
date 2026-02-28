import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = 'function greet(name){const msg="Hello, "+name+"!";console.log(msg);return msg;}const result=greet("World");if(result){console.log("Success");}else{console.log("Failed");}'

function simpleJsFormat(code: string, indent = '  '): string {
  let result = ''
  let level = 0
  let inString = false
  let stringChar = ''
  let escaped = false

  const chars = code.replace(/\s+/g, ' ').trim()

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]

    if (escaped) {
      result += c
      escaped = false
      continue
    }

    if (c === '\\') {
      result += c
      escaped = true
      continue
    }

    if (inString) {
      result += c
      if (c === stringChar) inString = false
      continue
    }

    if (c === '"' || c === "'" || c === '`') {
      inString = true
      stringChar = c
      result += c
      continue
    }

    if (c === '{' || c === '(') {
      result += c === '{' ? ' {\n' : '(\n'
      level++
      result += indent.repeat(level)
      while (i + 1 < chars.length && chars[i + 1] === ' ') i++
    } else if (c === '}' || c === ')') {
      level = Math.max(0, level - 1)
      result += '\n' + indent.repeat(level) + c
      if (i + 1 < chars.length && chars[i + 1] !== ';' && chars[i + 1] !== ')' && chars[i + 1] !== ',') {
        // result += '\n' + indent.repeat(level)
      }
    } else if (c === ';') {
      result += ';\n' + indent.repeat(level)
      while (i + 1 < chars.length && chars[i + 1] === ' ') i++
    } else {
      result += c
    }
  }
  return result.trim()
}

function minifyJs(code: string): string {
  return code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
    .trim()
}

export default function JsTsFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <ToolPage title="JS/TS Formatter" description="Format JavaScript and TypeScript code">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => setOutput(simpleJsFormat(input))}>Format</Button>
        <Button size="sm" variant="outline" onClick={() => setOutput(minifyJs(input))}>Minify</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); setOutput(simpleJsFormat(SAMPLE)) }} />
        <ClearButton onClick={() => { setInput(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste JavaScript or TypeScript here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
