import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

interface AgeGateModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AgeGateModal({ open, onConfirm, onCancel }: AgeGateModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onCancel}
          />

          <motion.div
            className="glow-ring relative w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card p-7 text-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <ShieldCheck className="h-8 w-8" strokeWidth={2.2} />
            </div>

            <h2 id="age-gate-title" className="text-2xl font-extrabold tracking-tight">
              18+ Only
            </h2>
            <p className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
              This content is intended for adults only. By continuing, you confirm
              you are 18 years or older.
            </p>

            <button
              onClick={onConfirm}
              className="animate-pulse-glow mt-7 w-full rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--gradient-primary)" }}
            >
              I&apos;m 18+ — Continue
            </button>

            <button
              onClick={onCancel}
              className="mt-3 w-full rounded-2xl px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Go Back
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
