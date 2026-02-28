import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const STATUS_CODES: Record<string, { code: number; text: string; description: string }[]> = {
  '1xx Informational': [
    { code: 100, text: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body.' },
    { code: 101, text: 'Switching Protocols', description: 'The requester has asked the server to switch protocols.' },
    { code: 102, text: 'Processing', description: 'The server is processing the request but no response is available yet.' },
    { code: 103, text: 'Early Hints', description: 'Used to return some response headers before final HTTP message.' },
  ],
  '2xx Success': [
    { code: 200, text: 'OK', description: 'The request was successful.' },
    { code: 201, text: 'Created', description: 'The request was successful and a resource was created.' },
    { code: 202, text: 'Accepted', description: 'The request has been accepted for processing but not yet completed.' },
    { code: 204, text: 'No Content', description: 'The request was successful but there is no content to send.' },
    { code: 206, text: 'Partial Content', description: 'The server is delivering only part of the resource due to a range header.' },
  ],
  '3xx Redirection': [
    { code: 301, text: 'Moved Permanently', description: 'The resource has been permanently moved to a new URL.' },
    { code: 302, text: 'Found', description: 'The resource resides temporarily at a different URL.' },
    { code: 304, text: 'Not Modified', description: 'The resource has not been modified since the last request.' },
    { code: 307, text: 'Temporary Redirect', description: 'The request should be repeated at another URL but future requests should use the original.' },
    { code: 308, text: 'Permanent Redirect', description: 'The resource has been permanently moved. Same semantics as 301 but does not change method.' },
  ],
  '4xx Client Error': [
    { code: 400, text: 'Bad Request', description: 'The server cannot process the request due to a client error.' },
    { code: 401, text: 'Unauthorized', description: 'Authentication is required and has failed or not been provided.' },
    { code: 403, text: 'Forbidden', description: 'The server understood the request but refuses to authorize it.' },
    { code: 404, text: 'Not Found', description: 'The requested resource could not be found.' },
    { code: 405, text: 'Method Not Allowed', description: 'The request method is not supported for the requested resource.' },
    { code: 408, text: 'Request Timeout', description: 'The server timed out waiting for the request.' },
    { code: 409, text: 'Conflict', description: 'The request conflicts with the current state of the server.' },
    { code: 410, text: 'Gone', description: 'The resource is no longer available and will not be available again.' },
    { code: 413, text: 'Payload Too Large', description: 'The request is larger than the server is willing to handle.' },
    { code: 415, text: 'Unsupported Media Type', description: 'The media format of the request data is not supported.' },
    { code: 422, text: 'Unprocessable Entity', description: 'The request was well-formed but unable to be followed due to semantic errors.' },
    { code: 429, text: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time.' },
  ],
  '5xx Server Error': [
    { code: 500, text: 'Internal Server Error', description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' },
    { code: 501, text: 'Not Implemented', description: 'The server does not support the functionality required to fulfill the request.' },
    { code: 502, text: 'Bad Gateway', description: 'The server received an invalid response from an upstream server.' },
    { code: 503, text: 'Service Unavailable', description: 'The server is currently unable to handle the request.' },
    { code: 504, text: 'Gateway Timeout', description: 'The server did not receive a timely response from an upstream server.' },
  ],
}

function getBadgeVariant(code: number): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (code < 200) return 'outline'
  if (code < 300) return 'default'
  if (code < 400) return 'secondary'
  return 'destructive'
}

export default function HttpStatusCodesTool() {
  const [search, setSearch] = useState('')

  const filtered = Object.entries(STATUS_CODES).map(([group, codes]) => ({
    group,
    codes: codes.filter(
      (c) =>
        c.code.toString().includes(search) ||
        c.text.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((g) => g.codes.length > 0)

  return (
    <ToolPage title="HTTP Status Code Reference" description="Look up HTTP status codes and their meanings">
      <Input
        placeholder="Search by code or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-6">
        {filtered.map(({ group, codes }) => (
          <div key={group}>
            <h3 className="text-lg font-semibold mb-2">{group}</h3>
            <div className="space-y-2">
              {codes.map((c) => (
                <div key={c.code} className="rounded-lg border p-3 flex items-start gap-3">
                  <Badge variant={getBadgeVariant(c.code)} className="font-mono shrink-0">
                    {c.code}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{c.text}</p>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolPage>
  )
}
