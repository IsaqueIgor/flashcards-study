import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import Login from './pages/Login'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return <Login />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar session={session} />
        <main className="container mx-auto px-4 py-8">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  )
}

export default App
