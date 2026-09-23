import { useParams, Link } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import { FUTURE_CONCEPTS } from '../components/NavBar.jsx'

export default function ComingSoon({ title: titleProp, note }) {
  const { feature } = useParams()
  const concept = FUTURE_CONCEPTS.find((c) => c.slug === feature)
  const title = titleProp ?? concept?.label ?? 'This feature'

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center border border-cat-black bg-cat-yellow">
        <Hammer size={24} strokeWidth={2.5} />
      </span>
      <h1 className="font-display text-3xl font-bold text-cat-black">{title}</h1>
      <p className="max-w-sm text-sm text-cat-steel">
        {note ?? "This is on the roadmap but isn't built for this prototype yet."}
      </p>
      <Link
        to="/"
        className="mt-2 border border-cat-black bg-cat-black px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-cat-white hover:bg-cat-charcoal"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
