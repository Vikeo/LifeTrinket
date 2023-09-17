type WakeLockType = 'screen';

export type WakeLock = {
  isSupported: boolean;
  request: (type?: WakeLockType) => Promise<void>;
  active: boolean;
  release: () => Promise<void>;
  type: 'screen' | undefined;
};
