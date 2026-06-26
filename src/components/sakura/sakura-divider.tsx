import { SakuraBranch } from "@/components/sakura/sakura-branch";

type SakuraDividerProps = {
  rotate?: number;
  flip?: boolean;
  variant?: "deep" | "soft";
};

/**
 * Inline section divider — a thin teal rule centred with a small sakura branch.
 * Used between major homepage sections for visual rhythm without page-splitting.
 */
export function SakuraDivider({ rotate = 0, flip = false, variant = "soft" }: SakuraDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none flex select-none items-center justify-center gap-4 py-7"
    >
      <span className="h-px w-12 max-w-[3rem] bg-[color:var(--accent-light)] opacity-40 sm:w-24" />
      <SakuraBranch
        className="w-32 text-[color:var(--apricot-deep)] sm:w-40"
        rotate={rotate}
        flip={flip}
        variant={variant}
      />
      <span className="h-px w-12 max-w-[3rem] bg-[color:var(--accent-light)] opacity-40 sm:w-24" />
    </div>
  );
}