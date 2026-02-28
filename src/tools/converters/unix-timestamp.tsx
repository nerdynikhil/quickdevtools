import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CopyButton from '@/components/shared/CopyButton'

export default function UnixTimestampTool() {
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [now, setNow] = useState(Math.floor(Date.now() / 1000))

  const fromTimestamp = (ts: string) => {
    setTimestamp(ts)
    const n = Number(ts)
    if (isNaN(n)) { setDateStr('Invalid timestamp'); return }
    const ms = ts.length > 10 ? n : n * 1000
    setDateStr(new Date(ms).toISOString())
  }

  const fromDate = (ds: string) => {
    setDateStr(ds)
    const d = new Date(ds)
    if (isNaN(d.getTime())) { setTimestamp('Invalid date'); return }
    setTimestamp(Math.floor(d.getTime() / 1000).toString())
  }

  return (
    <ToolPage title="Unix Timestamp Converter" description="Convert Unix timestamps to human-readable dates">
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <Button size="sm" variant="outline" onClick={() => { const n = Math.floor(Date.now() / 1000); setNow(n); fromTimestamp(n.toString()) }}>
          Now: {now}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Label>Unix Timestamp</Label>
            <CopyButton text={timestamp} />
          </div>
          <Input
            placeholder="e.g. 1700000000"
            value={timestamp}
            onChange={(e) => fromTimestamp(e.target.value)}
            className="font-mono"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Label>Date/Time (ISO 8601)</Label>
            <CopyButton text={dateStr} />
          </div>
          <Input
            placeholder="e.g. 2024-01-01T00:00:00Z"
            value={dateStr}
            onChange={(e) => fromDate(e.target.value)}
            className="font-mono"
          />
        </div>
      </div>
      {timestamp && !isNaN(Number(timestamp)) && (
        <div className="mt-4 rounded-lg border p-4 grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Local:</span>
          <span>{new Date(Number(timestamp) * (timestamp.length > 10 ? 1 : 1000)).toLocaleString()}</span>
          <span className="text-muted-foreground">UTC:</span>
          <span>{new Date(Number(timestamp) * (timestamp.length > 10 ? 1 : 1000)).toUTCString()}</span>
          <span className="text-muted-foreground">Relative:</span>
          <span>{getRelative(Number(timestamp) * (timestamp.length > 10 ? 1 : 1000))}</span>
        </div>
      )}
    </ToolPage>
  )
}

function getRelative(ms: number): string {
  const diff = Date.now() - ms
  const abs = Math.abs(diff)
  const suffix = diff > 0 ? 'ago' : 'from now'
  if (abs < 60000) return `${Math.floor(abs / 1000)} seconds ${suffix}`
  if (abs < 3600000) return `${Math.floor(abs / 60000)} minutes ${suffix}`
  if (abs < 86400000) return `${Math.floor(abs / 3600000)} hours ${suffix}`
  return `${Math.floor(abs / 86400000)} days ${suffix}`
}
