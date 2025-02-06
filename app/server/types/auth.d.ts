export interface IUserDetail {
  id: number
  username: string
  password: string
  created_at: Date
  updated_at: Date
  role_id: number
  company_id: number | null
  profile: IProfileDetail | null
  role: IRoleDetail | null
  company: ICompanyDetail | null
}

export interface IRoleDetail {
  name: string
  is_global: boolean
  permissions: IPermission[]
}

export interface IPermission {
  name: string
}

export interface ICompanyDetail {}

export interface IProfileDetail {}

export interface IMenu
  extends Record<string, string | number | undefined | null | IMenu[]> {
  id?: number | null
  label: string
  icon?: string | null
  path?: string | null
  parent_id?: number | null
  children?: IMenu[] | null
}

export interface ISessionDTO {
  user: IUserDetail
  menus: IMenu[]
}
