import { useRef } from 'react';
import { twc } from 'react-twc';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { useSafeRotate } from '../../Hooks/useSafeRotate';
import {
  Close,
  Energy,
  Exit,
  Experience,
  FullscreenOff,
  FullscreenOn,
  Monarch,
  NameTag,
  PartnerTax,
  Poison,
  ResetGame,
  Skull,
} from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import { PreStartMode } from '../../Types/Settings';
import { RotationDivProps } from '../Buttons/CommanderDamage';
import { IconCheckbox } from '../Misc/IconCheckbox';
import { checkContrast } from '../../Utils/checkContrast';

const PlayerMenuWrapper = twc.div`
  flex
  flex-col
  absolute
  size-full
  bg-background-settings
  backdrop-blur-[3px]
  items-center
  justify-center
  z-[2]
  webkit-user-select-none
  transition-all
`;

const BetterRowContainer = twc.div`
  flex
  flex-col
  flex-grow
  w-full
  h-full
  justify-between
  items-stretch
`;

const TogglesSection = twc.div`
  flex
  flex-row
  flex-wrap
  relative
  h-full
  justify-evenly
  items-center
`;

const ButtonsSections = twc.div`
  flex
  max-w-full
  justify-evenly
  items-center
  flex-wrap
  h-full
  mt-0
  px-2
`;

const ColorPickerButton = twc.div`
  h-[8vmax]
  w-[8vmax]
  relative
  max-h-12
  max-w-12
  rounded-full
  cursor-pointer
  overflow-hidden
`;

const SettingsContainer = twc.div<RotationDivProps>((props) => [
  'flex flex-wrap h-full w-full overflow-y-scroll',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col'
    : 'flex-row',
]);

type PlayerMenuProps = {
  player: Player;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
  isShown: boolean;
  onForfeit?: () => void;
};

const PlayerMenu = ({
  player,
  setShowPlayerMenu,
  isShown,
  onForfeit,
}: PlayerMenuProps) => {
  const settingsContainerRef = useRef<HTMLDivElement | null>(null);
  const resetGameDialogRef = useRef<HTMLDialogElement | null>(null);
  const endGameDialogRef = useRef<HTMLDialogElement | null>(null);

  const { isSide } = useSafeRotate({
    rotation: player.settings.rotation,
    containerRef: settingsContainerRef,
  });

  const {
    fullscreen,
    wakeLock,
    goToStart,
    settings,
    setSettings,
    setPlaying,
    setRandomizingPlayer,
    saveCurrentGame,
    initialGameSettings,
    setPreStartCompleted,
  } = useGlobalSettings();

  const analytics = useAnalytics();

  const { updatePlayer, resetCurrentGame, players } = usePlayers();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const iconTheme =
      checkContrast(event.target.value, '#00000080') === 'Fail'
        ? 'light'
        : 'dark';

    updatePlayer({
      ...player,
      color: event.target.value,
      iconTheme,
    });
  };

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...player.settings, [name]: checked };
    const updatedPlayer = { ...player, settings: updatedSettings };

    updatePlayer(updatedPlayer);
  };

  const handleResetGame = () => {
    resetCurrentGame();
    setShowPlayerMenu(false);

    setPlaying(false);

    if (settings.preStartMode === PreStartMode.RandomKing) {
      setRandomizingPlayer(true);
      setPreStartCompleted(false);
    }

    analytics.trackEvent('reset_game');
  };

  const handleGoToStart = () => {
    saveCurrentGame({ players, initialGameSettings });
    goToStart();
    setRandomizingPlayer(true);
  };

  const handleUpdatePlayerName = () => {
    const newName = prompt('Enter your name', player.name);

    const updatedPlayer: Player = { ...player, name: '' };
    if (!newName) {
      updatePlayer(updatedPlayer);
      return;
    }
    updatedPlayer.name = newName;
    updatePlayer(updatedPlayer);
  };

  const toggleFullscreen = () => {
    if (fullscreen.isFullscreen) {
      fullscreen.disableFullscreen();
    } else {
      fullscreen.enableFullscreen();
    }
  };

  const buttonFontSize = isSide ? '1.5vmax' : '3vmin';
  const iconSize = isSide ? '6vmin' : '3vmax';
  const extraCountersSize = isSide ? '8vmin' : '4vmax';

  const calcRotation =
    player.settings.rotation === Rotation.Side
      ? `${player.settings.rotation - 180}deg`
      : player.settings.rotation === Rotation.SideFlipped
      ? `${player.settings.rotation - 180}deg`
      : '';

  return (
    <PlayerMenuWrapper
      //TODO: Fix hacky solution to rotation for SideFlipped
      style={{
        rotate:
          player.settings.rotation === Rotation.SideFlipped ? `180deg` : '',
        translate: isShown ? '' : player.isSide ? `-100%` : `0 -100%`,
      }}
    >
      <SettingsContainer
        $rotation={player.settings.rotation}
        style={{
          rotate: calcRotation,
        }}
        ref={settingsContainerRef}
      >
        <button
          onClick={() => {
            analytics.trackEvent('close_player_menu_button');
            setShowPlayerMenu(false);
          }}
          className="flex absolute top-2 right-2 z-10"
        >
          <Close size={iconSize} className="text-primary-main" />
        </button>

        <BetterRowContainer>
          <TogglesSection>
            <ColorPickerButton aria-label="Color picker">
              <input
                onChange={handleColorChange}
                type="color"
                className="size-[200%] absolute -left-2 -top-2"
                value={player.color}
                onClick={() => {
                  analytics.trackEvent('color_picker_opened', {
                    player: player.index,
                  });
                }}
              />
            </ColorPickerButton>
            {player.settings.useCommanderDamage && (
              <div className="flex flex-col items-center">
                <IconCheckbox
                  name="usePartner"
                  checked={player.settings.usePartner}
                  icon={
                    <PartnerTax
                      size={extraCountersSize}
                      color="black"
                      stroke="white"
                      strokeWidth="1"
                    />
                  }
                  checkedIcon={
                    <PartnerTax
                      size={extraCountersSize}
                      color={player.color}
                      stroke="white"
                      strokeWidth="1"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  }
                  onChange={(e) => {
                    analytics.trackEvent('toggle_partner', {
                      checked: e.target.checked,
                    });
                    handleSettingsChange(e);
                  }}
                  aria-checked={player.settings.usePartner}
                  aria-label="Partner"
                />
              </div>
            )}
            <div>
              <IconCheckbox
                name="usePoison"
                checked={player.settings.usePoison}
                icon={
                  <Poison
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth="2"
                  />
                }
                checkedIcon={
                  <Poison
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                }
                onChange={(e) => {
                  analytics.trackEvent('toggle_poison', {
                    checked: e.target.checked,
                  });
                  handleSettingsChange(e);
                }}
                aria-checked={player.settings.usePoison}
                aria-label="Poison"
              />
            </div>
            <div>
              <IconCheckbox
                name="useEnergy"
                checked={player.settings.useEnergy}
                icon={
                  <Energy
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth={2.2}
                  />
                }
                checkedIcon={
                  <Energy
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth={2.2}
                  />
                }
                onChange={(e) => {
                  analytics.trackEvent('toggle_energy', {
                    checked: e.target.checked,
                  });
                  handleSettingsChange(e);
                }}
                aria-checked={player.settings.useEnergy}
                aria-label="Energy"
              />
            </div>
            <div>
              <IconCheckbox
                name="useExperience"
                checked={player.settings.useExperience}
                icon={
                  <Experience
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth={2.5}
                  />
                }
                checkedIcon={
                  <Experience
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth={2.5}
                  />
                }
                onChange={(e) => {
                  analytics.trackEvent('toggle_experience', {
                    checked: e.target.checked,
                  });
                  handleSettingsChange(e);
                }}
                aria-checked={player.settings.useExperience}
                aria-label="Experience"
              />
            </div>
            <div>
              <IconCheckbox
                name="useMonarch"
                checked={settings.useMonarch}
                icon={
                  <Monarch
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth={2.5}
                  />
                }
                checkedIcon={
                  <Monarch
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth={2.5}
                  />
                }
                onChange={(e) => {
                  analytics.trackEvent('toggle_monarch', {
                    checked: e.target.checked,
                  });
                  setSettings({ ...settings, useMonarch: e.target.checked });
                }}
                aria-checked={settings.useMonarch}
                aria-label="Monarch"
              />
            </div>
          </TogglesSection>
          <ButtonsSections>
            <button
              className="text-primary-main cursor-pointer webkit-user-select-none"
              onClick={() => endGameDialogRef.current?.show()}
              aria-label="Back to start"
            >
              <Exit size={iconSize} style={{ rotate: '180deg' }} />
            </button>
            {(!window.isIOS || window.isIPad) && (
              <div
                data-fullscreen={document.fullscreenElement ? true : false}
                className="flex
                data-[fullscreen=true]:bg-secondary-dark rounded-lg border border-transparent
              data-[fullscreen=true]:border-primary-main"
              >
                <IconCheckbox
                  className="p-1"
                  name="fullscreen"
                  checked={document.fullscreenElement ? true : false}
                  icon={
                    <FullscreenOff
                      size={iconSize}
                      className="text-primary-main"
                    />
                  }
                  checkedIcon={
                    <FullscreenOn
                      size={iconSize}
                      className="text-primary-main"
                    />
                  }
                  onChange={toggleFullscreen}
                  aria-checked={document.fullscreenElement ? true : false}
                  aria-label="Fullscreen"
                />
              </div>
            )}

            <button
              data-wake-lock-active={settings.keepAwake}
              style={{
                fontSize: buttonFontSize,
              }}
              className="text-primary-main px-1 webkit-user-select-none cursor-pointer 
              data-[wake-lock-active=true]:bg-secondary-dark rounded-lg border border-transparent
              data-[wake-lock-active=true]:border-primary-main
              "
              onClick={() => {
                wakeLock.toggleWakeLock();
              }}
              role="checkbox"
              aria-checked={settings.keepAwake}
              aria-label="Keep awake"
            >
              Keep Awake
            </button>

            <button
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: buttonFontSize,
                padding: '2px',
              }}
              className="text-primary-main"
              onClick={handleUpdatePlayerName}
              role="name_tag"
              aria-label="Name Tag"
            >
              <NameTag size={iconSize} />
            </button>

            <button
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: buttonFontSize,
                padding: '2px',
              }}
              className="text-primary-main"
              onClick={() => resetGameDialogRef.current?.show()}
              role="checkbox"
              aria-label="Reset Game"
            >
              <ResetGame size={iconSize} />
            </button>

            {onForfeit && (
              <button
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: buttonFontSize,
                  padding: '2px',
                }}
                className="text-red-500"
                onClick={() => {
                  analytics.trackEvent('forfeit_game', {
                    player: player.index,
                  });
                  onForfeit();
                  setShowPlayerMenu(false);
                }}
                aria-label="Forfeit Game"
              >
                <Skull size={iconSize} />
              </button>
            )}
          </ButtonsSections>
        </BetterRowContainer>

        <dialog
          ref={resetGameDialogRef}
          className="z-[999] size-full bg-background-settings overflow-y-scroll"
          onClick={() => resetGameDialogRef.current?.close()}
        >
          <div className="flex size-full items-center justify-center">
            <div className="flex flex-col justify-center p-4 gap-2 bg-background-default rounded-xl border-none">
              <h1
                className="text-center text-text-primary"
                style={{ fontSize: extraCountersSize }}
              >
                Reset Game?
              </h1>
              <div className="flex justify-evenly gap-2">
                <button
                  className="bg-primary-main border border-primary-dark text-text-primary rounded-lg flex-grow"
                  style={{ fontSize: iconSize }}
                  onClick={() => resetGameDialogRef.current?.close()}
                >
                  No
                </button>
                <button
                  className="bg-primary-main border border-primary-dark text-text-primary rounded-lg flex-grow"
                  onClick={() => {
                    handleResetGame();
                    resetGameDialogRef.current?.close();
                  }}
                  style={{ fontSize: iconSize }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </dialog>

        <dialog
          ref={endGameDialogRef}
          className="z-[999] size-full bg-background-settings overflow-y-scroll"
          onClick={() => endGameDialogRef.current?.close()}
        >
          <div className="flex size-full items-center justify-center">
            <div className="flex flex-col justify-center p-4 gap-2 bg-background-default rounded-xl border-none">
              <h1
                className="text-center text-text-primary"
                style={{ fontSize: extraCountersSize }}
              >
                Go to start?
              </h1>
              <div
                style={{ fontSize: iconSize }}
                className="text-center text-text-primary"
              >
                (Game will be saved)
              </div>
              <div className="flex justify-evenly gap-2">
                <button
                  className="bg-primary-main border border-primary-dark text-text-primary rounded-lg flex-grow"
                  style={{ fontSize: iconSize }}
                  onClick={() => endGameDialogRef.current?.close()}
                >
                  No
                </button>
                <button
                  className="bg-primary-main border border-primary-dark text-text-primary rounded-lg flex-grow"
                  onClick={() => {
                    handleGoToStart();
                    endGameDialogRef.current?.close();
                  }}
                  style={{ fontSize: iconSize }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </SettingsContainer>
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
