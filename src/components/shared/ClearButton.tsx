import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <Trash2 className="h-4 w-4 mr-1" />
      Clear
    </Button>
  )
}
