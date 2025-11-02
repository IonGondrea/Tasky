// JS API client for tasks (replaces TS module)
import { api } from './http'

export async function getAll({ status, q, page = 0, size = 10 } = {}) {
  const res = await api.get('/tasks', { params: { status, q, page, size } })
  return res.data
}

export async function get(id) {
  const res = await api.get(`/tasks/${id}`)
  return res.data
}

export async function create(data) {
  const res = await api.post('/tasks', data)
  return res.data
}

export async function update(id, data) {
  const res = await api.put(`/tasks/${id}`, data)
  return res.data
}

export async function remove(id) {
  const res = await api.delete(`/tasks/${id}`)
  return res.data
}

// Backwards-compatible named exports used earlier in some files
export const list = getAll
export const getTask = get
export const createTask = create
export const updateTask = update
export const deleteTask = remove

export default { getAll, get, create, update, remove }

