import React from 'react'

function CardComponent({ children, className = '', hover = false, ...props }) {
  const baseClasses = 'bg-white rounded-lg shadow-md'
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
export const Card = React.memo(CardComponent)
export default Card // Default export for convenience

function CardHeaderComponent({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}
export const CardHeader = React.memo(CardHeaderComponent)

function CardContentComponent({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
export const CardContent = React.memo(CardContentComponent)

function CardFooterComponent({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}
export const CardFooter = React.memo(CardFooterComponent)