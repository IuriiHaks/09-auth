//  підключення axios з базовим URL та налаштуванням для відправки кукісів
import axios from 'axios'

export type { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
})
