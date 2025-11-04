import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToasts } from './Toasts'
import axios from 'axios'

const DEFAULTS = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM',
  status: 'TODO',
}

export default function TaskForm({ initial, onSubmit }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: initial || DEFAULTS })
  const { show } = useToasts()
  const [serverError, setServerError] = useState(null)

  async function submit(values) {
    try {
      setServerError(null)
      if (!values.title || values.title.trim() === '') return // react-hook-form should handle
      if (values.title.length > 20) return
      await onSubmit({
        title: values.title,
        description: values.description || null,
        dueDate: values.dueDate || null,
        priority: values.priority,
        status: values.status,
      })
      show('Saved', 'info')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400 || err.response.status === 409) {
          const msg = err.response.data?.message || 'Validation error'
          setServerError(msg)
          return
        }
      }
      show('Server error', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-3">
      <label className="flex flex-col">
        <span className="text-sm font-medium text-white">Title *</span>
        <input {...register('title', { required: true, maxLength: 20 })} className="mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        {errors.title && <div className="text-sm text-red-600">{errors.title.type === 'maxLength' ? 'Max 20 chars' : 'Title required'}</div>}
        {serverError && <div className="text-sm text-red-600">{serverError}</div>}
      </label>

      <label className="flex flex-col">
        <span className="text-sm font-medium text-white">Description</span>
        <textarea {...register('description')} rows={3} className="mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </label>

      <div className="flex flex-col md:flex-row gap-3">
        <label className="flex-1 flex flex-col">
          <span className="text-sm font-medium text-white">Status</span>
          <select {...register('status')} className="mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </label>

        <label className="flex-1 flex flex-col">
          <span className="text-sm font-medium text-white">Priority</span>
          <select {...register('priority')} className="mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </label>

        <label className="flex-1 flex flex-col">
          <span className="text-sm font-medium text-white">Due date</span>
          <input type="date" {...register('dueDate')} className="mt-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </label>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-black rounded-xl disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  )
}
