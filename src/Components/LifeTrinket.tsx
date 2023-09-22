import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InitialSettings } from '../Data/getInitialPlayers';
import Play from './Views/Play';
import StartMenu from './Views/StartMenu/StartMenu';
import { useGlobalSettings } from '../Hooks/useGlobalSettings';

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
  const savedGameSettings = localStorage.getItem('initialGameSettings');

  const { showPlay, goToStart } = useGlobalSettings();

  const [initialGameSettings, setInitialGameSettings] =
    useState<InitialSettings | null>(
      savedGameSettings ? JSON.parse(savedGameSettings) : null
    );

  useEffect(() => {
    localStorage.setItem(
      'initialGameSettings',
      JSON.stringify(initialGameSettings)
    );
  }, [initialGameSettings]);

  return (
    <>
      {showPlay && initialGameSettings ? (
        <PlayWrapper>
          <Play gridAreas={initialGameSettings?.gridAreas} />
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
          />
        </StartWrapper>
      )}
    </>
  );
};
