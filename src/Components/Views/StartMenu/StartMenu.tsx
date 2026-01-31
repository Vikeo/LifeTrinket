import { useEffect, useRef, useState } from 'react';
import { twc } from 'react-twc';
import { createInitialPlayers } from '../../../Data/getInitialPlayers';
import { useAnalytics } from '../../../Hooks/useAnalytics';
import { useMetrics } from '../../../Hooks/useMetrics';
import { useUserActions } from '../../../Hooks/useUserActions';
import { useGlobalSettings } from '../../../Hooks/useGlobalSettings';
import { usePlayers } from '../../../Hooks/usePlayers';
import { Cog, Info, Trinket } from '../../../Icons/generated';
import {
  InitialGameSettings,
  Orientation,
  PreStartMode,
  defaultInitialGameSettings,
} from '../../../Types/Settings';

import { baseColors } from '../../../../tailwind.config';
import { InfoDialog } from '../../Dialogs/InfoDialog';
import { SettingsDialog } from '../../Dialogs/SettingsDialog';
import { ToggleButton } from '../../Misc/ToggleButton';
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

const MainWrapper = twc.div`h-fit w-full pb-24 overflow-hidden items-center flex flex-col min-[349px]:pb-10`;

const StartButtonFooter = twc.div`w-full max-w-[548px] fixed bottom-4 z-1 items-center flex flex-row flex-wrap px-4 z-10 gap-4`;

const SliderWrapper = twc.div`mx-8 relative`;

const ToggleButtonsWrapper = twc.div`flex flex-row justify-between items-center`;

export const LabelText = twc.div`text-md text-text-primary font-medium`;

let tracked = false;

const Start = () => {
  const { setPlayers } = usePlayers();
  const analytics = useAnalytics();
  const metrics = useMetrics();
  const userActions = useUserActions();
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
    setGameScore,
  } = useGlobalSettings();

  const infoDialogRef = useRef<HTMLDialogElement | null>(null);
  const settingsDialogRef = useRef<HTMLDialogElement | null>(null);
  const playersSliderRef = useRef<HTMLInputElement | null>(null);
  const healthSliderRef = useRef<HTMLInputElement | null>(null);

  const [playerOptions, setPlayerOptions] = useState<InitialGameSettings>(
    initialGameSettings || defaultInitialGameSettings
  );

  // Check for new version on mount
  useEffect(() => {
    if (!tracked) {
      version.checkForNewVersion('start_menu');

      tracked = true;
    }
  });

  useEffect(() => {
    if (!playersSliderRef.current) {
      return;
    }

    let progress = 0;

    switch (playerOptions?.numberOfPlayers) {
      case 1:
        progress = 0;
        break;
      case 2:
        progress = 20;
        break;
      case 3:
        progress = 40;
        break;
      case 4:
        progress = 60;
        break;
      case 5:
        progress = 80;
        break;
      case 6:
        progress = 100;
        break;
      default:
        break;
    }

    playersSliderRef.current.style.background = `linear-gradient(to right, ${baseColors.secondary.main} ${progress}%, ${baseColors.secondary.dark} ${progress}%)`;
  }, [playerOptions?.numberOfPlayers]);

  useEffect(() => {
    if (!healthSliderRef.current) {
      return;
    }

    let progress = 0;
    switch (playerOptions?.startingLifeTotal) {
      case 20:
        progress = 0;
        break;
      case 30:
        progress = 25;
        break;
      case 40:
        progress = 50;
        break;
      case 50:
        progress = 75;
        break;
      case 60:
        progress = 100;
        break;
      default:
        break;
    }

    healthSliderRef.current.style.background = `linear-gradient(to right, ${baseColors.secondary.main} ${progress}%, ${baseColors.secondary.dark} ${progress}%)`;
  }, [playerOptions?.startingLifeTotal]);

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

    metrics.trackGameStarted(initialGameSettings.numberOfPlayers);
    userActions.trackGameStartAction(
      initialGameSettings.numberOfPlayers,
      initialGameSettings.startingLifeTotal
    );

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
    tracked = false;
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

    metrics.trackEvent('game_resumed', {
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
    if (savedGame.gameScore) {
      setGameScore(savedGame.gameScore);
    }
    saveCurrentGame(null);
    setRandomizingPlayer(false);
    setShowPlay(true);
    setPlaying(true);
    tracked = false;
  };

  const openInfo = () => {
    if (infoDialogRef.current) {
      infoDialogRef.current.showModal();
    }
  };

  const openSettings = () => {
    if (settingsDialogRef.current) {
      settingsDialogRef.current.showModal();
      version.checkForNewVersion('settings');
    }
  };

  return (
    <>
      <InfoDialog dialogRef={infoDialogRef} />
      {settings.showAnimations && (
        <>
          <div className="spotlight1" />
          <div className="spotlight2" />
        </>
      )}

      <SettingsDialog dialogRef={settingsDialogRef} />
      <div className="flex justify-center items-center w-screen">
        <MainWrapper>
          <Info
            className="size-8 absolute top-7 left-4 text-primary-main"
            onClick={() => {
              openInfo();
            }}
          />
          <a href="https://lifetrinket.com/">
            <Trinket className="absolute w-12 h-12 top-4 right-4" />
          </a>

          <h1 className="relative flex flex-col text-3xl font-bold mt-6 mb-6 text-text-primary justify-center items-center">
            <div className="flex flex-row items-center">Life Trinket</div>
            <div className="h-[1px] w-[120%] bg-common-white opacity-50" />
            <div className="flex absolute text-xs font-medium -bottom-4">
              v{version.installedVersion}
            </div>
          </h1>

          <div className="overflow-hidden items-center flex flex-col max-w-[548px] w-full mb-8 px-4">
            <div className="w-full">
              <ToggleButtonsWrapper className="mt-4">
                <ToggleButton
                  label="Commander"
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
                />

                <div className="flex flex-nowrap text-nowrap relative justify-center items-start">
                  <button
                    className="flex justify-center self-center items-center mt-1 mb-1 bg-primary-main px-3 py-2 rounded-md transition-colors duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark"
                    onClick={openSettings}
                  >
                    <span className="text-sm flex flex-row items-center text-text-primary font-bold">
                      <Cog />
                      &nbsp;Game Settings
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
              <LabelText className="mt-4">Number of Players</LabelText>
              <SliderWrapper>
                <input
                  ref={playersSliderRef}
                  className="accent-primary-main text-primary-dark w-full h-3 rounded-lg cursor-pointer"
                  title="Number of Players"
                  type="range"
                  max={6}
                  min={1}
                  value={playerOptions?.numberOfPlayers ?? 4}
                  onChange={(e) => {
                    setPlayerOptions({
                      ...playerOptions,
                      numberOfPlayers: Number.parseInt(e.target.value),
                      orientation: Orientation.Landscape,
                    });
                  }}
                />
                <div className="flex w-full justify-between px-[6px] text-text-primary pointer-events-none">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                </div>
              </SliderWrapper>

              <LabelText className="mt-4">Starting Health</LabelText>
              <SliderWrapper>
                <input
                  ref={healthSliderRef}
                  className="accent-primary-main text-primary-dark w-full h-3 rounded-lg cursor-pointer"
                  title="Starting Health"
                  type="range"
                  max={60}
                  min={20}
                  aria-label="Custom marks"
                  value={playerOptions?.startingLifeTotal ?? 40}
                  step={10}
                  onChange={(e) =>
                    setPlayerOptions({
                      ...playerOptions,
                      startingLifeTotal: Number.parseInt(e.target.value),
                      orientation: Orientation.Landscape,
                    })
                  }
                />
                <div className="flex w-full justify-between text-text-primary pointer-events-none">
                  <div>20</div>
                  <div>30</div>
                  <div>40</div>
                  <div>50</div>
                  <div>60</div>
                </div>
              </SliderWrapper>

              <LabelText className="mt-4">Layout</LabelText>
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
            {!isPWA && window.isIOS && (
              <p className="text-center text-xs text-text-primary w-11/12 mt-4">
                If you're on iOS, this page works better if you{' '}
                <strong>hide the toolbar</strong> or{' '}
                <strong>add the app to your home screen</strong>.
              </p>
            )}
          </div>

          <StartButtonFooter>
            <button
              className="flex flex-grow basis-0 justify-center self-center items-center bg-primary-main px-3 py-2 rounded-md text-text-primary min-w-[150px] duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark font-bold"
              onClick={doStartNewGame}
            >
              NEW GAME
            </button>

            {savedGame && (
              <button
                className="flex flex-grow basis-0 justify-center self-center items-center bg-secondary-main px-3 py-2 rounded-md text-text-primary min-w-[150px]

              duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-secondary-dark font-bold"
                onClick={doResumeGame}
              >
                <div className="flex flex-col items-center">
                  <div>
                    RESUME&nbsp;
                    <span className="text-xs">
                      ({savedGame.players.length}&nbsp;
                      {savedGame.players.length > 1 ? 'players' : 'player'})
                    </span>
                  </div>
                  {savedGame.gameScore && Object.keys(savedGame.gameScore).length > 0 && (
                    <div className="text-xs opacity-75">
                      Score: {Object.entries(savedGame.gameScore)
                        .map(([playerIndex, score]) => {
                          const player = savedGame.players.find(
                            (p) => p.index === Number(playerIndex)
                          );
                          return `${player?.name || `P${Number(playerIndex) + 1}`}: ${score}`;
                        })
                        .join(' | ')}
                    </div>
                  )}
                </div>
              </button>
            )}
          </StartButtonFooter>
        </MainWrapper>
      </div>
    </>
  );
};

export default Start;
