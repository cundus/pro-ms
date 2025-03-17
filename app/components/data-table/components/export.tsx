import { Button } from '~/components/ui/button'
import { toast } from '~/hooks/use-toast'

export type ExportProps = {
  filename: string
  api: string
}

// TODO : Fix the export
export function Export({ filename, api }: ExportProps) {
  const handleExport = async () => {
    try {
      const response = await fetch(api)

      console.log('res', response)
      console.log('filename', filename)
    } catch (error) {
      console.log('err', error)
      toast({
        title: 'Something went wrong while exporting',
        variant: 'destructive',
      })
    }
  }

  return <Button onClick={handleExport}>Export</Button>
}
