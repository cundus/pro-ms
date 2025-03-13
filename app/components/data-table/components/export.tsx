import { Button } from '~/components/ui/button'

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
    }
  }

  return <Button onClick={handleExport}>Export</Button>
}
