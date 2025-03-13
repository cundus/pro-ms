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

export type ImportProps = {
  title: string
  api: string
  filetype?: string
}

// TODO : Fix the import
export function Import({ title, api, filetype }: ImportProps) {
  const handleImport = async () => {
    try {
      const response = await fetch(api, { method: 'POST' }).then((res) =>
        res.json()
      )

      console.log('res', response)
    } catch (error) {
      console.log('err', error)
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
          <Input type="file" accept={filetype} />
        </div>
        <DialogFooter>
          <Button onClick={handleImport}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
