import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'

export default function PxRemConverterTool() {
  const [baseFontSize, setBaseFontSize] = useState(16)
  const [px, setPx] = useState('')
  const [rem, setRem] = useState('')

  const fromPx = (value: string) => {
    setPx(value)
    const n = parseFloat(value)
    if (isNaN(n)) { setRem(''); return }
    setRem((n / baseFontSize).toFixed(4).replace(/\.?0+$/, ''))
  }

  const fromRem = (value: string) => {
    setRem(value)
    const n = parseFloat(value)
    if (isNaN(n)) { setPx(''); return }
    setPx((n * baseFontSize).toFixed(2).replace(/\.?0+$/, ''))
  }

  return (
    <ToolPage title="Px ↔ Rem Converter" description="Convert between pixels and rem units">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label>Base Font Size (px)</Label>
          <Input
            type="number"
            min={1}
            value={baseFontSize}
            onChange={(e) => {
              const v = Number(e.target.value)
              setBaseFontSize(v)
              if (px) {
                const n = parseFloat(px)
                if (!isNaN(n)) setRem((n / v).toFixed(4).replace(/\.?0+$/, ''))
              }
            }}
            className="w-24"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>Pixels (px)</Label>
              <CopyButton text={px ? `${px}px` : ''} />
            </div>
            <Input
              placeholder="16"
              value={px}
              onChange={(e) => fromPx(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>Rem</Label>
              <CopyButton text={rem ? `${rem}rem` : ''} />
            </div>
            <Input
              placeholder="1"
              value={rem}
              onChange={(e) => fromRem(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <Label className="text-sm block mb-2">Quick Reference</Label>
          <div className="grid grid-cols-4 gap-2 text-sm font-mono">
            {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map((p) => (
              <div key={p} className="flex justify-between">
                <span className="text-muted-foreground">{p}px</span>
                <span>{(p / baseFontSize).toFixed(3).replace(/\.?0+$/, '')}rem</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
