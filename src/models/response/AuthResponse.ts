import { IUser } from '@/models/IUser'

export interface AuthResponse {
  accessesToken: string
  refreshToken: string
  user: IUser
}
