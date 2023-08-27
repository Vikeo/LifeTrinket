import { Checkbox } from '@mui/material';
import styled, { css } from 'styled-components';
import { useWakeLock } from '../../Data/useWakeLock';
import { Energy, Experience, PartnerTax, Poison } from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';

type SettingsProps = {
  player: Player;
  opponents: Player[];
  onChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
};

const SettingsContainer = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 80%;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
        height: 100%;
        width: 100%;
        /* padding-top: 36px; */
      `;
    } else {
      return css`
        /* padding-top: 36px; */
      `;
    }
  }}
`;

const TogglesSection = styled.div<{ rotation: Rotation }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 0.5rem;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const ButtonsSections = styled.div<{ rotation: Rotation }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1rem;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation - 180}deg;
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const ColorPicker = styled.input<{
  rotation: Rotation;
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
    if (props.rotation === Rotation.Side) {
      return css`
        rotate: ${props.rotation - 180}deg;
        bottom: 5%;
        top: auto;
      `;
    } else if (props.rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: 5%;
        left: auto;
        right: 5%;
      `;
    }
  }}
`;

const Button = styled.button<{
  rotation: Rotation;
}>`
  cursor: pointer;
  user-select: none;
  color: #000000;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation + 90}deg;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        text-orientation: sideways;
      `;
    }
  }}
`;

const CheckboxContainer = styled.div<{ rotation: Rotation }>`
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation - 180}deg;
      `;
    }
  }}
`;

const Settings = ({ player, onChange, resetCurrentGame }: SettingsProps) => {
  const { released, request, release } = useWakeLock();
  const handleWakeLock = () => (released === false ? release() : request());

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
    localStorage.removeItem('players');
    localStorage.removeItem('playing');
    localStorage.removeItem('initialGameSettings');

    window.location.reload();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <SettingsContainer rotation={player.settings.rotation}>
      <ColorPicker
        rotation={player.settings.rotation}
        type="color"
        value={player.color}
        onChange={handleColorChange}
      />
      <TogglesSection rotation={player.settings.rotation}>
        {player.settings.useCommanderDamage && (
          <CheckboxContainer rotation={player.settings.rotation}>
            <Checkbox
              name="usePartner"
              checked={player.settings.usePartner}
              icon={
                <PartnerTax
                  size="6vmax"
                  color="black"
                  stroke="white"
                  stroke-width="30"
                />
              }
              checkedIcon={
                <PartnerTax
                  size="6vmax"
                  color={player.color}
                  stroke="white"
                  stroke-width="30"
                />
              }
              onChange={handleSettingsChange}
            />
          </CheckboxContainer>
        )}

        <CheckboxContainer rotation={player.settings.rotation}>
          <Checkbox
            name="usePoison"
            checked={player.settings.usePoison}
            icon={
              <Poison
                size="6vmax"
                color="black"
                stroke="white"
                stroke-width="30"
              />
            }
            checkedIcon={
              <Poison
                size="6vmax"
                color={player.color}
                stroke="white"
                stroke-width="30"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>

        <CheckboxContainer rotation={player.settings.rotation}>
          <Checkbox
            name="useEnergy"
            checked={player.settings.useEnergy}
            icon={
              <Energy
                size="6vmax"
                color="black"
                stroke="white"
                stroke-width="30"
              />
            }
            checkedIcon={
              <Energy
                size="6vmax"
                color={player.color}
                stroke="white"
                stroke-width="30"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>

        <CheckboxContainer rotation={player.settings.rotation}>
          <Checkbox
            name="useExperience"
            checked={player.settings.useExperience}
            icon={
              <Experience
                size="6vmax"
                color="black"
                stroke="white"
                stroke-width="50"
              />
            }
            checkedIcon={
              <Experience
                size="6vmax"
                color={player.color}
                stroke="white"
                stroke-width="50"
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>
      </TogglesSection>

      <ButtonsSections rotation={player.settings.rotation}>
        <Button onClick={handleNewGame}>Back to Start</Button>
        <Button onClick={toggleFullscreen}>Fullscreen</Button>
        <Button onClick={handleWakeLock}>
          {released === false ? 'Release' : 'Request'} nosleep
        </Button>
      </ButtonsSections>
    </SettingsContainer>
  );
};

export default Settings;
