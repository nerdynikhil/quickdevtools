import { FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SampleDataButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <FlaskConical className="h-4 w-4 mr-1" />
      Sample
    </Button>
  )
}
