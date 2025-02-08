import { IUserDetail } from './auth'
import { IMenu } from './menu'

export interface ISessionDTO {
  user: IUserDetail
  menus: IMenu[]
}
