import React from 'react'

export default function ConfirmDeleteDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 glass rounded-2xl p-6 w-full max-w-md border border-white/5 shadow-2xl">
        <div className="text-lg font-semibold text-white">Delete task</div>
        <div className="mt-2 text-sm text-slate-300">Are you sure you want to delete this task? This action cannot be undone.</div>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded-lg bg-white/5 text-white">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded-lg bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}


