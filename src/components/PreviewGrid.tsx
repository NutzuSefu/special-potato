import { motion } from "motion/react";
import { Lock } from "lucide-react";

const tiles = [
  { tint: "oklch(0.45 0.2 350 / 0.55)", label: "LOCKED" },
  { tint: "oklch(0.4 0.18 320 / 0.55)", label: "VIP" },
  { tint: "oklch(0.42 0.16 300 / 0.55)", label: "NEW" },
  { tint: "oklch(0.4 0.2 340 / 0.55)", label: "LOCKED" },
  { tint: "oklch(0.44 0.16 290 / 0.55)", label: "VIP" },
  { tint: "oklch(0.42 0.2 350 / 0.55)", label: "LOCKED" },
];

export function PreviewGrid({ onLockClick }: { onLockClick: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {tiles.map((tile, i) => (
        <motion.button
          key={i}
          onClick={onLockClick}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border"
          aria-label="Locked content — tap to unlock"
        >
          {/* Blurred faux thumbnail */}
          <div
            className="absolute inset-0 blur-md"
            style={{
              background: `radial-gradient(120% 120% at 30% 20%, ${tile.tint}, oklch(0.16 0.02 295)),
                radial-gradient(80% 80% at 80% 90%, var(--glow-2) / 0.25, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-background/30" />

          <div className="relative flex h-full flex-col items-center justify-center gap-1.5">
            <Lock className="h-5 w-5 text-foreground/90 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-[0.6rem] font-bold tracking-widest text-foreground/80">
              {tile.label}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
