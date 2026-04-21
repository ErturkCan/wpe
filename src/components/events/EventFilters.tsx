"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Teknoloji", "Finans", "Liderlik", "Pazarlama", "Sağlık", "Hukuk", "Diğer"]
const FORMATS = [
  { value: "IN_PERSON", label: "Yüz Yüze" },
  { value: "VIRTUAL", label: "Online" },
  { value: "HYBRID", label: "Hibrit" },
]

export function EventFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get("category") ?? ""
  const activeFormat = searchParams.get("format") ?? ""
  const hasFilters = activeCategory || activeFormat

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearFilters = () => {
    router.push(pathname)
  }

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {/* Category filters */}
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => updateParam("category", activeCategory === cat ? "" : cat)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            activeCategory === cat
              ? "border-accent bg-accent-light text-accent"
              : "border-border bg-background text-text-secondary hover:border-accent/30 hover:bg-surface hover:text-text-primary"
          )}
        >
          {cat}
        </button>
      ))}

      <div className="ml-1 h-5 w-px bg-border" />

      {/* Format filters */}
      {FORMATS.map((fmt) => (
        <button
          key={fmt.value}
          onClick={() => updateParam("format", activeFormat === fmt.value ? "" : fmt.value)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            activeFormat === fmt.value
              ? "border-accent bg-accent-light text-accent"
              : "border-border bg-background text-text-secondary hover:border-accent/30 hover:bg-surface hover:text-text-primary"
          )}
        >
          {fmt.label}
        </button>
      ))}

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="ml-1 flex items-center gap-1.5 rounded-full border border-dashed border-border px-3.5 py-1.5 text-sm text-text-muted transition-colors hover:border-error hover:text-error"
        >
          <X className="h-3.5 w-3.5" />
          Temizle
        </button>
      )}
    </div>
  )
}
