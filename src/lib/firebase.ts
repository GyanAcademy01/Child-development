import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDMuwCtFmCnPYh-vTcbBR5QbJBmRLwwmY0",
  authDomain: "gyan-academy-11b06.firebaseapp.com",
  projectId: "gyan-academy-11b06",
  storageBucket: "gyan-academy-11b06.firebasestorage.app",
  messagingSenderId: "900610477348",
  appId: "1:900610477348:web:d5f028b19f94c02eb8f7b1",
  measurementId: "G-0LZSSJNLHG"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let analyticsInstance: Analytics | null = null;

export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;

  try {
    const supported = await isSupported();
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  } catch (error) {
    console.error('Firebase Analytics initialization error:', error);
  }
  return analyticsInstance;
}

export async function trackEvent(eventName: string, params?: Record<string, any>) {
  const analytics = await getAnalyticsInstance();
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

export { app };
