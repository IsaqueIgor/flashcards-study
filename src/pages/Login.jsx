import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card, { CardContent } from '../components/ui/Card'

export default function Login() {
  const { signIn, signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)
        
      if (error) throw error
      
      if (isSignUp) {
        setMessage('Check your email for the confirmation link!')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ready to study some flashcards? Or at least pretend to?
          </p>
        </div>
        
        <Card>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />

              {message && (
                <div className={`text-sm text-center ${
                  message.includes('Check your email') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message}
                </div>
              )}

              <Button
                type="submit"
                loading={loading}
                className="w-full"
              >
                {isSignUp ? 'Sign up' : 'Sign in'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-500 text-sm"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 