import { useWakeLock } from 'react-screen-wake-lock';

const { isSupported, release, released, request, type } = useWakeLock();

if (released === undefined) {
  const isActive = false;
} else {
  const isActive = !released;
}

const wakeLock = {
  isSupported,
  release,
  active: isActive,
  request,
  type,
};
