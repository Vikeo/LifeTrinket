import { Checkbox } from '@mui/material';
import { Player, Rotation } from '../../Types/Player';
import ExperienceIcon from '../../Icons/ExperienceIcon';
import PartnerTaxIcon from '../../Icons/PartnerTaxIcon';
import EnergyIcon from '../../Icons/EnergyIcon';
import PoisonIcon from '../../Icons/PoisonIcon';
import { useWakeLock } from 'react-screen-wake-lock';
import styled, { css } from 'styled-components/macro';

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
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 2vmin;
  height: 100%;
  width: 100%;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: row;
        padding-top: 36px;
      `;
    } else {
      return css`
        padding-top: 36px;
      `;
    }
  }}
`;

const SettingsSection = styled.div<{ rotation: Rotation }>`
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
      <SettingsSection rotation={player.settings.rotation}>
        {player.settings.useCommanderDamage && (
          <CheckboxContainer rotation={player.settings.rotation}>
            <Checkbox
              name="usePartner"
              checked={player.settings.usePartner}
              icon={
                <PartnerTaxIcon
                  size="4vmax"
                  color="black"
                  opacity={1}
                  showStroke
                />
              }
              checkedIcon={
                <PartnerTaxIcon
                  size="4vmax"
                  color={player.color}
                  opacity={1}
                  showStroke
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
              <PoisonIcon size="4vmax" color="black" opacity={1} showStroke />
            }
            checkedIcon={
              <PoisonIcon
                size="4vmax"
                color={player.color}
                opacity={1}
                showStroke
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
              <EnergyIcon size="4vmax" color="black" opacity={1} showStroke />
            }
            checkedIcon={
              <EnergyIcon
                size="4vmax"
                color={player.color}
                opacity={1}
                showStroke
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
              <ExperienceIcon
                size="4vmax"
                color="black"
                opacity={1}
                showStroke
              />
            }
            checkedIcon={
              <ExperienceIcon
                size="4vmax"
                color={player.color}
                opacity={1}
                showStroke
              />
            }
            onChange={handleSettingsChange}
          />
        </CheckboxContainer>
      </SettingsSection>

      <SettingsSection rotation={player.settings.rotation}>
        <Button rotation={player.settings.rotation} onClick={handleResetGame}>
          Reset All
        </Button>
        <Button rotation={player.settings.rotation} onClick={handleNewGame}>
          Back to Start
        </Button>
        <Button rotation={player.settings.rotation} onClick={toggleFullscreen}>
          Fullscreen
        </Button>
        <Button rotation={player.settings.rotation} onClick={handleWakeLock}>
          {released === false ? 'Release' : 'Request'} nosleep
        </Button>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default Settings;