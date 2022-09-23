import axios from 'vue-ts-axios/dist/types'

const API_URL = 'http://localhost:8000/api'
const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})
export default api
// # sourceMappingURL=index.js.map
