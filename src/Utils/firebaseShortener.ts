import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { SharedGameState } from '../Types/SharedState';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ1AHMb5zmWS4VoRnC-OBxTswUfrJ0mlY',
  authDomain: 'life-trinket.firebaseapp.com',
  projectId: 'life-trinket',
  storageBucket: 'life-trinket.firebasestorage.app',
  messagingSenderId: '508011650619',
  appId: '1:508011650619:web:bdc7d0b6f8707b1f9e861e',
  measurementId: 'G-BE86QSSG14',
};

// Initialize Firebase app if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

/**
 * Generates a random short ID for the URL
 */
function generateShortId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Stores game state in Firestore and returns the short ID
 * Links expire after 30 minutes
 */
export async function createShortUrl(gameState: SharedGameState): Promise<string> {
  const shortId = generateShortId();

  try {
    const docRef = doc(db, 'sharedGames', shortId);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    await setDoc(docRef, {
      gameState,
      createdAt: serverTimestamp(),
      expiresAt, // TTL: Links expire after 30 minutes
    });

    return shortId;
  } catch (error) {
    console.error('Error creating short URL:', error);
    throw new Error('Failed to create short URL. Please try again.');
  }
}

/**
 * Retrieves game state from Firestore using short ID
 * Returns null if not found or expired
 */
export async function getSharedGame(shortId: string): Promise<SharedGameState | null> {
  try {
    const docRef = doc(db, 'sharedGames', shortId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error('Shared game not found:', shortId);
      return null;
    }

    const data = docSnap.data();

    // Check if link has expired (client-side validation)
    if (data.expiresAt) {
      const expiresAt = data.expiresAt.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
      if (expiresAt < new Date()) {
        console.error('Shared game link has expired:', shortId);
        return null;
      }
    }

    return data.gameState as SharedGameState;
  } catch (error) {
    console.error('Error retrieving shared game:', error);
    return null;
  }
}

/**
 * Generates a shortened share URL using Firestore
 */
export function generateShortShareUrl(shortId: string): string {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#s=${shortId}`;
}
