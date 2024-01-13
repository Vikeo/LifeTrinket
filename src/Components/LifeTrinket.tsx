import { twc } from 'react-twc';
import { useGlobalSettings } from '../Hooks/useGlobalSettings';
import { Play } from './Views/Play';
import StartMenu from './Views/StartMenu/StartMenu';

const StartWrapper = twc.div`max-w-fit max-h-fit`;

const PlayWrapper = twc.div`relative z-0 max-w-fit max-h-fit portrait:rotate-90`;

const EmergencyResetButton = () => {
  const { goToStart } = useGlobalSettings();

  const EmergencyResetButton = twc.button`w-[100dvmax] h-[100dvmin] absolute top-0 z-[-1] bg-background-default`;
  const Paragraph = twc.p`text-[4vmax] text-text-secondary`;

  return (
    <EmergencyResetButton onClick={goToStart}>
      <Paragraph>If you can see this, something is wrong.</Paragraph>
      <Paragraph>Press screen to go to start.</Paragraph>
      <br />
      <Paragraph>If the issue persists, please inform me.</Paragraph>
    </EmergencyResetButton>
  );
};

export const LifeTrinket = () => {
  const { showPlay, initialGameSettings } = useGlobalSettings();

  return (
    <>
      {showPlay && initialGameSettings ? (
        <PlayWrapper>
          <Play />
          <EmergencyResetButton />
        </PlayWrapper>
      ) : (
        <StartWrapper>
          <StartMenu />
        </StartWrapper>
      )}
    </>
  );
};
