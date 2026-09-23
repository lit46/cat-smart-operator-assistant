# Smart Operator Assistant — CAT Machinery

A digital co-pilot for CAT machine operators. See → Understand → Decide → Act → Learn.
Mock data only, no backend — React + Vite + Tailwind + Context API + localStorage.

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

> Built in a network-isolated sandbox, so `npm install` / `npm run dev` / `npm run build`
> could not be executed and verified here. All JSX was syntax-checked with esbuild and
> every relative import path was verified to resolve on disk, but a real `npm install`
> has not been run against this tree — see **Known limitations** below.

## Repo structure

```
/src
  /components   → StatusBadge, Card, TaskRow, NavBar, LearningCard, MapCard (Person 2 stub)
  /data         → machine.json, tasks.json, learning.json, worksite.json (Person 2 stub)
  /pages        → Dashboard, SafetyCheck, Tasks, Learning, Logbook, AskCat, WorksiteMap, ComingSoon
  /context      → AppStateContext (machine, tasks, logs, learning)
  /styles       → Tailwind entry + CAT design tokens
```

Files marked "Person 2" above (`MapCard.jsx`, `WorksiteMap.jsx`, `worksite.json`) are
scaffolded as empty/placeholder only — Map Track content is not built here.

## Design system

- **Brand**: CAT yellow `#FFC72C` / black `#171412` / white — used for chrome, nav,
  primary actions. Never used to represent a safety state.
- **Safety semaphore** (semantically separate from brand yellow): safe `#1F9D55`,
  attention `#F5A623`, warning `#E8590C`, critical `#D62828`. Always paired with an
  icon + text label in `StatusBadge`, never color alone.
- **Type**: Barlow Condensed (display/headlines) + Inter (body). Loaded via Google Fonts
  in `index.html`.
- **Shape**: squared corners (0–4px), solid borders instead of soft shadows — reads as
  equipment panelling, not a SaaS dashboard.

## Shared data contract: `zoneId`

`tasks.json` tasks carry a `zoneId` field (`zone-a`, `zone-b`, `zone-c`) matching the
zone IDs Person 2's `worksite.json` should use. This is the one field both tracks share —
don't rename it without updating both sides.

---

## Handoff note

## Phase 1 — Product + UX Foundation — Person 1 — 2026-09-23

**Completed:**
- Full repo scaffold (`/src/components`, `/data`, `/pages`, `/context`, `/styles`) per spec
- Design system: CAT yellow/black/white brand tokens + separate safety semaphore tokens
  (`tailwind.config.js`), Barlow Condensed + Inter type system
- Components: `StatusBadge`, `Card`, `TaskRow`, `NavBar`, `LearningCard`
- Mock data: `machine.json` (with sensor array + one active warning-level alert so the
  dashboard doesn't look all-green), `tasks.json` (6 shift tasks, `zoneId` on every task),
  `learning.json` (4 recommendations)
- `AppStateContext`: loads mock data, persists `tasks`/`logs`/`learning` to localStorage,
  exposes `addLogEntry` / `updateTaskStatus` / `activeTask` for Phase 3 and Phase 5 to build on
- Dashboard with all 4 required sections, each visibly distinct: Machine Safety,
  Worksite Map (placeholder slot only), Scheduled Tasks, Recommended Learning
- Routing for all main-track pages + a shared `ComingSoon` stub used both for the
  not-yet-built real pages (Safety, Learning, Worksite Map — Person 2's later phases)
  and for the explicitly out-of-scope future concepts (Voice Assistant, Incident
  Reporting, Efficiency Coach, Smart Scheduler, Team Coordination, Fleet Tracker,
  Maintenance Module) via `NavBar`'s "More" menu
- `Tasks.jsx` and `Logbook.jsx` given a light read-only treatment (real data, no
  interactivity) rather than a bare stub, since I own Phase 3 anyway and the data
  already existed — full start/complete/logging flow is still Phase 3 work
- `MapCard.jsx`, `WorksiteMap.jsx`, `worksite.json` scaffolded as empty placeholders only

**Changed:** N/A (first push)

**Remaining:**
- Phase 2 (Person 2): full Safety Check page + warning/critical alert modals
- Phase 3 (me): task start/in-progress/complete flow, Complete & Log modal, Logbook
  auto-population — this is also where `tasks.json`'s schema gets finalized/committed
- Phase 4 (Person 2): full Study Material page, quiz, completion state
- Phase 5 (me): Ask CAT chat panel referencing live state
- Map Track (Person 2, can start now): `MapCard.jsx`, `WorksiteMap.jsx`, `worksite.json`
  foundation, using the `zoneId` values already in `tasks.json` (`zone-a`, `zone-b`, `zone-c`)

**Known bugs:** None known, but see limitations below — the project has not had a real
`npm install` / `npm run dev` / `npm run build` run against it yet (sandbox had no
network access to fetch packages). JSX was syntax-checked with esbuild directly and all
relative import paths were verified to resolve on disk, but dependency resolution,
Tailwind's JIT class scanning end-to-end, and the router at runtime have not been
exercised. **First thing whoever pulls this should do: `npm install && npm run dev` and
fix anything that surfaces — flag it back in this file.**

**Next recommended step:** Run the app for real, confirm it actually renders/builds
clean, then either start Phase 3 (task flow) or hand Map Build 1 to Person 2 — both are
unblocked now that this is pushed.
