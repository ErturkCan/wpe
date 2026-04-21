export default function AdminLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-surface" />
        ))}
      </div>
      <div className="mt-8 h-64 animate-pulse rounded-xl border border-border bg-surface" />
    </div>
  )
}
