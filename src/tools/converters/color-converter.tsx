import { useState, useEffect } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

export default function ColorConverterTool() {
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState('')
  const [hsl, setHsl] = useState('')

  useEffect(() => {
    const c = hexToRgb(hex)
    if (c) {
      setRgb(`rgb(${c[0]}, ${c[1]}, ${c[2]})`)
      const [h, s, l] = rgbToHsl(c[0], c[1], c[2])
      setHsl(`hsl(${h}, ${s}%, ${l}%)`)
    }
  }, [hex])

  return (
    <ToolPage title="Color Converter / Picker" description="Convert colors between HEX, RGB, HSL">
      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="space-y-1">
            <Label>Color Picker</Label>
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="h-12 w-20 rounded border cursor-pointer"
            />
          </div>
          <div
            className="h-12 flex-1 rounded-lg border"
            style={{ backgroundColor: hex }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>HEX</Label>
              <CopyButton text={hex} />
            </div>
            <Input value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>RGB</Label>
              <CopyButton text={rgb} />
            </div>
            <Input readOnly value={rgb} className="font-mono" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>HSL</Label>
              <CopyButton text={hsl} />
            </div>
            <Input readOnly value={hsl} className="font-mono" />
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
