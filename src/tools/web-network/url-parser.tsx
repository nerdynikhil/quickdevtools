import { useState, useMemo } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'
import SampleDataButton from '@/components/shared/SampleDataButton'

const SAMPLE = 'https://user:pass@example.com:8080/api/v1/users?page=1&limit=20&sort=name#section-2'

export default function UrlParserTool() {
  const [input, setInput] = useState('')

  const parsed = useMemo(() => {
    if (!input.trim()) return null
    try {
      const url = new URL(input)
      const params = [...url.searchParams.entries()]
      return {
        protocol: url.protocol,
        username: url.username,
        password: url.password,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        params,
      }
    } catch {
      return 'invalid' as const
    }
  }, [input])

  return (
    <ToolPage title="URL Parser" description="Parse and inspect URL components">
      <div className="flex gap-2 mb-2">
        <SampleDataButton onClick={() => setInput(SAMPLE)} />
        <ClearButton onClick={() => setInput('')} />
      </div>
      <div>
        <Label className="mb-1 block">URL</Label>
        <Input
          placeholder="https://example.com/path?query=value#hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono"
        />
      </div>
      {parsed === 'invalid' && (
        <p className="text-sm text-destructive mt-2">Invalid URL</p>
      )}
      {parsed && parsed !== 'invalid' && (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Protocol', parsed.protocol],
                  ['Origin', parsed.origin],
                  ['Hostname', parsed.hostname],
                  ['Port', parsed.port || '(default)'],
                  ['Username', parsed.username || '(none)'],
                  ['Password', parsed.password || '(none)'],
                  ['Pathname', parsed.pathname],
                  ['Search', parsed.search || '(none)'],
                  ['Hash', parsed.hash || '(none)'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b last:border-0">
                    <td className="p-3 font-medium w-32">{label}</td>
                    <td className="p-3 font-mono text-muted-foreground">{value}</td>
                    <td className="p-3 w-16">
                      <CopyButton text={value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parsed.params.length > 0 && (
            <div>
              <Label className="mb-2 block">Query Parameters</Label>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium">Key</th>
                      <th className="text-left p-3 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.params.map(([key, value], i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-3 font-mono">{key}</td>
                        <td className="p-3 font-mono text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolPage>
  )
}
