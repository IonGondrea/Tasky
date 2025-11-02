
import { http } from './http'
import type { Page } from '../types/task'
import type { Task, TaskRequest, TaskStatus } from '../types/task'

export async function listTasks(params: {
    status?: TaskStatus
    q?: string
    page?: number
    size?: number
}) {
    const res = await http.get<Page<Task>>('/tasks', {
        params: {
            status: params.status,
            q: params.q,
            page: params.page ?? 0,
            size: params.size ?? 10,
        },
    })
    return res.data
}

export async function getTask(id: number) {
    const res = await http.get<Task>(`/tasks/${id}`)
    return res.data
}

export async function createTask(body: TaskRequest) {
    const res = await http.post<Task>('/tasks', body)
    return res.data
}

export async function updateTask(id: number, body: TaskRequest) {
    const res = await http.put<Task>(`/tasks/${id}`, body)
    return res.data
}

export async function deleteTask(id: number) {
    await http.delete(`/tasks/${id}`)
}
