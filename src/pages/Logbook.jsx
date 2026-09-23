import { useAppState } from '../context/AppStateContext.jsx'
import Card from '../components/Card.jsx'
import { BookOpen } from 'lucide-react'

// Full logbook build (auto-populated from task completions) is Phase 3 (mine).
export default function Logbook() {
  const { logs } = useAppState()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5">
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-cat-steel">
          Shift Record
        </p>
        <h1 className="font-display text-3xl font-bold text-cat-black">Logbook</h1>
      </div>

      <Card>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <BookOpen size={28} strokeWidth={2} className="text-cat-fog" />
            <p className="text-sm text-cat-steel">
              No log entries yet. Entries are created automatically as tasks and safety
              events happen — this fills in during Phase 3.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {logs.map((log) => (
              <li key={log.id} className="border-b border-cat-black/10 pb-3 last:border-b-0">
                <p className="font-body text-sm font-semibold text-cat-black">
                  {log.description}
                </p>
                <p className="text-xs text-cat-steel">{new Date(log.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
