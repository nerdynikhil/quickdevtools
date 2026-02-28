import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

async function computeHash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function HashGeneratorTool() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})

  const generate = async (text: string) => {
    setInput(text)
    if (!text) { setHashes({}); return }
    const results: Record<string, string> = {}
    for (const algo of ALGOS) {
      results[algo] = await computeHash(algo, text)
    }
    setHashes(results)
  }

  return (
    <ToolPage title="Hash Generator (MD5/SHA)" description="Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setInput(''); setHashes({}) }} />
      </div>
      <div>
        <Label className="mb-1 block">Input Text</Label>
        <Textarea
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => generate(e.target.value)}
          className="min-h-[100px] font-mono"
        />
      </div>
      {Object.keys(hashes).length > 0 && (
        <div className="space-y-3 mt-4">
          {ALGOS.map((algo) => (
            <div key={algo} className="rounded-lg border p-3">
              <div className="flex items-center justify-between mb-1">
                <Label className="text-sm font-medium">{algo}</Label>
                <CopyButton text={hashes[algo] || ''} />
              </div>
              <code className="text-xs break-all text-muted-foreground">{hashes[algo]}</code>
            </div>
          ))}
        </div>
      )}
    </ToolPage>
  )
}
