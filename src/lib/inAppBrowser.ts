// ============================================================
// In-app browser detection + "escape" helpers.
// Recovers conversions lost inside Instagram / TikTok webviews
// (broken login, broken tracking) by pushing users to their
// real default browser — the core "deep link" trick.
// ============================================================

export type Platform = "ios" | "android" | "other";

export function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Instagram|FBAN|FBAV|FB_IAB|Messenger|TikTok|musical_ly|Bytedance|Snapchat|Twitter|Line\/|Pinterest|LinkedInApp|GSA/i.test(
    ua,
  );
}

export function getPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

/**
 * Best-effort: open a URL in the device's real default browser,
 * escaping the in-app webview.
 * - Android: fires a Chrome `intent://` (reliable break-out).
 * - iOS / other: normal new-tab open (iOS blocks forced break-out,
 *   so the banner guides the user to "Open in browser").
 */
export function openInDefaultBrowser(url: string): void {
  if (typeof window === "undefined") return;
  const platform = getPlatform();

  if (platform === "android" && isInAppBrowser()) {
    const clean = url.replace(/^https?:\/\//, "");
    window.location.href = `intent://${clean}#Intent;scheme=https;package=com.android.chrome;end`;
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}
