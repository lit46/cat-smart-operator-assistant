import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  ShieldCheck,
  ClipboardList,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Map,
  MoreHorizontal,
} from 'lucide-react'

// Real screens — built now or in a later owned phase.
const PRIMARY_LINKS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/safety', label: 'Safety', icon: ShieldCheck },
  { to: '/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/learning', label: 'Learning', icon: GraduationCap },
  { to: '/logbook', label: 'Logbook', icon: BookOpen },
  { to: '/ask-cat', label: 'Ask CAT', icon: MessageCircle },
  { to: '/map', label: 'Worksite Map', icon: Map },
]

// Explicitly out of scope for this build — see handoff §9. Routed to a
// shared "Coming soon" stub so nothing is a dead link.
export const FUTURE_CONCEPTS = [
  { slug: 'voice-assistant', label: 'Voice Assistant' },
  { slug: 'incident-reporting', label: 'Incident Reporting' },
  { slug: 'efficiency-coach', label: 'Efficiency Coach' },
  { slug: 'smart-scheduler', label: 'Smart Scheduler' },
  { slug: 'team-coordination', label: 'Team Coordination' },
  { slug: 'fleet-tracker', label: 'Fleet / Machine Tracker' },
  { slug: 'maintenance', label: 'Maintenance Module' },
]

function linkClass({ isActive }) {
  return `flex items-center gap-2 border-b-2 px-3 py-2 font-display text-sm font-semibold tracking-wide transition-colors ${
    isActive
      ? 'border-cat-yellow text-cat-black'
      : 'border-transparent text-cat-fog hover:text-cat-black'
  }`
}

export default function NavBar() {
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    function onClickAway(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    function onEscape(e) {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-cat-black bg-cat-white">
      <div className="flex items-center justify-between gap-2 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center bg-cat-black">
            <span className="h-3 w-3 bg-cat-yellow" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-cat-black">
            Operator Assistant
          </span>
        </div>

        <nav
          className="hidden items-center overflow-x-auto md:flex"
          aria-label="Primary"
        >
          {PRIMARY_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={15} strokeWidth={2.5} />
              {label}
            </NavLink>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 border-b-2 border-transparent px-3 py-2 font-display text-sm font-semibold tracking-wide text-cat-fog hover:text-cat-black"
            >
              <MoreHorizontal size={15} strokeWidth={2.5} />
              More
            </button>
            {moreOpen && (
              <ul
                role="menu"
                className="absolute right-0 top-full w-64 border border-cat-black bg-cat-white shadow-[4px_4px_0_0_#171412]"
              >
                {FUTURE_CONCEPTS.map((item) => (
                  <li key={item.slug} role="none">
                    <NavLink
                      role="menuitem"
                      to={`/coming-soon/${item.slug}`}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 font-body text-sm text-cat-black hover:bg-cat-paper"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>

      {/* Compact horizontal scroll nav for small screens */}
      <nav
        className="flex items-center gap-1 overflow-x-auto border-t border-cat-black/10 px-2 py-1 md:hidden"
        aria-label="Primary"
      >
        {PRIMARY_LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            <Icon size={14} strokeWidth={2.5} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
