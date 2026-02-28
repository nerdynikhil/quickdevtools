import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = '<root><person><name>John</name><age>30</age><address><city>Springfield</city></address></person></root>'

function formatXml(xml: string, indent = '  '): string {
  let formatted = ''
  let level = 0
  const nodes = xml.replace(/>\s*</g, '><').split(/(<[^>]+>)/).filter(Boolean)

  for (const node of nodes) {
    if (node.startsWith('</')) {
      level--
      formatted += indent.repeat(level) + node + '\n'
    } else if (node.startsWith('<') && !node.endsWith('/>') && !node.startsWith('<?')) {
      formatted += indent.repeat(level) + node + '\n'
      if (!node.includes('</')) level++
    } else if (node.endsWith('/>')) {
      formatted += indent.repeat(level) + node + '\n'
    } else {
      formatted += indent.repeat(level) + node + '\n'
    }
  }
  return formatted.trim()
}

function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').trim()
}

export default function XmlFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const format = (text: string, minify = false) => {
    setError('')
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'text/xml')
      const parseError = doc.querySelector('parsererror')
      if (parseError) {
        setError('Invalid XML: ' + parseError.textContent?.split('\n')[0])
        setOutput('')
        return
      }
      setOutput(minify ? minifyXml(text) : formatXml(text))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  return (
    <ToolPage title="XML Formatter / Validator" description="Format and validate XML documents">
      <div className="flex gap-2 mb-2 flex-wrap">
        <Button size="sm" onClick={() => format(input)}>Format</Button>
        <Button size="sm" variant="outline" onClick={() => format(input, true)}>Minify</Button>
        <SampleDataButton onClick={() => { setInput(SAMPLE); format(SAMPLE) }} />
        <ClearButton onClick={() => { setInput(''); setOutput(''); setError('') }} />
        <CopyButton text={output} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Input</Label>
          <Textarea placeholder="Paste XML here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <div>
          <Label className="mb-1 block">Output</Label>
          <Textarea readOnly value={output} className="min-h-[300px] font-mono text-sm" />
        </div>
      </div>
    </ToolPage>
  )
}
