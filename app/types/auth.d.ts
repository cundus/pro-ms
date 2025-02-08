export interface IUserDetail extends Record<string, unknown> {
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
