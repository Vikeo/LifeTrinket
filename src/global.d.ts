export {};

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    isIOS: boolean;
    isIPad: boolean;
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    transitionend: BeforeInstallPromptEvent;
  }
}
