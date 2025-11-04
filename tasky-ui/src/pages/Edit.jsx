import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import { get, update } from '../api/tasks'
import { useToasts } from '../components/Toasts'

export default function Edit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const { show } = useToasts()

  useEffect(() => {
    if (!id) return
    get(Number(id)).then(t => setTask(t)).catch(() => navigate('/'))
  }, [id])

  async function onSubmit(dto) {
    try {
      await update(Number(id), dto)
      show && show('Task updated', 'info')
      navigate('/?r=' + Date.now())
    } catch (err) {
      show && show('Failed to update', 'error')
    }
  }

  if (!task) return <div className="text-white">Loading...</div>

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Edit task</h2>
      <TaskForm initial={task} onSubmit={onSubmit} />
    </div>
  )
}
