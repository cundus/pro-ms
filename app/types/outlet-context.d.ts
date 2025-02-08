import { ISessionDTO } from './session'

export interface IOutletContext {
  userSession: ISessionDTO['user']
}
