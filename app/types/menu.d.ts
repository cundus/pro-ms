export interface IMenu
  extends Record<string, string | number | undefined | null | IMenu[]> {
  id?: number | null
  label: string
  icon?: string | null
  path?: string | null
  parent_id?: number | null
  children?: IMenu[] | null
}
