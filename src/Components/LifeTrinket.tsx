import { useState, useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';
import styled from 'styled-components';
import { InitialSettings } from '../Data/getInitialPlayers';
import { useAnalytics } from '../Hooks/useAnalytics';
import Play from './Views/Play';
import StartMenu from './Views/StartMenu/StartMenu';

const StartWrapper = styled.div`
  max-width: fit-content;
  max-height: fit-content;
`;

const PlayWrapper = styled.div`
  position: relative;
  z-index: 0;
  max-width: fit-content;
  max-height: fit-content;
  @media (orientation: portrait) {
    rotate: 90deg;
  }
`;

const EmergencyResetButton = styled.button`
  width: 100vmax;
  height: 100vmin;
  font-size: 4vmax;
  position: absolute;
  top: 0;
  z-index: -1;
  background-color: #4e6815;
`;

export const LifeTrinket = () => {
  const analytics = useAnalytics();
  const savedGameSettings = localStorage.getItem('initialGameSettings');
  const savedShowPlay = localStorage.getItem('showPlay');

  const { isSupported, release, released, request, type } = useWakeLock();
  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialSettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );
  const [showPlay, setShowPlay] = useState<boolean>(
    savedShowPlay ? savedShowPlay === 'true' : false
  );

  const isActive = released === undefined ? false : !released;

  const wakeLock = {
    isSupported,
    release,
    active: isActive,
    request,
    type,
  };

  useEffect(() => {
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings]);

  const removeLocalStorage = async () => {
    localStorage.removeItem('initialGameSettings');
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('showPlay');
    setShowPlay(localStorage.getItem('showPlay') === 'true' ?? false);
  };

  const goToStart = async () => {
    // this function is broken for the moment, need to set players object
    const currentPlayers = localStorage.getItem('players');
    if (currentPlayers) {
      analytics.trackEvent('go_to_start', {
        playersBeforeReset: currentPlayers,
      });
    }
    await removeLocalStorage();

    // setPlayers([]);
  };

  return (
    <>
      {showPlay && initialGameSettings ? (
        <PlayWrapper>
          <Play
            gridAreas={initialGameSettings?.gridAreas}
            goToStart={goToStart}
            wakeLock={wakeLock}
          />
          <EmergencyResetButton onClick={goToStart}>
            <p>If you can see this, something is wrong.</p>
            <p>Press screen to go to start.</p>
            <br />
            <p>If the issue persists, please inform me.</p>
          </EmergencyResetButton>
        </PlayWrapper>
      ) : (
        <StartWrapper>
          <StartMenu
            initialGameSettings={initialGameSettings}
            setInitialGameSettings={setInitialGameSettings}
            wakeLock={wakeLock}
            setShowPlay={setShowPlay}
          />
        </StartWrapper>
      )}
    </>
  );
};
