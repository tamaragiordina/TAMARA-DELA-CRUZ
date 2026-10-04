/**
 * Robust YouTube video ID extractor supporting all common formats
 */
export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const clean = input.trim();

  // Direct 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }

  // Common URLs: youtube.com/watch?v=..., youtu.be/..., embed/..., shorts/...
  const patterns = [
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
  ];

  for (const regex of patterns) {
    const match = clean.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
