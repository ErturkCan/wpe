import { cn } from "@/lib/utils"

interface EWPLogoProps {
  variant?: "dark" | "light"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function EWPLogo({ variant = "dark", size = "md", className }: EWPLogoProps) {
  const textColor = variant === "light" ? "#F8F5EF" : "#0F1E3C"
  const goldColor = "#B8960C"

  const dims = {
    sm: { bracket: 18, letter: 20, gap: 6, subtitleSize: 9 },
    md: { bracket: 24, letter: 26, gap: 8, subtitleSize: 11 },
    lg: { bracket: 36, letter: 38, gap: 12, subtitleSize: 14 },
  }[size]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* [EWP] mark */}
      <svg
        width={dims.bracket * 3 + dims.letter * 3 + dims.gap * 4}
        height={dims.bracket + 8}
        viewBox={`0 0 ${dims.bracket * 3 + dims.letter * 3 + dims.gap * 4} ${dims.bracket + 8}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EWP"
      >
        {/* Left bracket */}
        <text
          x="0"
          y={dims.bracket}
          fontFamily="'Cormorant Garamond', Garamond, Georgia, serif"
          fontSize={dims.bracket + 6}
          fontWeight="300"
          fill={goldColor}
        >[</text>

        {/* EWP letters */}
        <text
          x={dims.gap + dims.bracket * 0.6}
          y={dims.bracket}
          fontFamily="'Cormorant Garamond', Garamond, Georgia, serif"
          fontSize={dims.bracket + 2}
          fontWeight="600"
          fill={textColor}
          letterSpacing="1"
        >EWP</text>

        {/* Right bracket */}
        <text
          x={dims.gap * 2 + dims.bracket * 0.6 + dims.letter * 3 + 4}
          y={dims.bracket}
          fontFamily="'Cormorant Garamond', Garamond, Georgia, serif"
          fontSize={dims.bracket + 6}
          fontWeight="300"
          fill={goldColor}
        >]</text>
      </svg>

      {/* Wordmark */}
      {size !== "sm" && (
        <div className="flex flex-col leading-none">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontSize: dims.subtitleSize + 3,
              fontWeight: 600,
              color: textColor,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Executive Workshop
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif",
              fontSize: dims.subtitleSize + 3,
              fontWeight: 400,
              color: goldColor,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Programs
          </span>
        </div>
      )}
    </div>
  )
}
