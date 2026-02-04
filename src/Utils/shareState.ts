import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import {
  sharedGameStateSchema,
  type SharedGameState,
} from '../Types/SharedState';
import type { Player, LifeHistoryEvent } from '../Types/Player';
import type { InitialGameSettings } from '../Types/Settings';
import type { GameScore } from '../Contexts/GlobalSettingsContext';

/**
 * Encodes game state into a compressed, URL-safe string
 */
export function encodeGameState(
  players: Player[],
  initialGameSettings: InitialGameSettings,
  startingPlayerIndex: number,
  gameScore?: GameScore,
  lifeHistory?: LifeHistoryEvent[],
  version: string = import.meta.env.VITE_APP_VERSION || '1.0.0'
): string {
  const state: SharedGameState = {
    version,
    initialGameSettings,
    players,
    gameScore,
    lifeHistory,
    startingPlayerIndex,
    timestamp: Date.now(),
  };

  const json = JSON.stringify(state);
  const compressed = compressToEncodedURIComponent(json);

  return compressed;
}

/**
 * Decodes and validates a shared game state string
 * Returns the decoded state or throws an error
 */
export function decodeGameState(encoded: string): SharedGameState {
  try {
    const decompressed = decompressFromEncodedURIComponent(encoded);

    if (!decompressed) {
      throw new Error('Failed to decompress state data');
    }

    const parsed = JSON.parse(decompressed);
    const validated = sharedGameStateSchema.parse(parsed);

    return validated;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid shared game state: ${error.message}`);
    }
    throw new Error('Invalid shared game state: Unknown error');
  }
}

/**
 * Generates a shareable URL with the encoded game state
 */
export function generateShareUrl(
  players: Player[],
  initialGameSettings: InitialGameSettings,
  startingPlayerIndex: number,
  gameScore?: GameScore,
  lifeHistory?: LifeHistoryEvent[],
  version?: string
): string {
  const encoded = encodeGameState(
    players,
    initialGameSettings,
    startingPlayerIndex,
    gameScore,
    lifeHistory,
    version
  );

  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#game=${encoded}`;
}

/**
 * Extracts shared game state from the current URL hash
 * Returns null if no shared state is present
 * Supports both direct encoding (#game=) and shortened URLs (#s=)
 */
export async function getSharedStateFromUrl(): Promise<SharedGameState | null> {
  const hash = window.location.hash;

  if (!hash) {
    return null;
  }

  // Handle shortened URLs (#s=shortId)
  if (hash.startsWith('#s=')) {
    const shortId = hash.substring(3); // Remove '#s='
    try {
      const { getSharedGame } = await import('./firebaseShortener');
      const gameState = await getSharedGame(shortId);
      if (!gameState) {
        console.error('Shared game not found for short ID:', shortId);
      }
      return gameState;
    } catch (error) {
      console.error('Failed to retrieve shared game from short URL:', error);
      return null;
    }
  }

  // Handle direct encoding (#game=encodedData)
  if (hash.startsWith('#game=')) {
    const encoded = hash.substring(6); // Remove '#game='
    try {
      return decodeGameState(encoded);
    } catch (error) {
      console.error('Failed to decode shared game state from URL:', error);
      return null;
    }
  }

  return null;
}

/**
 * Clears the shared state from the URL hash
 */
export function clearSharedStateFromUrl(): void {
  if (window.location.hash.startsWith('#game=')) {
    // Remove the hash without triggering a navigation
    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    );
  }
}

/**
 * Estimates the size of the encoded state in bytes
 * Useful for warning users if QR code might be too large
 */
export function estimateEncodedSize(
  players: Player[],
  initialGameSettings: InitialGameSettings,
  startingPlayerIndex: number,
  gameScore?: GameScore,
  lifeHistory?: LifeHistoryEvent[],
  version?: string
): number {
  const encoded = encodeGameState(
    players,
    initialGameSettings,
    startingPlayerIndex,
    gameScore,
    lifeHistory,
    version
  );

  // Approximate byte size (each character is roughly 1 byte in ASCII)
  // Add URL prefix overhead
  return encoded.length + 6; // +6 for '#game='
}
