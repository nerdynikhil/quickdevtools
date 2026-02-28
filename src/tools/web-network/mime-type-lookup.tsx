import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Input } from '@/components/ui/input'
import CopyButton from '@/components/shared/CopyButton'

const MIME_TYPES: Record<string, string> = {
  html: 'text/html', htm: 'text/html', css: 'text/css', js: 'application/javascript',
  mjs: 'application/javascript', json: 'application/json', xml: 'application/xml',
  txt: 'text/plain', csv: 'text/csv', md: 'text/markdown', yaml: 'text/yaml',
  yml: 'text/yaml', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg',
  jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif',
  ico: 'image/x-icon', bmp: 'image/bmp', tiff: 'image/tiff', tif: 'image/tiff',
  mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', flac: 'audio/flac',
  mp4: 'video/mp4', webm: 'video/webm', avi: 'video/x-msvideo', mov: 'video/quicktime',
  mkv: 'video/x-matroska', pdf: 'application/pdf', zip: 'application/zip',
  gz: 'application/gzip', tar: 'application/x-tar', rar: 'application/vnd.rar',
  '7z': 'application/x-7z-compressed', doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf',
  eot: 'application/vnd.ms-fontobject', ts: 'application/typescript',
  tsx: 'application/typescript', jsx: 'text/jsx', wasm: 'application/wasm',
  sh: 'application/x-sh', py: 'text/x-python', rb: 'text/x-ruby',
  java: 'text/x-java', go: 'text/x-go', rs: 'text/x-rust', c: 'text/x-c',
  cpp: 'text/x-c++', h: 'text/x-c', sql: 'application/sql',
}

export default function MimeTypeLookupTool() {
  const [search, setSearch] = useState('')

  const filtered = Object.entries(MIME_TYPES).filter(
    ([ext, mime]) =>
      ext.includes(search.toLowerCase().replace('.', '')) ||
      mime.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <ToolPage title="MIME Type Lookup" description="Look up MIME types by file extension">
      <Input
        placeholder="Search by extension or MIME type (e.g. png, application/json)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Extension</th>
              <th className="text-left p-3 font-medium">MIME Type</th>
              <th className="p-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(([ext, mime]) => (
              <tr key={ext} className="border-b last:border-0">
                <td className="p-3 font-mono">.{ext}</td>
                <td className="p-3 font-mono text-muted-foreground">{mime}</td>
                <td className="p-3"><CopyButton text={mime} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground mt-4 text-center">No matching MIME types found.</p>
      )}
    </ToolPage>
  )
}
