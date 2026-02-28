import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

interface BaseValues {
  decimal: string
  binary: string
  octal: string
  hex: string
}

function convert(value: string, fromBase: number): BaseValues | null {
  const n = parseInt(value, fromBase)
  if (isNaN(n)) return null
  return {
    decimal: n.toString(10),
    binary: n.toString(2),
    octal: n.toString(8),
    hex: n.toString(16).toUpperCase(),
  }
}

export default function NumberBaseTool() {
  const [values, setValues] = useState<BaseValues>({ decimal: '', binary: '', octal: '', hex: '' })

  const update = (value: string, base: number, key: keyof BaseValues) => {
    if (!value) { setValues({ decimal: '', binary: '', octal: '', hex: '' }); return }
    const result = convert(value, base)
    if (result) {
      setValues({ ...result, [key]: value })
    } else {
      setValues((prev) => ({ ...prev, [key]: value }))
    }
  }

  const fields: { label: string; key: keyof BaseValues; base: number; placeholder: string }[] = [
    { label: 'Decimal (Base 10)', key: 'decimal', base: 10, placeholder: '255' },
    { label: 'Binary (Base 2)', key: 'binary', base: 2, placeholder: '11111111' },
    { label: 'Octal (Base 8)', key: 'octal', base: 8, placeholder: '377' },
    { label: 'Hexadecimal (Base 16)', key: 'hex', base: 16, placeholder: 'FF' },
  ]

  return (
    <ToolPage title="Number Base Converter" description="Convert numbers between binary, octal, decimal, and hex">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => setValues({ decimal: '', binary: '', octal: '', hex: '' })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1">
            <div className="flex items-center gap-2">
              <Label>{f.label}</Label>
              <CopyButton text={values[f.key]} />
            </div>
            <Input
              placeholder={f.placeholder}
              value={values[f.key]}
              onChange={(e) => update(e.target.value, f.base, f.key)}
              className="font-mono"
            />
          </div>
        ))}
      </div>
    </ToolPage>
  )
}
