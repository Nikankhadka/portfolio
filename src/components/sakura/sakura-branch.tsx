import { cn } from "@/lib/utils";

type SakuraBranchProps = {
  className?: string;
  flip?: boolean;
  /** 0-359 deg — different per divider so each branch looks unique */
  rotate?: number;
  /** variant controls stroke shade */
  variant?: "deep" | "soft";
};

/**
 * Single hand-inked sakura branch — placed as a divider between sections.
 * Ink stroke uses apricot-deep for an editorial feel; blossoms use a soft apricot gradient.
 */
export function SakuraBranch({ className, flip = false, rotate = 0, variant = "soft" }: SakuraBranchProps) {
  const ink = variant === "deep" ? "#8c5a3b" : "#a8704a";
  return (
    <svg
      viewBox="0 0 200 60"
      className={cn("opacity-60", className)}
      style={{ transform: `scaleX(${flip ? -1 : 1}) rotate(${rotate}deg)` }}
      aria-hidden="true"
      fill="none"
    >
      {/* main branch */}
      <path
        d="M4 40 C40 36 80 38 120 32 C160 26 180 22 196 16"
        stroke={ink}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* sub-branch up */}
      <path
        d="M60 38 C68 30 74 24 80 16"
        stroke={ink}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* sub-branch down */}
      <path
        d="M120 32 C126 40 132 46 138 52"
        stroke={ink}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* sub-branch mid */}
      <path
        d="M160 26 C166 20 170 16 172 10"
        stroke={ink}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* blossom cluster 1 (top of sub-branch up) */}
      <g transform="translate(80 16)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-2.4"
            rx="1.8"
            ry="2.6"
            fill="#f7c4ad"
            opacity="0.9"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="1" fill="#e89b6b" opacity="0.85" />
      </g>
      {/* blossom cluster 2 (end down) */}
      <g transform="translate(138 52)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-2"
            rx="1.4"
            ry="2.1"
            fill="#fbcab1"
            opacity="0.85"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="0.8" fill="#e89b6b" opacity="0.8" />
      </g>
      {/* blossom cluster 3 (end right) */}
      <g transform="translate(196 16)">
        {[30, 102, 174, 246, 318].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-2.2"
            rx="1.6"
            ry="2.4"
            fill="#f5bda3"
            opacity="0.88"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="0.95" fill="#e89b6b" />
      </g>
      {/* a couple of single buds on the main branch */}
      <circle cx="172" cy="10" r="1.1" fill="#f7c4ad" opacity="0.8" />
      <circle cx="100" cy="35" r="0.9" fill="#fbcab1" opacity="0.7" />
    </svg>
  );
}