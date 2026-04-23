export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent-cyan)] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[var(--accent-blue)] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  )
}
