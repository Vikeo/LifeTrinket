import React from 'react';
import { Player } from '../../Types/Player';
import * as S from './PlayerMenu.style';
import { initialPlayers } from '../../Data/getInitialPlayers';

type SettingsProps = {
  player: Player;
  opponents: Player[];
  onChange: (updatedPlayer: Player) => void;
};

const Settings = ({ player, opponents, onChange }: SettingsProps) => {
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

  const handlePlayerReset = () => {
    // Commander damage doesn't reset when player is reset
    player?.commanderDamage.forEach((commanderDamage) => {
      commanderDamage.damageTotal = 0;
      commanderDamage.partnerDamageTotal = 0;
    });

    const resetPlayer = initialPlayers.find((initialPlayer) => {
      return initialPlayer.key === player.key;
    });

    if (!resetPlayer) {
      return;
    }

    opponents.forEach((opponent) => {
      // Only reset commander damage from the player that is being reset
      opponent.commanderDamage.forEach((commanderDamage) => {
        if (commanderDamage.source !== player.key) {
          return;
        }
        opponent.lifeTotal =
          opponent.lifeTotal +
          commanderDamage.damageTotal +
          commanderDamage.partnerDamageTotal;
        commanderDamage.damageTotal = 0;
        commanderDamage.partnerDamageTotal = 0;
      });
      onChange(opponent);
    });

    onChange(resetPlayer);
  };

  const handleNewGame = () => {
    localStorage.removeItem('players');
    window.location.reload();
  };

  const handleFlip = () => {
    const updatedPlayer = {
      ...player,
      settings: { ...player.settings, flipped: !player.settings.flipped },
    };
    onChange(updatedPlayer);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <S.SettingsContainer>
      <S.Label>
        Color:
        <S.Input
          type="color"
          value={player.color}
          onChange={handleColorChange}
        />
      </S.Label>

      <S.Label>
        Commander:
        <S.Input
          type="checkbox"
          name="useCommanderDamage"
          checked={player.settings.useCommanderDamage}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label>
        Partner:
        <S.Input
          type="checkbox"
          name="usePartner"
          checked={player.settings.usePartner}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label>
        Poison:
        <S.Input
          type="checkbox"
          name="usePoison"
          checked={player.settings.usePoison}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label>
        Energy:
        <S.Input
          type="checkbox"
          name="useEnergy"
          checked={player.settings.useEnergy}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label>
        Experience:
        <S.Input
          type="checkbox"
          name="useExperience"
          checked={player.settings.useExperience}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Button onClick={handlePlayerReset}>Reset</S.Button>
      <S.Button onClick={handleFlip}>Flip</S.Button>
      <S.Button onClick={handleNewGame}>NEW GAME</S.Button>
      <S.Button onClick={toggleFullscreen}>Fullscreen</S.Button>
    </S.SettingsContainer>
  );
};

export default Settings;
