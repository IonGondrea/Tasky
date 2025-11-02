import React, { useEffect, useState } from 'react'
import { list, getAll } from '../api/tasks'
import TaskCard from '../components/TaskCard'
import { Link, useLocation } from 'react-router-dom'
import { useToasts } from '../components/Toasts'

// `list` kept for backwards-compat; `getAll` is the canonical name

export default function List() {
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const location = useLocation()
  const { show } = useToasts()

  async function load() {
    try {
      const data = await list({ status: status || undefined, q: q || undefined, page, size: 10 })
      setTasks(data.content || [])
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      show('Failed to load tasks', 'error')
    }
  }

  useEffect(() => { load() }, [page, status, q, location.search])

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search tasks</label>
            <input
              id="search"
              value={q}
              onChange={e => { setPage(0); setQ(e.target.value) }}
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="w-full pl-3 pr-3 py-3 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select value={status} onChange={e => { setPage(0); setStatus(e.target.value) }} className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-sm text-white">
            <option value="">All</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>

          <Link to="/create" className="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-black px-4 py-2 rounded-xl shadow-lg">+ New Task</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.length === 0 && <div className="col-span-full text-center text-slate-400 py-12">No tasks.</div>}
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onDeleted={load} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button disabled={page <= 0} onClick={() => setPage(p => p - 1)} className="px-3 py-2 rounded-lg bg-white/5 text-slate-200 disabled:opacity-40">← Prev</button>
        <span className="text-slate-400">Page {page + 1} / {Math.max(totalPages, 1)}</span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="px-3 py-2 rounded-lg bg-white/5 text-slate-200 disabled:opacity-40">Next →</button>
      </div>
    </div>
  )
}
