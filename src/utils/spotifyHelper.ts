/**
 * Robust Spotify Podcast URL/ID parser
 * Supports:
 * - https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk
 * - https://open.spotify.com/show/3Rpx...
 * - spotify:episode:...
 * - Direct 22-character base62 IDs
 */
export interface SpotifyEmbedInfo {
  type: 'episode' | 'show';
  id: string;
}

export function parseSpotifyLink(input: string): SpotifyEmbedInfo | null {
  if (!input) return null;
  const clean = input.trim();

  // URL matching: open.spotify.com/(episode|show)/([a-zA-Z0-9]{22})
  const urlMatch = clean.match(/open\.spotify\.com\/(episode|show)\/([a-zA-Z0-9]+)/);
  if (urlMatch) {
    return {
      type: urlMatch[1] as 'episode' | 'show',
      id: urlMatch[2],
    };
  }

  // URI matching: spotify:(episode|show):([a-zA-Z0-9]+)
  const uriMatch = clean.match(/spotify:(episode|show):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    return {
      type: uriMatch[1] as 'episode' | 'show',
      id: uriMatch[2],
    };
  }

  // Direct 22-character Spotify ID
  if (/^[a-zA-Z0-9]{22}$/.test(clean)) {
    return {
      type: 'episode',
      id: clean,
    };
  }

  return null;
}
