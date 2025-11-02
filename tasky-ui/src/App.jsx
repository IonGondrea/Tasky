import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import List from './pages/List'
import Create from './pages/Create'
import Edit from './pages/Edit'
import ToastProvider from './components/Toasts'

function NavLink({ to, children }) {
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 text-sm font-medium ${active ? 'text-white' : 'text-slate-300 hover:text-white'}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 w-full h-0.5 transition-all duration-200 ${active ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-transparent'}`}
        aria-hidden
      />
    </Link>
  )
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b1220] to-[#0b1628] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-black/30 border-b border-white/5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">Tasky</div>
            <div className="text-sm text-slate-400 hidden sm:block">Manage your tasks, fast.</div>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/">List</NavLink>
            <NavLink to="/create">Create</NavLink>
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ToastProvider>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/task/:id" element={<Edit />} />
          </Routes>
        </ToastProvider>
      </main>
    </div>
  )
}
