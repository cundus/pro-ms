export type PermissionRequest = {
  role_id: number
  menu_id: number
  create: boolean
  update: boolean
  delete: boolean
  read: boolean
}

export type PermissionId = {
  role_id: number
  menu_id: number
}

type Role = {
  id: number
  name: string
}

export type Permission = {
  role_id: number
  role: Role
  menu_id: number
  create: boolean
  update: boolean
  delete: boolean
  read: boolean
}
