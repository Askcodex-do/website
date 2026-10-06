"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Question actions: like, bookmark, share, report.
 *
 * Share targets are built from the canonical URL. Likes and bookmarks require a
 * signed-in user; the server is the source of truth for both.
 */
export function QuestionActions({
  questionId,
  canonicalUrl,
  stem,
  initialLiked,
  initialBookmarked,
  signedIn,
  likeCount,
  bookmarkCount,
}: {
  questionId: string;
  canonicalUrl: string;
  stem: string;
  initialLiked: boolean;
  initialBookmarked: boolean;
  signedIn: boolean;
  likeCount: number;
  bookmarkCount: number;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [likes, setLikes] = useState(likeCount);
  const [bookmarks, setBookmarks] = useState(bookmarkCount);
  const [status, setStatus] = useState<string | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("WRONG_ANSWER");
  const [reportMessage, setReportMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const shareText = `${stem} — check your answer`;

  async function toggle(kind: "like" | "bookmark") {
    if (!signedIn) {
      router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/questions/${questionId}/${kind}`, {
        method: "POST",
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error);
      if (kind === "like") {
        const next = payload.data.liked as boolean;
        setLiked(next);
        setLikes((n) => n + (next ? 1 : -1));
        setStatus(next ? "Added to your liked questions." : "Removed from likes.");
      } else {
        const next = payload.data.bookmarked as boolean;
        setBookmarked(next);
        setBookmarks((n) => n + (next ? 1 : -1));
        setStatus(next ? "Saved to your bookmarks." : "Removed from bookmarks.");
      }
    } catch {
      setStatus("Could not update. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function share(target: "copy" | "native" | "whatsapp" | "facebook" | "x" | "linkedin") {
    if (target === "copy") {
      try {
        await navigator.clipboard.writeText(canonicalUrl);
        setStatus("Link copied to clipboard.");
      } catch {
        setStatus(`Copy this link: ${canonicalUrl}`);
      }
      return;
    }
    if (target === "native" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: stem, text: shareText, url: canonicalUrl });
      } catch {
        /* user cancelled */
      }
      return;
    }
    const encodedUrl = encodeURIComponent(canonicalUrl);
    const encodedText = encodeURIComponent(shareText);
    const targets: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
    window.open(targets[target], "_blank", "noopener,noreferrer,width=600,height=600");
  }

  async function submitReport() {
    setBusy(true);
    try {
      const response = await fetch(`/api/questions/${questionId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reportReason, message: reportMessage || undefined }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error);
      setReportOpen(false);
      setReportMessage("");
      setStatus("Thanks — your report has been sent to the moderators.");
    } catch {
      setStatus("Could not send the report. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium hover:bg-[var(--surface-muted)] disabled:opacity-60";

  return (
    <div className="mt-6 border-t border-[var(--border)] pt-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={buttonClass}
          aria-pressed={liked}
          disabled={busy}
          onClick={() => toggle("like")}
        >
          <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
          Like {likes > 0 ? `(${likes})` : ""}
        </button>

        <button
          type="button"
          className={buttonClass}
          aria-pressed={bookmarked}
          disabled={busy}
          onClick={() => toggle("bookmark")}
        >
          <span aria-hidden="true">{bookmarked ? "★" : "☆"}</span>
          Save {bookmarks > 0 ? `(${bookmarks})` : ""}
        </button>

        <button type="button" className={buttonClass} onClick={() => share("copy")}>
          <span aria-hidden="true">🔗</span> Copy link
        </button>

        <button type="button" className={buttonClass} onClick={() => share("whatsapp")}>
          WhatsApp
        </button>
        <button type="button" className={buttonClass} onClick={() => share("facebook")}>
          Facebook
        </button>
        <button type="button" className={buttonClass} onClick={() => share("x")}>
          X
        </button>
        <button type="button" className={buttonClass} onClick={() => share("linkedin")}>
          LinkedIn
        </button>

        {typeof navigator !== "undefined" && "share" in navigator ? (
          <button type="button" className={buttonClass} onClick={() => share("native")}>
            Share…
          </button>
        ) : null}

        <button
          type="button"
          className={buttonClass}
          onClick={() => setReportOpen((open) => !open)}
          aria-expanded={reportOpen}
        >
          <span aria-hidden="true">⚑</span> Report
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-[var(--text-muted)]">
        {status}
      </p>

      {reportOpen ? (
        <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <h2 className="text-sm font-semibold">Report this question</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="report-reason" className="mb-1 block text-sm">
                Reason
              </label>
              <select
                id="report-reason"
                value={reportReason}
                onChange={(event) => setReportReason(event.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              >
                <option value="WRONG_ANSWER">Wrong answer</option>
                <option value="TYPO">Typo or grammar</option>
                <option value="OUTDATED">Outdated information</option>
                <option value="INAPPROPRIATE">Inappropriate content</option>
                <option value="DUPLICATE">Duplicate question</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="report-message" className="mb-1 block text-sm">
                Details (optional)
              </label>
              <textarea
                id="report-message"
                rows={3}
                maxLength={1000}
                value={reportMessage}
                onChange={(event) => setReportMessage(event.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={submitReport}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
            >
              Send report
            </button>
            <button
              type="button"
              onClick={() => setReportOpen(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--surface-muted)]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
