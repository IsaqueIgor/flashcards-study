import React, { forwardRef } from 'react'

const InputInner = forwardRef(({
  label, 
  error, 
  className = '', 
  type = 'text',
  required = false,
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-3 py-2 border rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-300' : 'border-gray-300'}
    ${className}
  `.trim()

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

InputInner.displayName = 'Input'

const Input = React.memo(InputInner)
export default Input 