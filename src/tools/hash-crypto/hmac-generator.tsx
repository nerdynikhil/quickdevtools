import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

async function computeHmac(algo: string, message: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: algo },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function HmacGeneratorTool() {
  const [message, setMessage] = useState('')
  const [secret, setSecret] = useState('')
  const [algo, setAlgo] = useState<string>('SHA-256')
  const [output, setOutput] = useState('')

  const generate = async () => {
    if (!message || !secret) return
    setOutput(await computeHmac(algo, message, secret))
  }

  return (
    <ToolPage title="HMAC Generator" description="Generate HMAC signatures with a secret key">
      <div className="flex gap-2 mb-2 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Algorithm</Label>
          <Select value={algo} onValueChange={setAlgo}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ALGOS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generate}>Generate</Button>
        <ClearButton onClick={() => { setMessage(''); setSecret(''); setOutput('') }} />
        <CopyButton text={output} />
      </div>
      <div className="space-y-3">
        <div>
          <Label className="mb-1 block">Secret Key</Label>
          <Input
            placeholder="Enter secret key..."
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="font-mono"
          />
        </div>
        <div>
          <Label className="mb-1 block">Message</Label>
          <Textarea
            placeholder="Enter message to sign..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] font-mono"
          />
        </div>
        {output && (
          <div className="rounded-lg border p-3">
            <Label className="text-sm mb-1 block">HMAC ({algo})</Label>
            <code className="text-sm break-all text-muted-foreground">{output}</code>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
