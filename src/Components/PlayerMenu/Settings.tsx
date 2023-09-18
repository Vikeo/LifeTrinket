import { Button, Checkbox } from '@mui/material';
import styled, { css } from 'styled-components';
import { Energy, Experience, PartnerTax, Poison } from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import { WakeLock } from '../../Types/WakeLock';
import { useFullscreen } from '../../Hooks/useFullscreen';

type SettingsProps = {
  player: Player;
  opponents: Player[];
  onChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
  wakeLock: WakeLock;
};

const SettingsContainer = styled.div<{
  $rotation: Rotation;
}>`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 80%;
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
`;

const TogglesSection = styled.div<{ $rotation: Rotation }>`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.5rem;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const ButtonsSections = styled.div<{ $rotation: Rotation }>`
  position: absolute;
  display: flex;
  gap: 1rem;
  bottom: 16px;

  ${(props) => {
    if (props.$rotation === Rotation.Side) {
      return css`
        bottom: auto;
        right: -6rem;
        rotate: ${props.$rotation - 180}deg;
      `;
    } else if (props.$rotation === Rotation.SideFlipped) {
      return css`
        bottom: auto;
        left: -6rem;
        rotate: ${props.$rotation - 180}deg;
      `;
    }
  }}
`;

const ColorPicker = styled.input<{
  $rotation: Rotation;
}>`
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

  ${(props) => {
    if (props.$rotation === Rotation.Side) {
      return css`
        rotate: ${props.$rotation - 180}deg;
        bottom: 5%;
        top: auto;
      `;
    } else if (props.$rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.$rotation - 180}deg;
        top: 5%;
        left: auto;
        right: 5%;
      `;
    }
  }}
`;

const CheckboxContainer = styled.div<{ $rotation: Rotation }>`
  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.$rotation - 180}deg;
      `;
    }
  }}
`;

const Settings = ({
  player,
  onChange,
  resetCurrentGame,
  wakeLock,
}: SettingsProps) => {
  const { disableFullscreen, enableFullscreen, isFullscreen } = useFullscreen();
  const isSide =
    player.settings.rotation === Rotation.Side ||
    player.settings.rotation === Rotation.SideFlipped;

  const handleWakeLock = () => {
    if (!wakeLock.active) {
      wakeLock.request();
      return;
    }

    wakeLock.release();
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = { ...player, color: event.target.value };
    onChange(updatedPlayer);
  };

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...player.settings, [name]: checked };
    const updatedPlayer = { ...player, settings: updatedSettings };
    onChange(updatedPlayer);
  };

  const handleResetGame = () => {
    resetCurrentGame();
  };

  const handleNewGame = () => {
    handleResetGame();
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enableFullscreen();
    } else {
      disableFullscreen();
    }
  };

  const buttonFontSize = isSide ? '2vmax' : '4vmin';

  return (
    <SettingsContainer $rotation={player.settings.rotation}>
      <ColorPicker
        $rotation={player.settings.rotation}
        type="color"
        value={player.color}
        onChange={handleColorChange}
      />
      <TogglesSection $rotation={player.settings.rotation}>
        {player.settings.useCommanderDamage && (
          <CheckboxContainer $rotation={player.settings.rotation}>
            <Checkbox
              name="usePartner"
              checked={player.settings.usePartner}
              icon={
                <PartnerTax
                  size="6vmax"
                  color="black"
                  stroke="white"
                  strokeWidth="30"
                />
              }
              checkedIcon={
                <PartnerTax
                  size="6vmax"
                  color={player.color}
                  stroke="white"
                  strokeWidth="30"
                />
              }
              onChange={handleSettingsChange}
            />
          </CheckboxContainer>
        )}

        <CheckboxContainer $rotation={player.settings.rotation}>
          <Checkbox
            name="usePoison"
            checked={player.settings.usePoison}
            icon={
              <Poison
                size="6vmax"
                color="black"
                stroke="white"
                strokeWidth="30"
              />
            }
            checkedIcon={
              <Poison
                size="6vmax"
                color={player.color}
                stroke="white"
                strokeWidth="30"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>

        <CheckboxContainer $rotation={player.settings.rotation}>
          <Checkbox
            name="useEnergy"
            checked={player.settings.useEnergy}
            icon={
              <Energy
                size="6vmax"
                color="black"
                stroke="white"
                strokeWidth="15"
              />
            }
            checkedIcon={
              <Energy
                size="6vmax"
                color={player.color}
                stroke="white"
                strokeWidth="15"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>

        <CheckboxContainer $rotation={player.settings.rotation}>
          <Checkbox
            name="useExperience"
            checked={player.settings.useExperience}
            icon={
              <Experience
                size="6vmax"
                color="black"
                stroke="white"
                strokeWidth="15"
              />
            }
            checkedIcon={
              <Experience
                size="6vmax"
                color={player.color}
                stroke="white"
                strokeWidth="15"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>
      </TogglesSection>
      <ButtonsSections $rotation={player.settings.rotation}>
        <Button
          variant="contained"
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: buttonFontSize,
            padding: '0 4px 0 4px',
          }}
          onClick={handleNewGame}
        >
          Back to Start
        </Button>
        <Button
          variant={document.fullscreenElement ? 'contained' : 'outlined'}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: buttonFontSize,
            padding: '0 4px 0 4px',
          }}
          onClick={toggleFullscreen}
        >
          Fullscreen
        </Button>
        <Button
          variant={wakeLock.active ? 'contained' : 'outlined'}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: buttonFontSize,
            padding: '0 4px 0 4px',
          }}
          onClick={handleWakeLock}
        >
          Keep Awake
        </Button>
      </ButtonsSections>
    </SettingsContainer>
  );
};

export default Settings;
