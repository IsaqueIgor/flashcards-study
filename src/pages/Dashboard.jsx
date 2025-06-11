import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecks } from '../hooks/useFlashcards'
import { PlusIcon, BookOpenIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { ConfirmModal } from '../components/ui/Modal'

export default function Dashboard() {
  const { decks, loading, deleteDeck } = useDecks()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const handleDeleteDeck = async (deckId) => {
    await deleteDeck(deckId)
    setShowDeleteConfirm(null)
  }

  const filteredDecks = decks.filter(deck =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Loading your decks...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Flashcard Decks</h1>
        <p className="text-gray-600">
          {decks.length === 0 
            ? "No decks yet. Time to create your first one and pretend you'll actually study." 
            : `${decks.length} deck${decks.length !== 1 ? 's' : ''} ready for your procrastination.`
          }
        </p>
      </div>

      {/* Search and Create */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search decks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/create-deck">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Deck
          </Button>
        </Link>
      </div>

      {/* Decks Grid */}
      {filteredDecks.length === 0 ? (
        <Card className="text-center py-12">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No decks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try a different search term.' : 'Get started by creating a new deck.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link to="/create-deck">
                <Button>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create New Deck
                </Button>
              </Link>
            </div>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck) => (
            <Card key={deck.id} hover className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {deck.title}
                </h3>
                <div className="flex space-x-1">
                  <Link
                    to={`/deck/${deck.id}`}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit deck"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(deck.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete deck"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {deck.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {deck.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {deck.flashcards?.[0]?.count || 0} cards
                </span>
                <Link to={`/study/${deck.id}`}>
                  <Button variant="success" size="sm">
                    <BookOpenIcon className="h-4 w-4 mr-1" />
                    Study
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteDeck(showDeleteConfirm)}
        title="Delete Deck"
        message="Are you sure you want to delete this deck? This will also delete all flashcards in it."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
} 