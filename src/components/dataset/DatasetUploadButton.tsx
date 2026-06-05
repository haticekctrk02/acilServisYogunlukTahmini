import { Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { DatasetUploadModal } from './DatasetUploadModal'

interface DatasetUploadButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function DatasetUploadButton({ variant = 'primary', size = 'md' }: DatasetUploadButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)}>
        <Upload className="h-4 w-4" aria-hidden="true" />
        Dataset Ekle
      </Button>
      <DatasetUploadModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
