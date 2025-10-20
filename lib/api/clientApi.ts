import { api } from './api'
import type { User } from '@/types/user'
import type { Note, CreateNoteRequest } from '@/types/note'

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 10,
  tag?: string
): Promise<NotesResponse> {
  const params: Record<string, string | number> = {
    search,
    page,
    perPage,
  }
  if (search.trim()) params.search = search

  if (tag && tag !== 'All') params.tag = tag

  const { data } = await api.get<NotesResponse>('/notes', { params })

  console.log('Fetched notes:', params, data)
  return data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`)
  return data
}

export async function createNote(payload: CreateNoteRequest): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload)
  return data
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`)
  return data
}

// реєстрація користувача
export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/register', { email, password })
  return data
}

// вхід користувача
export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

// вихід користувача
export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}

// отримання даних користувача
export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me')
  return data
}

// оновлення даних користувача
export async function updateMe(username: string): Promise<User> {
  const { data } = await api.patch('/users/me', { username })
  return data
}

type SessionRequest = {
  success: boolean
}

// перевірка сесії користувача
export async function checkSession() {
  const { data } = await api.get<SessionRequest>('/auth/session')
  return data
}
