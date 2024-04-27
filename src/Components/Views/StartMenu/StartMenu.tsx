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
  InitialGameSettings,
  Orientation,
  PreStartMode,
  defaultInitialGameSettings,
} from '../../../Types/Settings';
import { InfoModal } from '../../Misc/InfoModal';
import { SettingsModal } from '../../Misc/SettingsModal';
import { SupportMe } from '../../Misc/SupportMe';
import { LayoutOptions } from './LayoutOptions';

const commanderSettings: Pick<
  InitialGameSettings,
  'numberOfPlayers' | 'startingLifeTotal' | 'orientation'
> = {
  numberOfPlayers: 4,
  startingLifeTotal: 40,
  orientation: Orientation.Landscape,
};

const standardSettings: Pick<
  InitialGameSettings,
  'numberOfPlayers' | 'startingLifeTotal' | 'orientation'
> = {
  numberOfPlayers: 2,
  startingLifeTotal: 20,
  orientation: Orientation.Landscape,
};

const MainWrapper = twc.div`w-[100dvw] h-fit pb-24 overflow-hidden items-center flex flex-col min-[349px]:pb-10`;

const StartButtonFooter = twc.div`w-full max-w-[548px] fixed bottom-4 z-1 items-center flex flex-row flex-wrap px-4 z-10 gap-4`;

const SliderWrapper = twc.div`mx-8 relative`;

const ToggleButtonsWrapper = twc.div`flex flex-row justify-between items-center`;

const ToggleContainer = twc.div`flex flex-col items-center`;

const LabelText = twc.div`text-md text-text-primary font-medium`;

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
    version,
    setPlaying,
    savedGame,
    saveCurrentGame,
  } = useGlobalSettings();

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const [playerOptions, setPlayerOptions] = useState<InitialGameSettings>(
    initialGameSettings || defaultInitialGameSettings
  );

  let tracked = false;
  // Check for new version on mount
  useEffect(() => {
    if (!tracked) {
      console.log('checking version');
      version.checkForNewVersion('start_menu');

      // eslint-disable-next-line react-hooks/exhaustive-deps
      tracked = true;
    }
  }, []);

  useEffect(() => {
    setInitialGameSettings(playerOptions);
  }, [playerOptions, setInitialGameSettings]);

  useEffect(() => {
    setPlayerOptions({
      ...playerOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOptions.numberOfPlayers]);

  const doStartNewGame = () => {
    if (!initialGameSettings) {
      return;
    }

    analytics.trackEvent('game_started', {
      ...initialGameSettings,
      ...settings,
      isPWA,
    });

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
    setRandomizingPlayer(settings.preStartMode === PreStartMode.RandomKing);
    setShowPlay(true);
    setPlaying(false);
  };

  const doResumeGame = () => {
    if (!savedGame) {
      return;
    }

    analytics.trackEvent('game_resumed', {
      ...initialGameSettings,
      ...settings,
      isPWA,
    });

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

    setInitialGameSettings(savedGame.initialGameSettings);
    setPlayers(savedGame.players);
    saveCurrentGame(null);
    setRandomizingPlayer(false);
    setShowPlay(true);
    setPlaying(true);
  };

  const valueText = (value: number) => {
    return `${value}`;
  };

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

      <h1 className="relative flex flex-col text-3xl font-bold mt-6 mb-6 text-text-primary justify-center items-center">
        Life Trinket
        <div className="h-[1px] w-[120%] bg-common-white opacity-50" />
        <div className="flex absolute text-xs font-medium -bottom-4">
          v{version.installedVersion}
        </div>
      </h1>

      <div className="overflow-hidden items-center flex flex-col max-w-[548px] w-full mb-8 px-4">
        <div className="w-full">
          <ToggleButtonsWrapper className="mt-4">
            <ToggleContainer>
              <LabelText>Commander</LabelText>

              <label className="inline-flex items-center cursor-pointer relative h-6 w-10">
                <input
                  type="checkbox"
                  value=""
                  checked={
                    playerOptions.useCommanderDamage ??
                    initialGameSettings?.useCommanderDamage ??
                    true
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPlayerOptions({
                        ...playerOptions,
                        useCommanderDamage: e.target.checked,
                        ...commanderSettings,
                      });
                      return;
                    }
                    setPlayerOptions({
                      ...playerOptions,
                      useCommanderDamage: e.target.checked,
                      ...standardSettings,
                    });
                  }}
                  className="sr-only peer"
                />
                <div className="relative mx-1 w-10 h-[0.875rem] bg-gray-900 rounded-full peer peer-checked:bg-primary-dark" />
                <div className="absolute peer-checked:translate-x-full rtl:peer-checked:-translate-x-full bg-secondary-main peer-checked:bg-primary-main rounded-full h-5 w-5 transition-all" />
              </label>
            </ToggleContainer>
            <div className="flex flex-nowrap text-nowrap relative justify-center items-start">
              <button
                className="flex justify-center self-center items-center mt-1 mb-1 bg-primary-main px-3 py-2 rounded-md"
                onClick={() => {
                  setOpenSettingsModal(true);
                }}
              >
                <span className="text-sm flex flex-row items-center text-text-primary">
                  <Cog />
                  &nbsp; Game Settings
                </span>
              </button>

              <div
                data-not-latest-version={
                  !version.isLatest && !!version.remoteVersion
                }
                className="absolute flex justify-center text-text-primary text-xxs -bottom-5 bg-primary-dark px-2 rounded-md
                opacity-0 transition-all duration-200 delay-500
                data-[not-latest-version=true]:opacity-100
                "
              >
                <div className="absolute bg-primary-dark rotate-45 size-2 -top-[2px] z-0" />
                <span className="z-10">
                  v{version.remoteVersion} available!
                </span>
              </div>
            </div>
          </ToggleButtonsWrapper>
          <LabelText>Number of Players</LabelText>
          <SliderWrapper>
            <Slider
              title="Number of Players"
              max={6}
              min={1}
              aria-label="Custom marks"
              value={playerOptions?.numberOfPlayers ?? 4}
              getAriaValueText={valueText}
              step={null}
              marks={playerMarks}
              onChange={(_e, value) => {
                console.log('haha');
                setPlayerOptions({
                  ...playerOptions,
                  numberOfPlayers: value as number,
                  orientation: Orientation.Landscape,
                });
              }}
            />
          </SliderWrapper>

          <LabelText className="mt-[0.7rem]">Starting Health</LabelText>
          <SliderWrapper>
            <Slider
              title="Starting Health"
              max={60}
              min={20}
              aria-label="Custom marks"
              value={playerOptions?.startingLifeTotal ?? 40}
              getAriaValueText={valueText}
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

          <LabelText>Layout</LabelText>
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
        </div>
        {!isPWA && (
          <p className="text-center text-xs text-text-primary w-11/12 mt-4">
            If you're on iOS, this page works better if you{' '}
            <strong>hide the toolbar</strong> or{' '}
            <strong>add the app to your home screen</strong>.
          </p>
        )}
      </div>

      <StartButtonFooter>
        <button
          className="flex flex-grow basis-0 justify-center self-center items-center bg-primary-main px-3 py-2 rounded-md text-text-primary min-w-[150px]"
          onClick={doStartNewGame}
        >
          NEW GAME
        </button>

        {savedGame && (
          <button
            className="flex flex-grow basis-0 justify-center self-center items-center bg-primary-dark px-3 py-2 rounded-md text-text-primary min-w-[150px]"
            onClick={doResumeGame}
          >
            RESUME&nbsp;
            <span className="text-xs">
              ({savedGame.players.length}&nbsp;
              {savedGame.players.length > 1 ? 'players' : 'player'})
            </span>
          </button>
        )}
      </StartButtonFooter>
    </MainWrapper>
  );
};

export default Start;
