import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import DeckView from '../pages/DeckView'
import StudyMode from '../pages/StudyMode'
import CreateDeck from '../pages/CreateDeck'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create-deck" element={<CreateDeck />} />
      <Route path="/deck/:id" element={<DeckView />} />
      <Route path="/study/:id" element={<StudyMode />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
} 