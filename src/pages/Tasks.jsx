import { useAppState } from '../context/AppStateContext.jsx'
import Card from '../components/Card.jsx'
import TaskRow from '../components/TaskRow.jsx'

// Read-only shift list for Phase 1. The start/in-progress/complete flow and
// the Complete & Log modal are built in Phase 3 (mine) — this page is a
// safe, low-effort placeholder rather than an empty stub, since the data
// already exists.
export default function Tasks() {
  const { tasks } = useAppState()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5">
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-cat-steel">
          Today's Shift
        </p>
        <h1 className="font-display text-3xl font-bold text-cat-black">Scheduled Tasks</h1>
      </div>

      <Card>
        <div>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      </Card>

      <p className="text-sm text-cat-steel">
        Task start, in-progress, and complete-&amp;-log flows build here in Phase 3.
      </p>
    </div>
  )
}
