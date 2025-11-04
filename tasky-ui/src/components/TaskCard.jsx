import React from 'react'
import { Link } from 'react-router-dom'
import { remove, deleteTask } from '../api/tasks'

export default function TaskCard({ task, onDeleted }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  async function onDeleteConfirmed() {
    await deleteTask(task.id)
    setConfirmOpen(false)
    if (onDeleted) onDeleted()
  }

  function statusClass(s) {
    if (s === 'DONE') return 'bg-emerald-600/20 text-emerald-300 border border-emerald-400/10'
    if (s === 'IN_PROGRESS') return 'bg-amber-500/20 text-amber-300 border border-amber-400/10'
    return 'bg-sky-500/20 text-sky-300 border border-sky-400/10'
  }

  function priorityClass(p) {
    if (p === 'HIGH') return 'bg-red-600/20 text-red-300'
    if (p === 'MEDIUM') return 'bg-purple-600/20 text-purple-300'
    return 'bg-slate-600/20 text-slate-300'
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg p-4 w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-base sm:text-lg">{task.title}</h3>
          {task.description && <p className="mt-2 text-sm text-slate-300 line-clamp-3">{task.description}</p>}

          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusClass(task.status)}`}>{task.status}</span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityClass(task.priority)}`}>{task.priority}</span>
            <span className="ml-2 text-xs text-slate-400">Created: {new Date(task.createdAt || Date.now()).toLocaleDateString()}</span>
            <span className="ml-2 text-xs text-slate-400">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Link to={`/task/${task.id}`} className="px-3 py-1.5 rounded-lg bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400">View</Link>
          <button onClick={() => setConfirmOpen(true)} className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">Delete</button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 max-w-sm w-full">
            <div className="text-white font-semibold">Delete task</div>
            <div className="text-sm text-slate-300 mt-2">Are you sure you want to delete this task? This cannot be undone.</div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setConfirmOpen(false)} className="px-3 py-2 rounded-lg bg-white/5 text-white">Cancel</button>
              <button onClick={onDeleteConfirmed} className="px-3 py-2 rounded-lg bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
