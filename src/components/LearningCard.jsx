import { CheckCircle2, PlayCircle, HelpCircle, BookOpen } from 'lucide-react'

const TYPE_ICON = {
  module: BookOpen,
  video: PlayCircle,
  quiz: HelpCircle,
}

/**
 * LearningCard
 * Compact recommendation card. Full study material view is Phase 4 (Person 2).
 */
export default function LearningCard({ item, onSelect }) {
  const Icon = TYPE_ICON[item.type] ?? BookOpen
  const done = item.status === 'completed'
  const interactive = typeof onSelect === 'function'
  const Wrapper = interactive ? 'button' : 'div'

  return (
    <Wrapper
      type={interactive ? 'button' : undefined}
      onClick={interactive ? () => onSelect(item) : undefined}
      className={`flex w-56 shrink-0 flex-col gap-2 border border-cat-black p-3 text-left ${
        interactive ? 'hover:bg-cat-paper focus-visible:bg-cat-paper' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-8 w-8 items-center justify-center border border-cat-black bg-cat-yellow text-cat-black">
          <Icon size={16} strokeWidth={2.5} />
        </span>
        {done && <CheckCircle2 size={16} className="text-safety-safe" strokeWidth={2.5} />}
      </div>
      <p className="font-body text-sm font-semibold leading-snug text-cat-black">{item.title}</p>
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-cat-steel">
        {item.duration} min &middot; {item.type}
      </p>
    </Wrapper>
  )
}
