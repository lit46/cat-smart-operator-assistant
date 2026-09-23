/**
 * StatusBadge
 *
 * The single source of visual truth for safety/status states across the app.
 * Status is always shown with BOTH color and text/icon — never color alone,
 * since a caution amber sitting next to CAT brand yellow needs to read as
 * unmistakably different at a glance.
 *
 * status: 'safe' | 'attention' | 'warning' | 'critical'
 */
import { AlertTriangle, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

const STATUS_CONFIG = {
  safe: {
    label: 'Safe',
    icon: CheckCircle2,
    text: 'text-safety-safe',
    bg: 'bg-safety-safe-dim',
    border: 'border-safety-safe',
    dot: 'bg-safety-safe',
  },
  attention: {
    label: 'Attention',
    icon: AlertTriangle,
    text: 'text-safety-attention',
    bg: 'bg-safety-attention-dim',
    border: 'border-safety-attention',
    dot: 'bg-safety-attention',
  },
  warning: {
    label: 'Warning',
    icon: AlertCircle,
    text: 'text-safety-warning',
    bg: 'bg-safety-warning-dim',
    border: 'border-safety-warning',
    dot: 'bg-safety-warning',
  },
  critical: {
    label: 'Do Not Operate',
    icon: XCircle,
    text: 'text-safety-critical',
    bg: 'bg-safety-critical-dim',
    border: 'border-safety-critical',
    dot: 'bg-safety-critical',
  },
}

const SIZE_CONFIG = {
  sm: { pad: 'px-2 py-0.5', text: 'text-xs', icon: 12, gap: 'gap-1' },
  md: { pad: 'px-3 py-1', text: 'text-sm', icon: 15, gap: 'gap-1.5' },
  lg: { pad: 'px-4 py-1.5', text: 'text-base', icon: 18, gap: 'gap-2' },
}

export default function StatusBadge({ status = 'safe', label, size = 'md', dotOnly = false }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.safe
  const sz = SIZE_CONFIG[size] ?? SIZE_CONFIG.md
  const Icon = cfg.icon

  if (dotOnly) {
    return (
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full ${cfg.dot}`}
        role="img"
        aria-label={label ?? cfg.label}
      />
    )
  }

  return (
    <span
      className={`inline-flex items-center ${sz.gap} ${sz.pad} border ${cfg.border} ${cfg.bg} font-display font-semibold uppercase tracking-wide ${cfg.text} ${sz.text}`}
    >
      <Icon size={sz.icon} strokeWidth={2.5} aria-hidden="true" />
      {label ?? cfg.label}
    </span>
  )
}

export { STATUS_CONFIG }
