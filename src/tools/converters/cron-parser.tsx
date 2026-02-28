import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'
import { CronExpressionParser } from 'cron-parser'

const SAMPLE = '*/15 9-17 * * 1-5'

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/)
  if (parts.length < 5) return 'Invalid cron expression (need 5 fields)'
  const [min, hour, dom, month, dow] = parts

  const segments: string[] = []
  if (min === '*') segments.push('Every minute')
  else if (min.startsWith('*/')) segments.push(`Every ${min.slice(2)} minutes`)
  else segments.push(`At minute ${min}`)

  if (hour === '*') segments.push('of every hour')
  else if (hour.includes('-')) segments.push(`during hours ${hour}`)
  else if (hour.startsWith('*/')) segments.push(`every ${hour.slice(2)} hours`)
  else segments.push(`at hour ${hour}`)

  if (dom !== '*') segments.push(`on day ${dom} of the month`)
  if (month !== '*') segments.push(`in month ${month}`)

  const dayNames: Record<string, string> = { '0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wed', '4': 'Thu', '5': 'Fri', '6': 'Sat', '7': 'Sun' }
  if (dow !== '*') {
    const mapped = dow.replace(/\d/g, (d) => dayNames[d] || d)
    segments.push(`on ${mapped}`)
  }

  return segments.join(', ')
}

export default function CronParserTool() {
  const [input, setInput] = useState('')
  const [description, setDescription] = useState('')
  const [nextRuns, setNextRuns] = useState<string[]>([])
  const [error, setError] = useState('')

  const parse = (expr: string) => {
    setInput(expr)
    setError('')
    if (!expr.trim()) { setDescription(''); setNextRuns([]); return }
    try {
      setDescription(describeCron(expr))
      const interval = CronExpressionParser.parse(expr)
      const runs: string[] = []
      for (let i = 0; i < 5; i++) {
        runs.push(interval.next().toDate().toISOString())
      }
      setNextRuns(runs)
    } catch (e) {
      setError((e as Error).message)
      setDescription('')
      setNextRuns([])
    }
  }

  return (
    <ToolPage title="Cron Expression Parser" description="Parse and explain cron schedule expressions">
      <div className="flex gap-2 mb-2">
        <SampleDataButton onClick={() => parse(SAMPLE)} />
        <ClearButton onClick={() => { setInput(''); setDescription(''); setNextRuns([]); setError('') }} />
      </div>
      <div className="space-y-4">
        <div>
          <Label className="mb-1 block">Cron Expression</Label>
          <Input
            placeholder="*/5 * * * *"
            value={input}
            onChange={(e) => parse(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">Format: minute hour day-of-month month day-of-week</p>
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        {description && (
          <div className="rounded-lg border p-4">
            <Label className="text-sm block mb-1">Description</Label>
            <p>{description}</p>
          </div>
        )}
        {nextRuns.length > 0 && (
          <div className="rounded-lg border p-4">
            <Label className="text-sm block mb-2">Next 5 Runs</Label>
            <ul className="space-y-1 text-sm font-mono">
              {nextRuns.map((run, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-muted-foreground">{i + 1}.</span>
                  <span>{new Date(run).toLocaleString()}</span>
                  <CopyButton text={run} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
