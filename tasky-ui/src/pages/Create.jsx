// UI: Create page form panel restyle to glassmorphism
// - Inputs use consistent Tailwind glass input styles
// - Form panel centered and responsive

import React from 'react'
import TaskForm from '../components/TaskForm'
import { create } from '../api/tasks'
// tasks.js exports `create` function
import { useNavigate } from 'react-router-dom'
import { useToasts } from '../components/Toasts'

export default function Create() {
  const navigate = useNavigate()
  const { show } = useToasts()

  async function onSubmit(dto) {
    try {
      await create(dto)
      show && show('Task created', 'info')
      navigate('/?r=' + Date.now())
    } catch (err) {
      show && show('Failed to create', 'error')
    }
  }

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Create task</h2>
      <TaskForm onSubmit={onSubmit} />
    </div>
  )
}
