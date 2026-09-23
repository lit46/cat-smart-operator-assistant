import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import machineData from '../data/machine.json'
import tasksData from '../data/tasks.json'
import learningData from '../data/learning.json'

const AppStateContext = createContext(null)

const STORAGE_KEYS = {
  tasks: 'cat-osa:tasks',
  logs: 'cat-osa:logs',
  learning: 'cat-osa:learning',
}

function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently,
    // the demo still works, it just won't persist across reloads.
  }
}

/**
 * AppStateProvider
 *
 * Single source of truth for machine status, today's tasks, the logbook,
 * and learning recommendations. Phase 3 (task lifecycle + logging) and
 * Phase 5 (Ask CAT) both read/write through this context rather than
 * hitting the JSON files directly, so the app behaves like it has one
 * live state store even though there's no backend yet.
 */
export function AppStateProvider({ children }) {
  // Machine state is demo-static for Phase 1 (no telemetry simulator yet).
  const [machine] = useState(machineData)

  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_KEYS.tasks, tasksData))
  const [logs, setLogs] = useState(() => loadFromStorage(STORAGE_KEYS.logs, []))
  const [learning] = useState(() => loadFromStorage(STORAGE_KEYS.learning, learningData))

  useEffect(() => saveToStorage(STORAGE_KEYS.tasks, tasks), [tasks])
  useEffect(() => saveToStorage(STORAGE_KEYS.logs, logs), [logs])
  useEffect(() => saveToStorage(STORAGE_KEYS.learning, learning), [learning])

  const addLogEntry = useCallback((entry) => {
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...entry,
      },
      ...prev,
    ])
  }, [])

  // Full start/in-progress/complete flow is Phase 3 scope. This is a
  // minimal, reusable status updater so nothing later has to touch the
  // task array shape directly.
  const updateTaskStatus = useCallback(
    (taskId, status, extra = {}) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status, ...extra } : t)),
      )
    },
    [],
  )

  const activeTask = useMemo(() => tasks.find((t) => t.status === 'in_progress') ?? null, [tasks])

  const resetDemoData = useCallback(() => {
    setTasks(tasksData)
    setLogs([])
  }, [])

  const value = useMemo(
    () => ({
      machine,
      tasks,
      logs,
      learning,
      activeTask,
      addLogEntry,
      updateTaskStatus,
      resetDemoData,
    }),
    [machine, tasks, logs, learning, activeTask, addLogEntry, updateTaskStatus, resetDemoData],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within an AppStateProvider')
  return ctx
}
