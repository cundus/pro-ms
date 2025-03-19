export type Columns = {
  key: string
  title: string
  style?:
    | {
        header?: string | undefined
        cell?:
          | {
              [key: string]: string | number
            }
          | undefined
      }
    | undefined
  enableSorting?: boolean | undefined
  enableHiding?: boolean | undefined
}
