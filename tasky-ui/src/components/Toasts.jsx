import React, { useState, createContext, useContext } from 'react'

const ToastContext = createContext(null)

export function useToasts() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  function show(message, type = 'info') {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        {toasts.map(t => {
          const base = 'pointer-events-auto w-full max-w-sm rounded-2xl p-3 shadow-lg backdrop-blur-lg border border-white/10'
          const variant = t.type === 'error'
            ? 'bg-rose-600/20 text-rose-200'
            : t.type === 'success'
            ? 'bg-emerald-600/20 text-emerald-200'
            : 'bg-blue-600/20 text-blue-200'

          return (
            <div key={t.id} className={`${base} ${variant} flex items-start gap-3`}>
              <div className="flex-1 text-sm">{t.message}</div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
