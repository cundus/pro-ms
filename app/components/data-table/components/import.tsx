import React from 'react'

import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { toast } from '~/hooks/use-toast'

export type ImportProps = {
  title: string
  api: string
  filetype?: string
}

// TODO : Fix the import
export function Import({ title, api, filetype }: ImportProps) {
  const [file, setFile] = React.useState<File | null>(null)

  const handleImport = async () => {
    try {
      if (!file) {
        toast({ title: 'No file selected', variant: 'destructive' })
        return
      }

      const formData = new FormData()
      formData.append('file', file!)

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }).then((res) => res.json())

      console.log('res', response)
      toast({ title: 'Data imported successfully' })
    } catch (error) {
      console.log('err', error)
      toast({ title: 'Something went wrong', variant: 'destructive' })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Import</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import {title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="file"
            accept={filetype}
            onChange={(e) => setFile(e.target.files![0])}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleImport}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
