import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import CopyButton from '@/components/shared/CopyButton'

function randomInRange(min: number, max: number, isInteger: boolean): string {
  const val = Math.random() * (max - min) + min
  return isInteger ? Math.floor(val).toString() : val.toFixed(6)
}

function randomString(length: number, charset: string): string {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (v) => charset[v % charset.length]).join('')
}

export default function RandomGeneratorTool() {
  const [mode, setMode] = useState('number')
  // number
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [isInteger, setIsInteger] = useState(true)
  const [numCount, setNumCount] = useState(10)
  // string
  const [strLength, setStrLength] = useState(16)
  const [strCount, setStrCount] = useState(5)
  const [charsets, setCharsets] = useState({ upper: true, lower: true, digits: true, special: false })

  const [output, setOutput] = useState('')

  const generate = () => {
    if (mode === 'number') {
      const results = Array.from({ length: numCount }, () => randomInRange(min, max, isInteger))
      setOutput(results.join('\n'))
    } else {
      let charset = ''
      if (charsets.upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (charsets.lower) charset += 'abcdefghijklmnopqrstuvwxyz'
      if (charsets.digits) charset += '0123456789'
      if (charsets.special) charset += '!@#$%^&*'
      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
      const results = Array.from({ length: strCount }, () => randomString(strLength, charset))
      setOutput(results.join('\n'))
    }
  }

  return (
    <ToolPage title="Random Number/String Generator" description="Generate random numbers and strings">
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList>
          <TabsTrigger value="number">Numbers</TabsTrigger>
          <TabsTrigger value="string">Strings</TabsTrigger>
        </TabsList>
        <TabsContent value="number" className="space-y-3 mt-3">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <Label>Min</Label>
              <Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-28" />
            </div>
            <div className="space-y-1">
              <Label>Max</Label>
              <Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-28" />
            </div>
            <div className="space-y-1">
              <Label>Count</Label>
              <Input type="number" min={1} max={1000} value={numCount} onChange={(e) => setNumCount(Number(e.target.value))} className="w-24" />
            </div>
            <div className="flex items-center gap-2 pb-1">
              <Checkbox id="int" checked={isInteger} onCheckedChange={(v) => setIsInteger(!!v)} />
              <Label htmlFor="int">Integer</Label>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="string" className="space-y-3 mt-3">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <Label>Length</Label>
              <Input type="number" min={1} max={256} value={strLength} onChange={(e) => setStrLength(Number(e.target.value))} className="w-24" />
            </div>
            <div className="space-y-1">
              <Label>Count</Label>
              <Input type="number" min={1} max={100} value={strCount} onChange={(e) => setStrCount(Number(e.target.value))} className="w-24" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {(['upper', 'lower', 'digits', 'special'] as const).map((k) => (
              <div key={k} className="flex items-center gap-2">
                <Checkbox id={k} checked={charsets[k]} onCheckedChange={(v) => setCharsets({ ...charsets, [k]: !!v })} />
                <Label htmlFor={k} className="text-sm capitalize">{k}</Label>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex gap-2 mt-3">
        <Button onClick={generate}>Generate</Button>
        <CopyButton text={output} />
      </div>
      {output && (
        <Textarea readOnly value={output} className="min-h-[200px] font-mono mt-3" />
      )}
    </ToolPage>
  )
}
