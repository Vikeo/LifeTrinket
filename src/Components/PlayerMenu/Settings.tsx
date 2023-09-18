import { Button, Checkbox } from '@mui/material';
import styled, { css } from 'styled-components';
import {
  Energy,
  Exit,
  Experience,
  FullscreenOff,
  FullscreenOn,
  PartnerTax,
  Poison,
} from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import { WakeLock } from '../../Types/WakeLock';
import { useFullscreen } from '../../Hooks/useFullscreen';
import { theme } from '../../Data/theme';
import { InitialSettings } from '../../Data/getInitialPlayers';

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

type SettingsProps = {
  player: Player;
  opponents: Player[];
  onChange: (updatedPlayer: Player) => void;
  goToStart: () => void;
  wakeLock: WakeLock;
  setShowPlayerMenu: (showPlayerMenu: boolean) => void;
};

const Settings = ({
  player,
  onChange,
  goToStart,
  wakeLock,
  opponents,
  setShowPlayerMenu,
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
    const savedGameSettings = localStorage.getItem('initialGameSettings');

    const initialGameSettings: InitialSettings = savedGameSettings
      ? JSON.parse(savedGameSettings)
      : null;

    if (!initialGameSettings) {
      goToStart();
    }

    const startingPlayerIndex = Math.floor(
      Math.random() * initialGameSettings.numberOfPlayers
    );

    [player, ...opponents].forEach((player: Player) => {
      player.commanderDamage.map((damage) => {
        damage.damageTotal = 0;
        damage.partnerDamageTotal = 0;
      });

      player.extraCounters.map((counter) => {
        counter.value = 0;
      });

      player.lifeTotal = initialGameSettings.startingLifeTotal;

      player.hasLost = false;

      const isStartingPlayer = player.index === startingPlayerIndex;

      player.isStartingPlayer = isStartingPlayer;

      if (player.isStartingPlayer) {
        player.showStartingPlayer = true;
      }

      onChange(player);
    });
    localStorage.setItem('playing', 'false');
    setShowPlayerMenu(false);
  };

  const handleNewGame = () => {
    goToStart();
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      disableFullscreen();
    } else {
      enableFullscreen();
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
        role="button"
        aria-label="Color picker"
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
            role="checkbox"
            aria-checked={player.settings.useExperience}
            aria-label="Experience"
          />
        </CheckboxContainer>
      </TogglesSection>
      <ButtonsSections $rotation={player.settings.rotation}>
        <Button
          variant="text"
          style={{
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={handleNewGame}
          aria-label="Back to start"
        >
          <Exit size="4vmax" style={{ rotate: '180deg' }} />
        </Button>
        <CheckboxContainer $rotation={player.settings.rotation}>
          <Checkbox
            name="fullscreen"
            checked={document.fullscreenElement ? true : false}
            icon={
              <FullscreenOff size="4vmax" color={theme.palette.primary.main} />
            }
            checkedIcon={<FullscreenOn size="4vmax" />}
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
          onClick={handleWakeLock}
          role="checkbox"
          aria-checked={wakeLock.active}
          aria-label="Keep awake"
        >
          Keep Awake
        </Button>

        <Button
          variant="contained"
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            fontSize: buttonFontSize,
            padding: '0 4px 0 4px',
          }}
          onClick={handleResetGame}
          role="checkbox"
          aria-checked={wakeLock.active}
          aria-label="Reset Game"
        >
          Reset Game
        </Button>
      </ButtonsSections>
    </SettingsContainer>
  );
};

export default Settings;
