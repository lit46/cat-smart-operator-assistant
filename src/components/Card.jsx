/**
 * Card
 *
 * Generic CAT-system container. Squared corners and a solid border rather
 * than a soft drop-shadow — reads as equipment panelling, not a SaaS tile.
 *
 * accent: optional left rule, one of the keys in ACCENT_CLASSES below.
 * (Kept as a static map rather than a template string, since Tailwind's
 * compiler can't pick up dynamically-built class names.)
 */
const ACCENT_CLASSES = {
  yellow: 'border-l-4 border-l-cat-yellow',
  safe: 'border-l-4 border-l-safety-safe',
  attention: 'border-l-4 border-l-safety-attention',
  warning: 'border-l-4 border-l-safety-warning',
  critical: 'border-l-4 border-l-safety-critical',
}

export default function Card({
  title,
  eyebrow,
  action,
  accent,
  children,
  className = '',
  bodyClassName = '',
}) {
  const accentClass = accent ? ACCENT_CLASSES[accent] ?? '' : ''

  return (
    <section className={`border border-cat-black bg-cat-white ${accentClass} ${className}`}>
      {(title || eyebrow || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-cat-black/10 px-4 py-3">
          <div>
            {eyebrow && (
              <p className="font-display text-xs font-semibold tracking-wide text-cat-steel">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-xl font-semibold leading-none text-cat-black">
                {title}
              </h2>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </section>
  )
}
