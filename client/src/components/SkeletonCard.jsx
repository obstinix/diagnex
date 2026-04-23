export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden animate-pulse glass-card p-6 space-y-4">
      <div className="h-4 bg-white/10 rounded-full w-1/3" />
      <div className="h-8 bg-white/10 rounded-full w-2/3" />
      <div className="h-3 bg-white/10 rounded-full w-full" />
      <div className="h-3 bg-white/10 rounded-full w-4/5" />
      <div className="flex justify-between pt-2">
        <div className="h-7 w-20 bg-white/10 rounded-full" />
        <div className="h-7 w-16 bg-white/10 rounded-lg" />
      </div>
      {/* Scan line overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan" />
      </div>
    </div>
  )
}
