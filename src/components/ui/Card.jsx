export default function Card({ children, className = '', hover = false, ...props }) {
  const baseClasses = 'bg-white rounded-lg shadow-md'
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow' : ''
  const classes = `${baseClasses} ${hoverClasses} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
} 