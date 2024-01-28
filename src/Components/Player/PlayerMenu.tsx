import { Button, Checkbox } from '@mui/material';
import { useRef } from 'react';
import { twc } from 'react-twc';
import { theme } from '../../Data/theme';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { useSafeRotate } from '../../Hooks/useSafeRotate';
import { HexColorPicker } from 'react-colorful';
import {
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
import { RotationDivProps } from '../Buttons/CommanderDamage';

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
  gap-2
  h-full
  justify-evenly
  items-center
`;

const ButtonsSections = twc.div`
  flex
  max-w-full
  gap-4
  justify-between
  p-[3%]
  items-center
  flex-wrap
`;

const ColorPicker = twc.button`
  h-[8vmax]
  w-[8vmax]
  max-h-12
  max-w-12
  rounded-full
`;

const SettingsContainer = twc.div<RotationDivProps>((props) => [
  'flex flex-wrap h-full w-full',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col'
    : 'flex-row',
]);

type PlayerMenuProps = {
  player: Player;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
  isShown: boolean;
};

const PlayerMenu = ({
  player,
  setShowPlayerMenu,
  isShown,
}: PlayerMenuProps) => {
  const settingsContainerRef = useRef<HTMLDivElement | null>(null);
  const resetGameDialogRef = useRef<HTMLDialogElement | null>(null);
  const colorPickerDialogRef = useRef<HTMLDialogElement | null>(null);

  const { isSide } = useSafeRotate({
    rotation: player.settings.rotation,
    containerRef: settingsContainerRef,
  });

  const { fullscreen, wakeLock, goToStart } = useGlobalSettings();
  const { updatePlayer, resetCurrentGame } = usePlayers();

  const handleColorChange = (newColor: string) => {
    const updatedPlayer = { ...player, color: newColor };
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
        <BetterRowContainer>
          <TogglesSection>
            <ColorPicker
              style={{ backgroundColor: player.color }}
              onClick={() => colorPickerDialogRef.current?.show()}
              aria-label="Color picker"
            />
            {/* <HexColorPicker color={player.color} onChange={handleColorChange} /> */}
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
              onClick={() => resetGameDialogRef.current?.show()}
              role="checkbox"
              aria-checked={wakeLock.active}
              aria-label="Reset Game"
            >
              <ResetGame size={iconSize} />
            </Button>
          </ButtonsSections>
        </BetterRowContainer>
        <dialog
          ref={resetGameDialogRef}
          className="z-[999] size-full bg-background-settings"
          onClick={() => resetGameDialogRef.current?.close()}
        >
          <div className="flex size-full items-center justify-center">
            <div className="flex flex-col justify-center p-4 gap-2 bg-background-default rounded-2xl border-none">
              <h1 className="text-center text-text-primary">Reset Game?</h1>
              <div className="flex justify-evenly gap-4">
                <Button
                  variant="contained"
                  onClick={() => resetGameDialogRef.current?.close()}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleResetGame();
                    resetGameDialogRef.current?.close();
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </dialog>
        <dialog
          ref={colorPickerDialogRef}
          className="z-[9999] size-full bg-background-settings"
          onClick={() => colorPickerDialogRef.current?.close()}
        >
          <div className="flex justify-center items-center size-full">
            <HexColorPicker
              color={player.color}
              onChange={handleColorChange}
              style={{ height: '80%', width: '60%' }}
            />
          </div>
        </dialog>
      </SettingsContainer>
    </PlayerMenuWrapper>
  );
};

export default PlayerMenu;
