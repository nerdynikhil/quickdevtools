import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import { jwtDecode } from 'jwt-decode'

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

function decodeJwtParts(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Invalid JWT format (expected 3 parts)')

  const header = JSON.parse(atob(parts[0]))
  const payload = jwtDecode(token)

  return { header, payload, signature: parts[2] }
}

export default function JwtDecoderTool() {
  const [input, setInput] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')

  const decode = (token: string) => {
    setInput(token)
    setError('')
    if (!token.trim()) { setHeader(''); setPayload(''); return }
    try {
      const decoded = decodeJwtParts(token.trim())
      setHeader(JSON.stringify(decoded.header, null, 2))
      setPayload(JSON.stringify(decoded.payload, null, 2))
    } catch (e) {
      setError((e as Error).message)
      setHeader('')
      setPayload('')
    }
  }

  return (
    <ToolPage title="JWT Decoder" description="Decode and inspect JSON Web Tokens">
      <div className="flex gap-2 mb-2">
        <SampleDataButton onClick={() => decode(SAMPLE_JWT)} />
        <ClearButton onClick={() => { setInput(''); setHeader(''); setPayload(''); setError('') }} />
      </div>
      <div>
        <Label className="mb-1 block">JWT Token</Label>
        <Textarea
          placeholder="Paste JWT token here..."
          value={input}
          onChange={(e) => decode(e.target.value)}
          className="min-h-[80px] font-mono"
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
      {(header || payload) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label>Header</Label>
              <CopyButton text={header} />
            </div>
            <Textarea readOnly value={header} className="min-h-[150px] font-mono" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label>Payload</Label>
              <CopyButton text={payload} />
            </div>
            <Textarea readOnly value={payload} className="min-h-[150px] font-mono" />
          </div>
        </div>
      )}
    </ToolPage>
  )
}
