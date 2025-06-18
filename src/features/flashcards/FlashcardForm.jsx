import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import ErrorBoundary from '../../components/ErrorBoundary'

export default function FlashcardForm({ 
  initialData = { front: '', back: '', tags: '' },
  onSubmit,
  onCancel,
  isEditing = false,
  loading = false
}) {
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.front.trim() || !formData.back.trim()) return
    onSubmit(formData)
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-2">
          Front (Question) *
        </label>
        <textarea
          id="front"
          value={formData.front}
          onChange={handleChange('front')}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the question or prompt..."
        />
      </div>
      
      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-2">
          Back (Answer) *
        </label>
        <textarea
          id="back"
          value={formData.back}
          onChange={handleChange('back')}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the answer or explanation..."
        />
      </div>
      
      <Input
        label="Tags (Optional)"
        type="text"
        value={formData.tags}
        onChange={handleChange('tags')}
        placeholder="e.g., difficult, vocabulary, chapter-1 (comma separated)"
      />
      
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={!formData.front.trim() || !formData.back.trim()}
          className="flex-1"
        >
          {isEditing ? 'Update Card' : 'Add Card'}
        </Button>
      </div>
    </form>
  </ErrorBoundary>
  )
} 