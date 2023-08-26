import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_ANALYTICS_API_KEY,
  authDomain: 'life-trinket.firebaseapp.com',
  projectId: 'life-trinket',
  storageBucket: 'life-trinket.appspot.com',
  messagingSenderId: '508011650619',
  appId: '1:508011650619:web:bdc7d0b6f8707b1f9e861e',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useAnalytics = () => {
  const trackEvent = (
    eventName: string,
    eventParams?: { [key: string]: unknown }
  ) => {
    logEvent(analytics, eventName, eventParams);
  };

  return { trackEvent };
};
