
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    listTasks,
    createTask,
    updateTask,
    deleteTask,
} from './api/tasks'
import type { Task, TaskPriority, TaskStatus } from './types/task'

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    dueDate: z.string().optional(), // YYYY-MM-DD
})
type TaskForm = z.infer<typeof taskSchema>

export default function App() {
    // listare + filtre + pagina curentă
    const [items, setItems] = useState<Task[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState<TaskStatus | ''>('')
    const [q, setQ] = useState('')

    // form creare/update
    const [editing, setEditing] = useState<Task | null>(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskForm>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'TODO',
            priority: 'MEDIUM',
            dueDate: '',
        },
    })

    async function load() {
        const data = await listTasks({
            status: status || undefined,
            q: q || undefined,
            page,
            size: 10,
        })
        setItems(data.content)
        setTotalPages(data.totalPages)
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, status, q])

    function onEdit(t: Task) {
        setEditing(t)
        reset({
            title: t.title,
            description: t.description ?? '',
            status: t.status,
            priority: t.priority,
            dueDate: t.dueDate ?? '',
        })
    }

    async function onDelete(id: number) {
        if (!confirm('Delete this task?')) return
        await deleteTask(id)
        await load()
    }

    async function onSubmit(values: TaskForm) {
        const body = {
            title: values.title,
            description: values.description || null,
            status: (values.status ?? 'TODO') as TaskStatus,
            priority: (values.priority ?? 'MEDIUM') as TaskPriority,
            dueDate: values.dueDate || null,
        }
        if (editing) {
            await updateTask(editing.id, body)
            setEditing(null)
        } else {
            await createTask(body)
        }
        reset({
            title: '',
            description: '',
            status: 'TODO',
            priority: 'MEDIUM',
            dueDate: '',
        })
        setPage(0)
        await load()
    }

    return (
        <div style={{ maxWidth: 900, margin: '20px auto', padding: 16, fontFamily: 'system-ui' }}>
            <h1>Tasky – Tasks</h1>

            {/* Filtre */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <select value={status} onChange={e => { setPage(0); setStatus(e.target.value as TaskStatus | '') }}>
                    <option value="">(all statuses)</option>
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                <input
                    placeholder="Search in title…"
                    value={q}
                    onChange={e => { setPage(0); setQ(e.target.value) }}
                    style={{ flex: 1 }}
                />
            </div>

            {/* Listă */}
            <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ background: '#f4f4f4' }}>
                    <th align="left">Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Due</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map(t => (
                    <tr key={t.id} style={{ borderTop: '1px solid #eee' }}>
                        <td>
                            <div style={{ fontWeight: 600 }}>{t.title}</div>
                            {t.description && <div style={{ color: '#666', fontSize: 12 }}>{t.description}</div>}
                        </td>
                        <td align="center">{t.status}</td>
                        <td align="center">{t.priority}</td>
                        <td align="center">{t.dueDate ?? '-'}</td>
                        <td align="center">
                            <button onClick={() => onEdit(t)}>Edit</button>{' '}
                            <button onClick={() => onDelete(t.id)} style={{ color: '#b00' }}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                {items.length === 0 && (
                    <tr>
                        <td colSpan={5} align="center" style={{ padding: 24, color: '#777' }}>
                            No tasks.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Paginare */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                <button disabled={page <= 0} onClick={() => setPage(p => p - 1)}>
                    ← Prev
                </button>
                <span>Page {page + 1} / {Math.max(totalPages, 1)}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                    Next →
                </button>
            </div>

            {/* Formular creare / update */}
            <h2 style={{ marginTop: 28 }}>{editing ? `Edit task #${editing.id}` : 'New task'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 10, maxWidth: 520 }}>
                <div>
                    <label>Title*</label><br />
                    <input {...register('title')} />
                    {errors.title && <div style={{ color: 'crimson' }}>{errors.title.message}</div>}
                </div>
                <div>
                    <label>Description</label><br />
                    <textarea rows={3} {...register('description')} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div>
                        <label>Status</label><br />
                        <select {...register('status')}>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                    <div>
                        <label>Priority</label><br />
                        <select {...register('priority')}>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                    <div>
                        <label>Due date</label><br />
                        <input type="date" {...register('dueDate')} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="submit" disabled={isSubmitting}>
                        {editing ? 'Save changes' : 'Create'}
                    </button>
                    {editing && (
                        <button type="button" onClick={() => { setEditing(null); reset() }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
