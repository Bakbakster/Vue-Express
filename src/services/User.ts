import api from '@/http'
// eslint-disable-next-line import/no-unresolved
import { AxiosResponse } from 'vue-ts-axios/dist/types'
import { IUser } from '@/models/IUser'

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get('/users')
  }
}
