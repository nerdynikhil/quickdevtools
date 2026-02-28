import { useState } from 'react'
import ToolPage from '@/components/shared/ToolPage'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import FileUploadZone from '@/components/shared/FileUploadZone'
import CopyButton from '@/components/shared/CopyButton'
import ClearButton from '@/components/shared/ClearButton'

export default function Base64FileTool() {
  const [output, setOutput] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFile = (file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setOutput(result.split(',')[1] || result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <ToolPage title="Base64 File Encoder" description="Convert files to and from Base64">
      <div className="flex gap-2 mb-2">
        <ClearButton onClick={() => { setOutput(''); setFileName('') }} />
        <CopyButton text={output} />
      </div>
      <FileUploadZone onFile={handleFile} />
      {fileName && (
        <p className="text-sm text-muted-foreground mt-2">File: {fileName}</p>
      )}
      {output && (
        <div className="mt-4">
          <Label className="mb-1 block">Base64 Output</Label>
          <Textarea readOnly value={output} className="min-h-[200px] font-mono" />
        </div>
      )}
    </ToolPage>
  )
}
