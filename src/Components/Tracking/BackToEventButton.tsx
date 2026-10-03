import { twc } from 'react-twc';
import { eventHubUrl, readEventHub } from '../../Utils/tracking/eventHub';

// The same pill as the tracking chip beside it.
const Pill = twc.a`
  flex items-center gap-2 rounded-full
  bg-black/60 px-3 py-1 text-xs text-white
`;

/**
 * The way back to the event's hub in EventTrinket, where the player picks
 * the next pairing. It shows only while this device remembers an event, so
 * a player who never tracks never sees it.
 *
 * It reads storage on each render instead of from context. The menu renders
 * when it opens, and the value changes only when a new link loads the app.
 *
 * Same tab on purpose: the hub opens each game in a new tab, so a way back
 * that also opened one would leave a player with a pile of them.
 */
export const BackToEventButton = () => {
  const hub = readEventHub();

  if (!hub) {
    return null;
  }

  return <Pill href={eventHubUrl(hub.r)}>Back to event</Pill>;
};
