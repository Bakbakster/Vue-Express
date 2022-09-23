import api from '@/http'
import { AuthResponse } from '@/models/response/AuthResponse'
// eslint-disable-next-line import/no-unresolved
import { AxiosResponse } from 'vue-ts-axios/dist/types'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post('/login', { email, password })
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post('/registration', { email, password })
  }

  static async logout(): Promise<any> {
    return api.get('/logout')
  }
}
