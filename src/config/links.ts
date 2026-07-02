// ============================================================
// Edit these to update profile info and destination links.
// ============================================================

export const profile = {
  name: "Goth Kayla",
  tagline: "Your new obsession — unfiltered, exclusive & all mine 🖤",
  socialProof: "Join 5,000+ fans inside",
};

// The premium platform link (used by the primary CTA + age gate).
export const PREMIUM_URL = "https://www.fanvue.com/gothkayla";

export const primaryCta = {
  label: "my 🫢 content",
  sub: "Unlock everything — instant access",
  href: PREMIUM_URL,
};

export const secondaryCtas = [
  {
    label: "Chat with me",
    sub: "Slide into my DMs 💬",
    href: "https://t.me/gothkaylaa",
    icon: "telegram" as const,
  },
];

// Social media links shown as glowing icon buttons.
export const socialLinks = [
  {
    label: "Fanvue",
    href: "https://www.fanvue.com/gothkayla",
    icon: "fanvue" as const,
  },
  {
    label: "Telegram",
    href: "https://t.me/gothkaylaa",
    icon: "telegram" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gothkylaa/",
    icon: "instagram" as const,
  },
  {
    label: "X",
    href: "https://x.com/GothKaylaa",
    icon: "x" as const,
  },
];

// How long (ms) to remember the 18+ confirmation. Default: 7 days.
export const AGE_GATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const AGE_GATE_STORAGE_KEY = "age_confirmed_at";
