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
    // Gather all localStorage data
    const gameState: GameStateExport = {
      settings: localStorage.getItem('settings'),
      initialGameSettings: localStorage.getItem('initialGameSettings'),
      players: localStorage.getItem('players'),
      playing: localStorage.getItem('playing'),
      showPlay: localStorage.getItem('showPlay'),
      preStartComplete: localStorage.getItem('preStartComplete'),
      savedGame: localStorage.getItem('savedGame'),
      startingPlayerIndex: localStorage.getItem('startingPlayerIndex'),
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(gameState);

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
    const gameState: GameStateExport = JSON.parse(decompressed);

    // Validate that we have some data
    if (!gameState || typeof gameState !== 'object') {
      throw new Error('Invalid game state format');
    }

    // Load into localStorage
    Object.entries(gameState).forEach(([key, value]) => {
      if (value !== null) {
        localStorage.setItem(key, value);
      }
    });

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
