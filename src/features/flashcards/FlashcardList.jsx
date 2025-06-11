import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '../../components/ui/Card'

export default function FlashcardList({ cards, onEdit, onDelete }) {
  if (cards.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-500">
          <div className="text-lg font-medium mb-2">No cards yet</div>
          <div className="text-sm">Add your first card to get started with this deck.</div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card key={card.id} hover>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Front</h4>
                  <p className="text-gray-900">{card.front}</p>
                </div>
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Back</h4>
                  <p className="text-gray-900">{card.back}</p>
                </div>
                {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {card.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(card)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit card"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(card.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete card"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
} 