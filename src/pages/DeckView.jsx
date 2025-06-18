import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDeck } from '../hooks/useFlashcards'
import { ArrowLeftIcon, PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import Card, { CardContent } from '../components/ui/Card'
import Modal, { ConfirmModal } from '../components/ui/Modal'
import FlashcardForm from '../features/flashcards/FlashcardForm'
import FlashcardList from '../features/flashcards/FlashcardList'
import ErrorBoundary from '../components/ErrorBoundary'

export default function DeckView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deck, cards, loading, createCard, updateCard, deleteCard } = useDeck(id)
  const [showCardForm, setShowCardForm] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  const handleCardSubmit = async (formData) => {
    const { error } = editingCard 
      ? await updateCard(editingCard.id, formData.front, formData.back, formData.tags)
      : await createCard(formData.front, formData.back, formData.tags)

    if (error) {
      console.error('Error saving card:', error.message)
      return
    }

    // Reset form
    setShowCardForm(false)
    setEditingCard(null)
  }

  const handleEditCard = (card) => {
    setEditingCard(card)
    setShowCardForm(true)
  }

  const handleDeleteCard = async (cardId) => {
    await deleteCard(cardId)
    setShowDeleteConfirm(null)
  }

  const cancelCardForm = () => {
    setShowCardForm(false)
    setEditingCard(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-gray-600">Loading deck...</div>
      </div>
    )
  }

  if (!deck) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-gray-600">Deck not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deck.title}</h1>
            {deck.description && (
              <p className="text-gray-600 mt-2">{deck.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {cards.length} card{cards.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowCardForm(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Card
            </Button>
            {cards.length > 0 && (
              <Link to={`/study/${id}`}>
                <Button variant="success">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  Study
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <ErrorBoundary>
        <FlashcardList
          cards={cards}
          onEdit={handleEditCard}
          onDelete={(cardId) => setShowDeleteConfirm(cardId)}
        />

        {/* Add First Card Button for Empty Deck */}
        {cards.length === 0 && (
          <div className="text-center mt-6">
            <Button onClick={() => setShowCardForm(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add First Card
            </Button>
          </div>
        )}
      </ErrorBoundary>

      {/* Add/Edit Card Modal */}
      <Modal
        isOpen={showCardForm}
        onClose={cancelCardForm}
        title={editingCard ? 'Edit Card' : 'Add New Card'}
        size="lg"
      >
        <FlashcardForm
          initialData={editingCard ? {
            front: editingCard.front,
            back: editingCard.back,
            tags: editingCard.tags ? editingCard.tags.join(', ') : ''
          } : undefined}
          onSubmit={handleCardSubmit}
          onCancel={cancelCardForm}
          isEditing={!!editingCard}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDeleteCard(showDeleteConfirm)}
        title="Delete Card"
        message="Are you sure you want to delete this flashcard?"
        confirmText="Delete"
        variant="danger"
      />
    </div>
  )
} 