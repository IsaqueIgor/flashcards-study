export default function Logo({ className = "" }) {
  return (
    <div className={`font-bold ${className}`}>
      <span className="text-blue-600">flash</span>
      <span className="text-gray-900">Study</span>
    </div>
  );
} 