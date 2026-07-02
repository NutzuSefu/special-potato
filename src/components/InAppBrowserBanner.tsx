import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";

import {
  getPlatform,
  isInAppBrowser,
  openInDefaultBrowser,
} from "@/lib/inAppBrowser";

/**
 * Shown only when the page is opened inside an in-app browser
 * (Instagram / TikTok / etc). Nudges the user into their real
 * browser so links, login and tracking work correctly.
 */
export function InAppBrowserBanner() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    if (isInAppBrowser()) {
      setPlatform(getPlatform());
      setShow(true);
    }
  }, []);

  const handleOpen = () => {
    openInDefaultBrowser(window.location.href);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
        >
          <div
            className="animate-pulse-glow relative mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-primary/40 bg-card/95 px-4 py-3 backdrop-blur-md"
            style={{ boxShadow: "0 0 30px -10px var(--glow)" }}
          >
            <div className="flex-1 text-left">
              <p className="text-[0.8rem] font-bold leading-tight">
                Deschide în browser pentru experiența completă ✨
              </p>
              <p className="mt-0.5 text-[0.7rem] leading-snug text-muted-foreground">
                {platform === "ios"
                  ? "Apasă ⋯ sus în dreapta → „Deschide în browser”"
                  : "Ca să meargă totul perfect (login & acces instant)"}
              </p>
            </div>

            {platform === "android" ? (
              <button
                onClick={handleOpen}
                className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Deschide
              </button>
            ) : (
              <ExternalLink className="h-5 w-5 shrink-0 text-primary" />
            )}

            <button
              onClick={() => setShow(false)}
              aria-label="Închide"
              className="shrink-0 text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
