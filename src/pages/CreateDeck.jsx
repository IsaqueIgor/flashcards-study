import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDecks } from '../hooks/useFlashcards'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card, { CardContent } from '../components/ui/Card'

export default function CreateDeck() {
  const navigate = useNavigate()
  const { createDeck } = useDecks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const { data, error } = await createDeck(title, description)
      
      if (error) {
        console.error('Error creating deck:', error.message)
        alert('Error creating deck. Please try again.')
        return
      }
      
      // Navigate to the new deck
      navigate(`/deck/${data.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Deck</h1>
        <p className="text-gray-600 mt-2">
          Start a new collection of flashcards. Pick a catchy title, maybe something like "Stuff I'll Forget Tomorrow."
        </p>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Deck Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Japanese Vocabulary, Programming Concepts, Dad Jokes"
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of what this deck covers..."
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!title.trim()}
                className="flex-1"
              >
                Create Deck
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 