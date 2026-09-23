import { ChevronRight, Clock, MapPin } from 'lucide-react'

const STATUS_LABEL = {
  upcoming: 'Upcoming',
  in_progress: 'In Progress',
  completed: 'Complete',
  logged: 'Logged',
}

const STATUS_DOT = {
  upcoming: 'bg-cat-fog',
  in_progress: 'bg-safety-attention',
  completed: 'bg-safety-safe',
  logged: 'bg-cat-steel',
}

/**
 * TaskRow
 * Compact, tappable list item. onSelect receives the task object.
 */
export default function TaskRow({ task, onSelect }) {
  const interactive = typeof onSelect === 'function'
  const Wrapper = interactive ? 'button' : 'div'

  return (
    <Wrapper
      type={interactive ? 'button' : undefined}
      onClick={interactive ? () => onSelect(task) : undefined}
      className={`flex w-full items-center gap-3 border-b border-cat-black/10 py-3 text-left last:border-b-0 ${
        interactive ? 'hover:bg-cat-paper focus-visible:bg-cat-paper' : ''
      }`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[task.status] ?? 'bg-cat-fog'}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm font-semibold text-cat-black">{task.title}</p>
        <div className="mt-0.5 flex items-center gap-3 text-xs text-cat-steel">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} strokeWidth={2.5} />
            {task.scheduledTime}
          </span>
          <span className="inline-flex items-center gap-1 truncate">
            <MapPin size={12} strokeWidth={2.5} />
            {task.location}
          </span>
        </div>
      </div>
      <span className="shrink-0 font-display text-xs font-semibold uppercase tracking-wide text-cat-steel">
        {STATUS_LABEL[task.status] ?? task.status}
      </span>
      {interactive && <ChevronRight size={16} className="shrink-0 text-cat-steel" />}
    </Wrapper>
  )
}
