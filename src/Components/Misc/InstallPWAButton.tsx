import { useEffect, useRef, useState } from 'react';
import { BeforeInstallPromptEvent } from '../../global';
import { useAnalytics } from '../../Hooks/useAnalytics';

export const InstallPWAButton = () => {
  const supportsPWARef = useRef<boolean>(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);

  const analytics = useAnalytics();

  const handler = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    supportsPWARef.current = true;
    setPromptInstall(e);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  if (!supportsPWARef.current) {
    return null;
  }

  return (
    <button
      className="mt-1 mb-1 bg-primary-main px-3 py-1 rounded-md duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark font-bold"
      aria-label="Install app"
      title="Install app"
      onClick={(e) => {
        e.preventDefault();
        if (!promptInstall) {
          return;
        }
        analytics.trackEvent('install_pwa_prompt_shown');
        promptInstall.prompt();
      }}
    >
      Install as a PWA
    </button>
  );
};
