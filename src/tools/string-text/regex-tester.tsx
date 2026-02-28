import { useState, useMemo } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import ClearButton from '@/components/shared/ClearButton'

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false })
  const [testString, setTestString] = useState('')

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join('')

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null }
    try {
      const re = new RegExp(pattern, flagStr)
      const result: { match: string; index: number; groups: string[] }[] = []
      let m: RegExpExecArray | null
      if (flagStr.includes('g')) {
        while ((m = re.exec(testString)) !== null) {
          result.push({ match: m[0], index: m.index, groups: m.slice(1) })
          if (m[0].length === 0) re.lastIndex++
        }
      } else {
        m = re.exec(testString)
        if (m) result.push({ match: m[0], index: m.index, groups: m.slice(1) })
      }
      return { matches: result, error: null }
    } catch (e) {
      return { matches: [], error: (e as Error).message }
    }
  }, [pattern, flagStr, testString])

  return (
    <ToolPage title="Regex Tester" description="Test regular expressions with live highlighting">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setPattern(''); setTestString('') }} />
      </div>
      <div className="space-y-3">
        <div>
          <Label className="mb-1 block">Pattern</Label>
          <Input
            placeholder="Enter regex pattern..."
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="font-mono"
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <div className="flex gap-4">
          {(['g', 'i', 'm', 's'] as const).map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <Checkbox id={`flag-${f}`} checked={flags[f]} onCheckedChange={(v) => setFlags({ ...flags, [f]: !!v })} />
              <Label htmlFor={`flag-${f}`} className="text-sm font-mono">{f}</Label>
            </div>
          ))}
        </div>
        <div>
          <Label className="mb-1 block">Test String</Label>
          <Textarea
            placeholder="Enter test string..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="min-h-[150px] font-mono"
          />
        </div>
        {matches.length > 0 && (
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium mb-2">{matches.length} match{matches.length !== 1 ? 'es' : ''}</p>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="text-sm font-mono">
                  <span className="text-muted-foreground">#{i + 1}</span>{' '}
                  <span className="bg-primary/20 px-1 rounded">{m.match || '(empty)'}</span>
                  <span className="text-muted-foreground ml-2">at index {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-muted-foreground ml-2">
                      groups: [{m.groups.map((g, j) => <span key={j} className="text-primary">{g}</span>).reduce<React.ReactNode[]>((acc, el, j) => j === 0 ? [el] : [...acc, ', ', el], [])}]
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
