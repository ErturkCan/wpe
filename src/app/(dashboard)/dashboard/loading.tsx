export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-surface" />
      <div className="h-4 w-64 animate-pulse rounded-lg bg-surface" />
      <div className="mt-8 grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-surface" />
        ))}
      </div>
    </div>
  )
}
