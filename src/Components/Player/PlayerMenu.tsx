import { Button, Checkbox } from '@mui/material';
import { useRef } from 'react';
import { twc } from 'react-twc';
import { theme } from '../../Data/theme';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { useSafeRotate } from '../../Hooks/useSafeRotate';
import {
  Cross,
  Energy,
  Exit,
  Experience,
  FullscreenOff,
  FullscreenOn,
  PartnerTax,
  Poison,
  ResetGame,
} from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import {
  RotationButtonProps,
  RotationDivProps,
} from '../Buttons/CommanderDamage';

const BetterRowContainer = twc.div`
  flex
  flex-col
  flex-grow
  w-full
  h-full
  justify-end
  items-stretch
`;

const TogglesSection = twc.div`
  flex
  relative
  flex-row
  gap-2
  justify-evenly
`;

const ButtonsSections = twc.div`
  flex
  max-w-full
  gap-4
  justify-between
  p-[3%]
  items-center
`;

const ColorPicker = twc.input`
  absolute
  top-[5%]
  left-[5%]
  h-[8vmax]
  w-[8vmax]
  border-none
  outline-none
  cursor-pointer
  bg-transparent
  user-select-nonetext-common-white
`;

const SettingsContainer = twc.div<RotationDivProps>((props) => [
  'flex flex-wrap h-full w-full',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col'
    : 'flex-row',
]);

const CheckboxContainer = twc.div``;

const PlayerMenuWrapper = twc.div`
  flex
  flex-col
  absolute
  w-full
  h-full
  bg-background-settings
  items-center
  justify-center
  z-[2]
`;

const CloseButton = twc.button<RotationButtonProps>((props) => [
  'absolute border-none outline-none cursor-pointer bg-transparent z-[99]',
  props.$rotation === Rotation.Side
    ? `top-[5%] right-auto left-[5%]`
    : props.$rotation === Rotation.SideFlipped
    ? 'top-auto left-auto bottom-[5%] right-[5%]'
    : 'top-[15%] right-[5%]',
]);

type PlayerMenuProps = {
  player: Player;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const PlayerMenu = ({ player, setShowPlayerMenu }: PlayerMenuProps) => {
  const settingsContainerRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const { isSide } = useSafeRotate({
    rotation: player.settings.rotation,
    containerRef: settingsContainerRef,
  });

  const handleOnClick = () => {
    setShowPlayerMenu(false);
  };
  const { fullscreen, wakeLock, goToStart } = useGlobalSettings();
  const { updatePlayer, resetCurrentGame } = usePlayers();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = { ...player, color: event.target.value };
    updatePlayer(updatedPlayer);
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
  const closeButtonSize = isSide ? '6vmin' : '3vmax';

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
          player.settings.rotation === Rotation.SideFlipped ? '180deg' : '',
      }}
    >
      <CloseButton
        $rotation={player.settings.rotation}
        style={{
          rotate:
            player.settings.rotation === Rotation.Side ||
            player.settings.rotation === Rotation.SideFlipped
              ? `${player.settings.rotation - 180}deg`
              : '',
        }}
      >
        <Button
          variant="text"
          onClick={handleOnClick}
          style={{
            margin: 0,
            padding: 0,
            height: closeButtonSize,
            width: closeButtonSize,
          }}
        >
          <Cross size={closeButtonSize} />
        </Button>
      </CloseButton>

      <SettingsContainer
        $rotation={player.settings.rotation}
        style={{
          rotate: calcRotation,
        }}
        ref={settingsContainerRef}
      >
        <ColorPicker
          type="color"
          value={player.color}
          onChange={handleColorChange}
          role="button"
          aria-label="Color picker"
        />
        <BetterRowContainer>
          <TogglesSection>
            {player.settings.useCommanderDamage && (
              <CheckboxContainer>
                <Checkbox
                  name="usePartner"
                  checked={player.settings.usePartner}
                  icon={
                    <PartnerTax
                      size={extraCountersSize}
                      color="black"
                      stroke="white"
                      strokeWidth="30"
                    />
                  }
                  checkedIcon={
                    <PartnerTax
                      size={extraCountersSize}
                      color={player.color}
                      stroke="white"
                      strokeWidth="30"
                    />
                  }
                  onChange={handleSettingsChange}
                  role="checkbox"
                  aria-checked={player.settings.usePartner}
                  aria-label="Partner"
                />
              </CheckboxContainer>
            )}

            <CheckboxContainer>
              <Checkbox
                name="usePoison"
                checked={player.settings.usePoison}
                icon={
                  <Poison
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth="30"
                  />
                }
                checkedIcon={
                  <Poison
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth="30"
                  />
                }
                onChange={handleSettingsChange}
                role="checkbox"
                aria-checked={player.settings.usePoison}
                aria-label="Poison"
              />
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                name="useEnergy"
                checked={player.settings.useEnergy}
                icon={
                  <Energy
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth="15"
                  />
                }
                checkedIcon={
                  <Energy
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth="15"
                  />
                }
                onChange={handleSettingsChange}
                role="checkbox"
                aria-checked={player.settings.useEnergy}
                aria-label="Energy"
              />
            </CheckboxContainer>

            <CheckboxContainer>
              <Checkbox
                name="useExperience"
                checked={player.settings.useExperience}
                icon={
                  <Experience
                    size={extraCountersSize}
                    color="black"
                    stroke="white"
                    strokeWidth="15"
                  />
                }
                checkedIcon={
                  <Experience
                    size={extraCountersSize}
                    color={player.color}
                    stroke="white"
                    strokeWidth="15"
                  />
                }
                onChange={handleSettingsChange}
                role="checkbox"
                aria-checked={player.settings.useExperience}
                aria-label="Experience"
              />
            </CheckboxContainer>
          </TogglesSection>
          <ButtonsSections className="mt-4">
            <Button
              variant="text"
              style={{
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={goToStart}
              aria-label="Back to start"
            >
              <Exit size={iconSize} style={{ rotate: '180deg' }} />
            </Button>
            <CheckboxContainer>
              <Checkbox
                name="fullscreen"
                checked={document.fullscreenElement ? true : false}
                icon={
                  <FullscreenOff
                    size={iconSize}
                    color={theme.palette.primary.main}
                  />
                }
                checkedIcon={<FullscreenOn size={iconSize} />}
                onChange={toggleFullscreen}
                role="checkbox"
                aria-checked={document.fullscreenElement ? true : false}
                aria-label="Fullscreen"
              />
            </CheckboxContainer>

            <Button
              variant={wakeLock.active ? 'contained' : 'outlined'}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: buttonFontSize,
                padding: '0 4px 0 4px',
              }}
              onClick={wakeLock.toggleWakeLock}
              role="checkbox"
              aria-checked={wakeLock.active}
              aria-label="Keep awake"
            >
              Keep Awake
            </Button>

            <Button
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                fontSize: buttonFontSize,
                padding: '4px',
              }}
              onClick={() => dialogRef.current?.show()}
              role="checkbox"
              aria-checked={wakeLock.active}
              aria-label="Reset Game"
            >
              <ResetGame size={iconSize} />
            </Button>
          </ButtonsSections>
        </BetterRowContainer>
        <dialog
          ref={dialogRef}
          className="z-[9999] bg-background-default text-text-primary rounded-2xl border-none absolute top-[10%]"
        >
          <h1>Reset Game?</h1>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              variant="contained"
              onClick={() => dialogRef.current?.close()}
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleResetGame();
                dialogRef.current?.close();
              }}
            >
              Yes
            </Button>
          </div>
        </dialog>
      </SettingsContainer>
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
