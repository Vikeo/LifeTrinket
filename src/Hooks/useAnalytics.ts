import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ1AHMb5zmWS4VoRnC-OBxTswUfrJ0mlY',
  authDomain: 'life-trinket.firebaseapp.com',
  projectId: 'life-trinket',
  storageBucket: 'life-trinket.firebasestorage.app',
  messagingSenderId: '508011650619',
  appId: '1:508011650619:web:bdc7d0b6f8707b1f9e861e',
  measurementId: 'G-BE86QSSG14',
};

const app = initializeApp(firebaseConfig);
let analytics: Analytics | null = null;

const getAnalyticsInstance = () => {
  if (!analytics) {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.error('Failed to initialize Firebase Analytics:', error);
      return null;
    }
  }
  return analytics;
};

export const useAnalytics = () => {
  const trackEvent = (
    eventName: string,
    eventParams?: { [key: string]: unknown }
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('Event not tracked:', { eventName, eventParams });
      return;
    }

    const analyticsInstance = getAnalyticsInstance();
    if (!analyticsInstance) {
      console.warn('Analytics not available');
      return;
    }

    const paramsWithVersion = {
      ...eventParams,
      app_version: import.meta.env.VITE_APP_VERSION,
    };

    logEvent(analyticsInstance, eventName, paramsWithVersion);
  };

  return { trackEvent };
};
