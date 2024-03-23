import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ1AHMb5zmWS4VoRnC-OBxTswUfrJ0mlY',
  authDomain: 'life-trinket.firebaseapp.com',
  projectId: 'life-trinket',
  storageBucket: 'life-trinket.appspot.com',
  messagingSenderId: '508011650619',
  appId: '1:508011650619:web:bdc7d0b6f8707b1f9e861e',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useAnalytics = () => {
  if (process.env.NODE_ENV === 'development') {
    // Code to run in local development environment
    console.log('Running in development mode');
  } else {
    // Code to run in production environment
    console.log('Running in production mode');
  }
  const trackEvent = (
    eventName: string,
    eventParams?: { [key: string]: unknown }
  ) => {
    logEvent(analytics, eventName, eventParams);
  };

  return { trackEvent };
};
