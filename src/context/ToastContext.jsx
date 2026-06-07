import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const show = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
    setTimeout(() => setToast(null), 2600)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          className="fixed top-20 right-4 z-[100] animate-slide-in-r max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-card border ${
            toast.type === 'error'   ? 'bg-red-50 border-red-200 text-red-800' :
            toast.type === 'info'    ? 'bg-blue-50 border-blue-200 text-blue-800' :
                                       'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <span className="text-lg">
              {toast.type === 'error' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '✓'}
            </span>
            <p className="text-sm font-medium pr-2">{toast.message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
