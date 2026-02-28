import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DownloadButtonProps {
  content: string
  filename: string
  mime?: string
}

export default function DownloadButton({ content, filename, mime = 'text/plain' }: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDownload} disabled={!content}>
      <Download className="h-4 w-4 mr-1" />
      Download
    </Button>
  )
}
