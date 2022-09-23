import axios, { AxiosRequestConfig } from 'axios'
import { AuthResponse } from '@/models/response/AuthResponse'

const API_URL = 'http://localhost:8000/api'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const conf = { ...config }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return conf
})

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.isRetry) {
      originalRequest.isRetry = true
      try {
        const response = await axios.get<AuthResponse>(`http://localhost:8000/api/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessesToken)
        return api.request(originalRequest)
      } catch {
        console.log('Пользователь не авторизован')
      }
    }
    throw error
  }
)

export default api
