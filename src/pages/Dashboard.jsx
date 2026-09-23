import { useNavigate } from 'react-router-dom'
import { Fuel, Gauge, ChevronRight } from 'lucide-react'
import { useAppState } from '../context/AppStateContext.jsx'
import Card from '../components/Card.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import TaskRow from '../components/TaskRow.jsx'
import LearningCard from '../components/LearningCard.jsx'
import MapCard from '../components/MapCard.jsx'

const ACCENT_BY_STATUS = {
  safe: 'safe',
  attention: 'attention',
  warning: 'warning',
  critical: 'critical',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { machine, tasks, learning } = useAppState()

  const flaggedSensor = machine.sensors.find((s) => s.status !== 'safe')
  const todaysTasks = tasks.slice(0, 4)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5">
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-cat-steel">
          Good morning, {machine.operator.split(' ')[0]}
        </p>
        <h1 className="font-display text-3xl font-bold text-cat-black">
          {machine.model} &middot; {machine.assetId}
        </h1>
      </div>

      {/* 1. Machine Safety */}
      <Card
        eyebrow="Machine Safety"
        title="Current Status"
        accent={ACCENT_BY_STATUS[machine.safetyStatus]}
        action={<StatusBadge status={machine.safetyStatus} size="lg" />}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cat-steel">
              <Gauge size={13} strokeWidth={2.5} /> Engine Hours
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-cat-black">
              {machine.engineHours.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cat-steel">
              <Fuel size={13} strokeWidth={2.5} /> Fuel Level
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-cat-black">
              {machine.fuelLevel}%
            </p>
          </div>
          {flaggedSensor && (
            <div className="col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-cat-steel">
                {flaggedSensor.label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-safety-warning">
                {flaggedSensor.value}
                {flaggedSensor.unit}
                <span className="ml-2 font-body text-sm font-normal text-cat-steel">
                  normal {flaggedSensor.normalRange[0]}&ndash;{flaggedSensor.normalRange[1]}
                  {flaggedSensor.unit}
                </span>
              </p>
            </div>
          )}
        </div>

        {machine.activeAlert && (
          <div className="mt-4 border border-safety-warning bg-safety-warning-dim p-3">
            <p className="font-body text-sm font-semibold text-cat-black">
              {machine.activeAlert.message}
            </p>
            <p className="mt-1 text-sm text-cat-steel">{machine.activeAlert.recommendedAction}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('/safety')}
          className="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold uppercase tracking-wide text-cat-black hover:underline"
        >
          Full Safety Check
          <ChevronRight size={15} strokeWidth={2.5} />
        </button>
      </Card>

      {/* 2. Worksite Safety Map — placeholder slot only. Person 2 fills with MapCard. */}
      <Card
        eyebrow="Worksite Safety"
        title="Zone Map"
        action={
          <button
            type="button"
            onClick={() => navigate('/map')}
            className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wide text-cat-steel hover:text-cat-black"
          >
            Full Map
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        }
      >
        <MapCard />
        <div className="flex h-40 items-center justify-center border border-dashed border-cat-black/30 bg-cat-paper text-sm text-cat-steel">
          Map view — Person 2 / Map Track
        </div>
      </Card>

      {/* 3. Scheduled Tasks */}
      <Card
        eyebrow="Today's Shift"
        title="Scheduled Tasks"
        action={
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wide text-cat-steel hover:text-cat-black"
          >
            View All
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        }
      >
        <div>
          {todaysTasks.map((task) => (
            <TaskRow key={task.id} task={task} onSelect={() => navigate('/tasks')} />
          ))}
        </div>
      </Card>

      {/* 4. Recommended Learning */}
      <Card
        eyebrow="Stay Sharp"
        title="Recommended Learning"
        action={
          <button
            type="button"
            onClick={() => navigate('/learning')}
            className="inline-flex items-center gap-1 font-display text-xs font-semibold uppercase tracking-wide text-cat-steel hover:text-cat-black"
          >
            View All
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        }
        bodyClassName="overflow-x-auto"
      >
        <div className="flex gap-3">
          {learning
            .filter((item) => item.status !== 'completed')
            .map((item) => (
              <LearningCard key={item.id} item={item} onSelect={() => navigate('/learning')} />
            ))}
        </div>
      </Card>
    </div>
  )
}
