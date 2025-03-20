import axios from 'axios'
import router from '@/router'

const apiTokenLocalStorage = 'apiToken';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(apiTokenLocalStorage)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expired. Redirect to login...')
      localStorage.removeItem(apiTokenLocalStorage)
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default {
  get(url, params = {}) {
    return apiClient.get(url, { params }).then((res) => res.data)
  },
  post(url, data) {
    return apiClient.post(url, data).then((res) => res.data)
  },
  put(url, data) {
    return apiClient.put(url, data).then((res) => res.data)
  },
  delete(url) {
    return apiClient.delete(url).then((res) => res.data)
  },
  setToken(token) {
    localStorage.setItem(apiTokenLocalStorage, token)
  },
  removeToken() {
    localStorage.removeItem(apiTokenLocalStorage)
  }
}
