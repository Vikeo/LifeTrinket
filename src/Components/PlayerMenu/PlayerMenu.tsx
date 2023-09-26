import { Button, Checkbox } from '@mui/material';
import styled, { css } from 'styled-components';
import { Player, Rotation } from '../../Types/Player';
import { theme } from '../../Data/theme';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import {
  PartnerTax,
  Poison,
  Energy,
  Experience,
  Exit,
  FullscreenOff,
  FullscreenOn,
  Cross,
  ResetGame,
} from '../../Icons/generated';
import { useEffect, useRef } from 'react';
import { Spacer } from '../Misc/Spacer';

const SettingsContainer = styled.div<{
  $rotation: Rotation;
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
        height: 100%;
        width: 100%;
      `;
    }
  }}
  ${(props) => {
    if (props.$rotation === Rotation.Side) {
      return css`
        rotate: ${props.$rotation - 180}deg;
      `;
    } else if (props.$rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.$rotation - 180}deg;
      `;
    }
  }}
`;

const BetterRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: end;
  align-items: stretch;
`;

const TogglesSection = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-evenly;
`;

const ButtonsSections = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 3% 3%;
  align-items: center;
`;

const ColorPicker = styled.input`
  position: absolute;
  top: 5%;
  left: 5%;
  height: 8vmax;
  width: 8vmax;

  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
`;

const CheckboxContainer = styled.div<{ $rotation: Rotation }>`
  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        /* rotate: ${props.$rotation - 180}deg; */
      `;
    }
  }}
`;

const PlayerMenuWrapper = styled.div<{
  $rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
  align-items: center;
  justify-content: center;
  z-index: 2;
  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return;
    }
    return css`
      rotate: ${props.$rotation}deg;
    `;
  }};
`;

const CloseButton = styled.div<{
  $rotation: Rotation;
}>`
  position: absolute;
  top: 15%;
  right: 5%;
  z-index: 9999;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  ${(props) => {
    if (props.$rotation === Rotation.Side) {
      return css`
        rotate: ${props.$rotation - 180}deg;
        top: 5%;
        right: auto;
        left: 5%;
      `;
    } else if (props.$rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.$rotation - 180}deg;
        top: auto;
        left: auto;
        bottom: 5%;
        right: 5%;
      `;
    }
  }}
`;

type PlayerMenuProps = {
  player: Player;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const PlayerMenu = ({ player, setShowPlayerMenu }: PlayerMenuProps) => {
  const settingsContainerRef = useRef<HTMLDivElement | null>(null);
  const isSide =
    player.settings.rotation === Rotation.Side ||
    player.settings.rotation === Rotation.SideFlipped;

  useEffect(() => {
    if (!settingsContainerRef.current) {
      return;
    }

    if (isSide) {
      //set height to 100% of the width of the parent
      settingsContainerRef.current.style.height = `${settingsContainerRef.current.parentElement?.clientWidth}px`;

      //set width to 100% of the height of the parent
      settingsContainerRef.current.style.width = `${settingsContainerRef.current.parentElement?.clientHeight}px`;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsContainerRef]);

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

  return (
    <PlayerMenuWrapper $rotation={player.settings.rotation}>
      <CloseButton $rotation={player.settings.rotation}>
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
              <CheckboxContainer $rotation={player.settings.rotation}>
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

            <CheckboxContainer $rotation={player.settings.rotation}>
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

            <CheckboxContainer $rotation={player.settings.rotation}>
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

            <CheckboxContainer $rotation={player.settings.rotation}>
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
          <Spacer height="1rem" />
          <ButtonsSections>
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
            <CheckboxContainer $rotation={player.settings.rotation}>
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
              onClick={() => {
                settingsContainerRef.current?.querySelector(`dialog`)?.show();
              }}
              role="checkbox"
              aria-checked={wakeLock.active}
              aria-label="Reset Game"
            >
              <ResetGame size={iconSize} />
            </Button>
          </ButtonsSections>
        </BetterRowContainer>
        <dialog
          id={`reset-game-${player.index}`}
          style={{
            borderRadius: '1rem',
            backgroundColor: theme.palette.background.default,
            position: 'absolute',
            top: '25%',
            color: theme.palette.text.primary,
            border: 'none',
          }}
        >
          <h3>Reset Game?</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                settingsContainerRef.current?.querySelector(`dialog`)?.close();
              }}
            >
              No
            </Button>
            <Spacer width="1rem" />
            <Button
              variant="contained"
              onClick={() => {
                handleResetGame();

                settingsContainerRef.current?.querySelector(`dialog`)?.close();
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
