import { useState, useEffect, useRef } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ClearButton from '@/components/shared/ClearButton'
import QRCode from 'qrcode'

export default function QrCodeGeneratorTool() {
  const [input, setInput] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input.trim() || !canvasRef.current) {
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, 300, 300)
      return
    }
    setError('')
    QRCode.toCanvas(canvasRef.current, input, { width: 300, margin: 2 }, (err) => {
      if (err) setError(err.message)
    })
  }, [input])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <ToolPage title="QR Code Generator" description="Generate QR codes from text or URLs">
      <div className="flex gap-2 mb-2">
        <Button size="sm" onClick={download} disabled={!input.trim()}>Download PNG</Button>
        <ClearButton onClick={() => setInput('')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1 block">Text or URL</Label>
          <Textarea
            placeholder="Enter text or URL to generate QR code..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px]"
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <div className="flex items-center justify-center">
          <canvas ref={canvasRef} className="rounded-lg border" />
        </div>
      </div>
    </ToolPage>
  )
}
