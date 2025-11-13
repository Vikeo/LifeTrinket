import pako from 'pako';

export interface GameStateExport {
  settings: string | null;
  initialGameSettings: string | null;
  players: string | null;
  playing: string | null;
  showPlay: string | null;
  preStartComplete: string | null;
  savedGame: string | null;
  startingPlayerIndex: string | null;
}

/**
 * Export all game state from localStorage, compress it, and encode for URL
 */
export function exportGameState(): string {
  try {
    // Only export essential data with very short keys
    const compactState: Record<string, string> = {};

    const s = localStorage.getItem('settings');
    const i = localStorage.getItem('initialGameSettings');
    const p = localStorage.getItem('players');
    const si = localStorage.getItem('startingPlayerIndex');

    // Only include non-null values
    if (s) compactState.s = s;
    if (i) compactState.i = i;
    if (p) compactState.p = p;
    if (si) compactState.si = si;

    // Convert to JSON string
    const jsonString = JSON.stringify(compactState);

    // Compress using pako (gzip)
    const compressed = pako.deflate(jsonString);

    // Convert to base64 for URL safety
    const base64 = btoa(String.fromCharCode(...compressed));

    // Make URL-safe by replacing characters
    const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    return urlSafe;
  } catch (error) {
    console.error('Error exporting game state:', error);
    throw new Error('Failed to export game state');
  }
}

/**
 * Import game state from compressed URL parameter and load into localStorage
 */
export function importGameState(encodedData: string): boolean {
  try {
    // Restore base64 characters
    let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }

    // Decode from base64
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Decompress
    const decompressed = pako.inflate(bytes, { to: 'string' });

    // Parse JSON
    const compactState: Record<string, string> = JSON.parse(decompressed);

    // Validate that we have some data
    if (!compactState || typeof compactState !== 'object') {
      throw new Error('Invalid game state format');
    }

    // Map short keys back to full localStorage keys and load
    if (compactState.s) localStorage.setItem('settings', compactState.s);
    if (compactState.i) localStorage.setItem('initialGameSettings', compactState.i);
    if (compactState.p) localStorage.setItem('players', compactState.p);
    if (compactState.si) localStorage.setItem('startingPlayerIndex', compactState.si);

    // Always set playing and showPlay to false after loading
    // This ensures the user starts at the main menu and can review the state
    localStorage.setItem('playing', 'false');
    localStorage.setItem('showPlay', 'false');

    return true;
  } catch (error) {
    console.error('Error importing game state:', error);
    return false;
  }
}

/**
 * Generate shareable URL with game state
 */
export function generateShareableUrl(): string {
  const encodedState = exportGameState();
  const currentUrl = window.location.origin + window.location.pathname;
  return `${currentUrl}?gameStateToLoad=${encodedState}`;
}
