import { useAppState } from '../context/AppStateContext.jsx'
import LearningCard from '../components/LearningCard.jsx'

// Full Study Material page, quiz, and completion state: Phase 4 (Person 2).
// Phase 1 gives a simple grid view of the same recommendation data.
export default function Learning() {
  const { learning } = useAppState()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5">
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-cat-steel">
          Stay Sharp
        </p>
        <h1 className="font-display text-3xl font-bold text-cat-black">Learning</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {learning.map((item) => (
          <LearningCard key={item.id} item={item} />
        ))}
      </div>

      <p className="text-sm text-cat-steel">
        The full study material view, quiz, and completion tracking build here in Phase 4.
      </p>
    </div>
  )
}
