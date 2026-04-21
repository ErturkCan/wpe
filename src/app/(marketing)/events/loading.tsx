export default function EventsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-surface" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-surface" />
        ))}
      </div>
    </div>
  )
}
