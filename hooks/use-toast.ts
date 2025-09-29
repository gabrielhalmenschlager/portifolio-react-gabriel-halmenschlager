"use client" // ESSENCIAL: garante que o Next trate este arquivo como Client Component

import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000 // 5 segundos

// Tipagem do Toast
type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// Tipos de ação
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> & { id: string } }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: string }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: string }

// Estado do Toast
interface State {
  toasts: ToasterToast[]
}

// Timeout dos toasts
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, dispatch: (action: Action) => void) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      state.toasts.forEach((t) => {
        if (!toastId || t.id === toastId) t.open = false
      })
      return { ...state }
    }

    case "REMOVE_TOAST":
      if (!action.toastId) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }

    default:
      return state
  }
}

// Listeners globais
const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

// Dispatch global
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

// Função toast
function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId()
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (open) => !open && dismiss() },
  })

  return { id, dismiss }
}

// Hook useToast
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Adiciona listener apenas uma vez
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, []) // <-- array de dependências vazio!

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
