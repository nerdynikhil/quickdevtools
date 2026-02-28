import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function generatePassword(length: number, options: Record<string, boolean>): string {
  let chars = ''
  if (options.uppercase) chars += CHARSETS.uppercase
  if (options.lowercase) chars += CHARSETS.lowercase
  if (options.numbers) chars += CHARSETS.numbers
  if (options.symbols) chars += CHARSETS.symbols
  if (!chars) chars = CHARSETS.lowercase + CHARSETS.numbers

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (v) => chars[v % chars.length]).join('')
}

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(20)
  const [count, setCount] = useState(5)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [passwords, setPasswords] = useState<string[]>([])

  const generate = () => {
    setPasswords(Array.from({ length: count }, () => generatePassword(length, options)))
  }

  return (
    <ToolPage title="Password Generator" description="Generate strong random passwords">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1 flex-1 min-w-[200px]">
            <Label>Length: {length}</Label>
            <Slider min={4} max={128} step={1} value={[length]} onValueChange={([v]) => setLength(v)} />
          </div>
          <div className="space-y-1">
            <Label>Count</Label>
            <Input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {(Object.keys(CHARSETS) as Array<keyof typeof CHARSETS>).map((key) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={options[key]}
                onCheckedChange={(v) => setOptions({ ...options, [key]: !!v })}
              />
              <Label htmlFor={key} className="text-sm capitalize">{key}</Label>
            </div>
          ))}
        </div>
        <Button onClick={generate}>Generate</Button>
        {passwords.length > 0 && (
          <div className="space-y-2">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border p-2">
                <code className="flex-1 text-sm break-all">{pw}</code>
                <CopyButton text={pw} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  )
}
