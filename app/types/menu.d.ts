export interface IMenu
  extends Record<
    string,
    string | number | boolean | undefined | null | IMenu[]
  > {
  id?: number | null
  label: string
  icon?: string | null
  path?: string | null
  parent_id?: number | null
  is_active?: boolean
  children?: IMenu[] | null
}
