import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearKeys, keysToClearOnLoad } from './Utils/storageScope.ts';
import { readTrackEntry } from './Utils/tracking/trackLink.ts';
import { updateBeforeTrackedGame } from './Utils/tracking/updateBeforeTrack.ts';

window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

window.isIPad = /iPad/.test(navigator.userAgent);

const start = () => {
  // Which game this load is for, read once, here, before anything renders.
  // `readTrackEntry` only reads, so it is safe to call at startup, and the
  // answer is passed into App rather than computed again inside it.
  const trackEntry = readTrackEntry();

  // A new game is starting, so the previous game's keys go now -- before React
  // runs, not in an effect. Every provider and hook seeds its state from
  // localStorage during its own render, and effects run bottom-up afterwards,
  // so a clear from inside the tree always lands after something has already
  // read the stale value (the game timer, for one). Clearing during render
  // instead would be a side effect in a render pass, which StrictMode runs
  // twice; this is module startup, outside React entirely.
  clearKeys(keysToClearOnLoad(trackEntry));

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App trackEntry={trackEntry} />
    </React.StrictMode>
  );
};

// A game that EventTrinket opens must run on the newest version, so a load
// with a track link checks for one first, and reloads once if one takes
// over. This runs before `readTrackEntry` and `clearKeys`, so a reload
// starts the new version from the same state the first load found. Every
// other load starts at once, as before.
void updateBeforeTrackedGame().then((reloading) => {
  if (!reloading) {
    start();
  }
});
