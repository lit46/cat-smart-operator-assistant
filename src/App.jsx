import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SafetyCheck from './pages/SafetyCheck.jsx'
import Tasks from './pages/Tasks.jsx'
import Learning from './pages/Learning.jsx'
import Logbook from './pages/Logbook.jsx'
import AskCat from './pages/AskCat.jsx'
import WorksiteMap from './pages/WorksiteMap.jsx'
import ComingSoon from './pages/ComingSoon.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-cat-paper">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/safety" element={<SafetyCheck />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/ask-cat" element={<AskCat />} />
          <Route path="/map" element={<WorksiteMap />} />
          <Route path="/coming-soon/:feature" element={<ComingSoon />} />
          <Route path="*" element={<ComingSoon title="Not Found" note="That page doesn't exist." />} />
        </Routes>
      </main>
    </div>
  )
}
