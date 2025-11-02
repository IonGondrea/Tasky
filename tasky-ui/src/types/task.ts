// src/types/task.ts
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
    id: number
    title: string
    description?: string | null
    status: TaskStatus
    priority: TaskPriority
    dueDate?: string | null // ISO date (YYYY-MM-DD)
    createdAt: string
    updatedAt: string
}

export interface TaskRequest {
    title: string
    description?: string | null
    status?: TaskStatus
    priority?: TaskPriority
    dueDate?: string | null
}

// Model paginare Spring Data
export interface Page<T> {
    content: T[]
    totalElements: number
    totalPages: number
    size: number
    number: number // pagina curentă (0-based)
}
