import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Clock, Instagram, Sparkles } from "lucide-react";

import profileAsset from "@/assets/profile.png.asset.json";
import { AgeGateModal } from "@/components/AgeGateModal";
import { InAppBrowserBanner } from "@/components/InAppBrowserBanner";
import { PreviewGrid } from "@/components/PreviewGrid";
import { openInDefaultBrowser } from "@/lib/inAppBrowser";
import {
  AGE_GATE_STORAGE_KEY,
  AGE_GATE_TTL_MS,
  primaryCta,
  profile,
  secondaryCtas,
  socialLinks,
} from "@/config/links";

const SocialIcon = ({ icon, className = "h-5 w-5" }: { icon: string; className?: string }) => {
  if (icon === "instagram") return <Instagram className={className} />;
  if (icon === "telegram")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.94 4.34 18.7 19.6c-.24 1.08-.88 1.34-1.78.83l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.02 9.13-8.25c.4-.35-.09-.55-.62-.2L6.2 13.05l-4.86-1.52c-1.06-.33-1.08-1.06.22-1.57l19-7.32c.88-.33 1.65.2 1.38 1.7Z" />
      </svg>
    );
  if (icon === "fanvue")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 3h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8v3h9a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.4L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
    </svg>
  );
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Exclusive Content` },
      {
        name: "description",
        content:
          "Unlock exclusive, members-only content. Free previews, VIP access & daily drops. 18+ only.",
      },
      { property: "og:title", content: `${profile.name} — Exclusive Content` },
      {
        property: "og:description",
        content: "Free previews, VIP access & daily drops. 18+ only.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BridgePage,
});

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

function BridgePage() {
  const [gateOpen, setGateOpen] = useState(false);

  const hasValidConfirmation = useCallback(() => {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(AGE_GATE_STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    return Number.isFinite(ts) && Date.now() - ts < AGE_GATE_TTL_MS;
  }, []);

  const goToContent = useCallback(() => {
    // Escape in-app browsers so login & tracking work on the premium platform.
    openInDefaultBrowser(primaryCta.href);
  }, []);

  const handlePrimary = useCallback(() => {
    if (hasValidConfirmation()) {
      goToContent();
      return;
    }
    // small delay before showing popup for smoother UX
    window.setTimeout(() => setGateOpen(true), 150);
  }, [hasValidConfirmation, goToContent]);

  const handleConfirm = useCallback(() => {
    window.localStorage.setItem(AGE_GATE_STORAGE_KEY, String(Date.now()));
    setGateOpen(false);
    goToContent();
  }, [goToContent]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center overflow-hidden px-5 pb-12 pt-12">
      {/* ===== In-app browser escape (deep-link recovery) ===== */}
      <InAppBrowserBanner />
      {/* ===== Ambient glow blobs ===== */}
      <div
        className="animate-float pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div
        className="animate-pulse-glow pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />

      {/* ===== Above the fold ===== */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative animate-float">
          <div
            className="absolute -inset-1 rounded-full opacity-70 blur-md"
            style={{ background: "var(--gradient-primary)" }}
          />
          <img
            src={profileAsset.url}
            alt={profile.name}
            className="glow-ring relative h-32 w-32 rounded-full border-2 border-border object-cover"
            loading="eager"
          />
        </div>

        <div className="mt-5 flex items-center gap-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight">{profile.name}</h1>
          <BadgeCheck className="h-6 w-6 text-primary" />
        </div>

        <p className="mt-2.5 max-w-[20rem] text-[0.95rem] leading-relaxed text-muted-foreground">
          {profile.tagline}
        </p>

        <div className="mt-4 flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold text-foreground/90">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {profile.socialProof}
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Online now
          </div>
        </div>
      </motion.div>

      {/* ===== CTA section ===== */}
      <div className="relative z-10 mt-9 w-full space-y-3.5">
        <motion.button
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={handlePrimary}
          className="animate-pulse-glow group relative w-full overflow-hidden rounded-2xl px-6 py-5 text-left text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-lg font-extrabold tracking-tight">
                {primaryCta.label}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-primary-foreground/85">
                {primaryCta.sub}
              </span>
            </div>
            <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>

        {secondaryCtas.map((cta, i) => (
          <motion.a
            key={cta.label}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-border bg-card/70 px-5 py-4 transition-all duration-200 hover:border-primary/60 hover:bg-card hover:shadow-[0_0_30px_-12px_var(--glow)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <SocialIcon icon={cta.icon} className="h-4 w-4" />
              </span>
              <div className="text-left">
                <span className="block text-[0.95rem] font-bold">{cta.label}</span>
                <span className="block text-xs text-muted-foreground">{cta.sub}</span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </motion.a>
        ))}
      </div>

      {/* ===== Social icons ===== */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 mt-5 flex items-center justify-center gap-3"
      >
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/70 text-foreground/90 transition-all duration-200 hover:scale-110 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--glow)]"
          >
            <SocialIcon icon={s.icon} />
          </a>
        ))}
      </motion.div>



      {/* ===== Urgency strip ===== */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mt-6 flex w-full items-center justify-center gap-5 text-xs font-medium text-muted-foreground"
      >
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Limited access
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" />
          New content added daily
        </span>
      </motion.div>

      {/* ===== Locked preview grid ===== */}
      <div className="relative z-10 mt-9 w-full">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-tight">A peek behind the lock 🔒</h2>
          <span className="text-xs text-muted-foreground">Tap to unlock</span>
        </div>
        <PreviewGrid onLockClick={handlePrimary} />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Full uncensored gallery waiting inside ✨
        </p>
      </div>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 mt-12 flex flex-col items-center gap-1 text-center">
        <span className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-bold tracking-widest text-muted-foreground">
          18+ ONLY
        </span>
        <p className="mt-2 text-[0.7rem] text-muted-foreground/70">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>

      <AgeGateModal
        open={gateOpen}
        onConfirm={handleConfirm}
        onCancel={() => setGateOpen(false)}
      />
    </main>
  );
}
