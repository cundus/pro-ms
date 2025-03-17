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

export type MenuBody = {
  id?: number
  label: string
  icon?: string
  path?: string
  parent_id?: number
  order?: number
  is_active?: boolean
}
