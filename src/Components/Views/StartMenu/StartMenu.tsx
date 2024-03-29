import { Button, FormControl, FormLabel, Switch } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { twc } from 'react-twc';
import { createInitialPlayers } from '../../../Data/getInitialPlayers';
import { theme } from '../../../Data/theme';
import { useAnalytics } from '../../../Hooks/useAnalytics';
import { useGlobalSettings } from '../../../Hooks/useGlobalSettings';
import { usePlayers } from '../../../Hooks/usePlayers';
import { Cog, Info } from '../../../Icons/generated';
import {
  GameFormat,
  InitialGameSettings,
  Orientation,
  PreStartMode,
} from '../../../Types/Settings';
import { InfoModal } from '../../Misc/InfoModal';
import { SettingsModal } from '../../Misc/SettingsModal';
import { SupportMe } from '../../Misc/SupportMe';
import { LayoutOptions } from './LayoutOptions';

const MainWrapper = twc.div`w-[100dvw] h-fit pb-14 overflow-hidden items-center flex flex-col`;

const StartButtonFooter = twc.div`w-full max-w-[548px] fixed bottom-4 z-1 items-center flex flex-col px-4 z-10`;

const SliderWrapper = twc.div`mx-8`;

const ToggleButtonsWrapper = twc.div`flex flex-row justify-between items-center`;

const ToggleContainer = twc.div`flex flex-col items-center`;

const playerMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
];

const healthMarks = [
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 60,
    label: '60',
  },
];

const Start = () => {
  const { setPlayers } = usePlayers();
  const analytics = useAnalytics();
  const {
    fullscreen,
    wakeLock,
    setShowPlay,
    initialGameSettings,
    setInitialGameSettings,
    settings,
    isPWA,
    setRandomizingPlayer,
  } = useGlobalSettings();

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const [playerOptions, setPlayerOptions] = useState<InitialGameSettings>(
    initialGameSettings || {
      numberOfPlayers: 4,
      startingLifeTotal: 40,
      useCommanderDamage: true,
      orientation: Orientation.Portrait,
      gameFormat: GameFormat.Commander,
    }
  );

  const doStartGame = () => {
    if (!initialGameSettings) {
      return;
    }

    analytics.trackEvent('game_started', { ...initialGameSettings });

    try {
      if (settings.goFullscreenOnStart) {
        fullscreen.enableFullscreen();
      }
    } catch (error) {
      console.error(error);
    }

    if (settings.keepAwake && !wakeLock.active) {
      wakeLock.request();
    }

    setInitialGameSettings(initialGameSettings);
    setPlayers(createInitialPlayers(initialGameSettings));
    setShowPlay(true);
    setRandomizingPlayer(settings.preStartMode === PreStartMode.RandomKing);
    localStorage.setItem('playing', 'false');
    localStorage.setItem('showPlay', 'true');
  };

  useEffect(() => {
    setInitialGameSettings(playerOptions);
  }, [playerOptions, setInitialGameSettings]);

  const valuetext = (value: number) => {
    return `${value}`;
  };

  useEffect(() => {
    setPlayerOptions({
      ...playerOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOptions.numberOfPlayers]);

  return (
    <MainWrapper>
      <Info
        color={theme.palette.primary.light}
        size="2rem"
        style={{ position: 'absolute', top: '1rem', left: '1rem' }}
        onClick={() => {
          setOpenInfoModal(!openInfoModal);
        }}
      />

      <InfoModal
        closeModal={() => {
          setOpenInfoModal(false);
        }}
        isOpen={openInfoModal}
      />

      <SettingsModal
        closeModal={() => {
          setOpenSettingsModal(false);
        }}
        isOpen={openSettingsModal}
      />

      <SupportMe />

      <h1 className="text-3xl block font-bold mt-6 mb-5 text-text-primary">
        Life Trinket
      </h1>

      <div className="overflow-hidden items-center flex flex-col max-w-[548px] w-full mb-8 px-4">
        <FormControl focused={false} style={{ width: '100%' }}>
          <FormLabel>Number of Players</FormLabel>
          <SliderWrapper>
            <Slider
              title="Number of Players"
              max={6}
              min={1}
              aria-label="Custom marks"
              value={playerOptions?.numberOfPlayers ?? 4}
              getAriaValueText={valuetext}
              step={null}
              marks={playerMarks}
              onChange={(_e, value) => {
                setPlayerOptions({
                  ...playerOptions,
                  numberOfPlayers: value as number,
                  orientation: Orientation.Landscape,
                });
              }}
            />
          </SliderWrapper>

          <FormLabel className="mt-[0.7rem]">Starting Health</FormLabel>
          <SliderWrapper>
            <Slider
              title="Starting Health"
              max={60}
              min={20}
              aria-label="Custom marks"
              value={playerOptions?.startingLifeTotal ?? 40}
              getAriaValueText={valuetext}
              step={10}
              marks={healthMarks}
              onChange={(_e, value) =>
                setPlayerOptions({
                  ...playerOptions,
                  startingLifeTotal: value as number,
                  orientation: Orientation.Landscape,
                })
              }
            />
          </SliderWrapper>

          <ToggleButtonsWrapper className="mt-4">
            <ToggleContainer>
              <FormLabel>Commander</FormLabel>
              <Switch
                checked={
                  playerOptions.useCommanderDamage ??
                  initialGameSettings?.useCommanderDamage ??
                  true
                }
                onChange={(_e, value) => {
                  if (value) {
                    setPlayerOptions({
                      ...playerOptions,
                      useCommanderDamage: value,
                      numberOfPlayers: 4,
                      startingLifeTotal: 40,
                      orientation: Orientation.Landscape,
                    });
                    return;
                  }
                  setPlayerOptions({
                    ...playerOptions,
                    useCommanderDamage: value,
                    numberOfPlayers: 2,
                    startingLifeTotal: 20,
                    orientation: Orientation.Landscape,
                  });
                }}
              />
            </ToggleContainer>
            <Button
              variant="contained"
              style={{ height: '2rem' }}
              onClick={() => {
                setOpenSettingsModal(true);
              }}
            >
              <Cog /> &nbsp; Other settings
            </Button>
          </ToggleButtonsWrapper>

          <FormLabel>Layout</FormLabel>
          <LayoutOptions
            numberOfPlayers={playerOptions.numberOfPlayers}
            selectedOrientation={playerOptions.orientation}
            onChange={(orientation) => {
              setPlayerOptions({
                ...playerOptions,
                orientation,
              });
            }}
          />
        </FormControl>
        {!isPWA && (
          <p className="text-center text-xs text-text-primary w-11/12 mt-4">
            If you're on iOS, this page works better if you{' '}
            <strong>hide the toolbar</strong> or{' '}
            <strong>add the app to your home screen</strong>.
          </p>
        )}
      </div>

      <StartButtonFooter>
        <Button
          size="large"
          variant="contained"
          onClick={doStartGame}
          fullWidth
        >
          START GAME
        </Button>
      </StartButtonFooter>
    </MainWrapper>
  );
};

export default Start;
