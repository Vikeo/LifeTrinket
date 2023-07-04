import React from 'react';
import { Player } from '../../Types/Player';
import * as S from './PlayerMenu.style';

type SettingsProps = {
  player: Player;
  onChange: (updatedPlayer: Player) => void;
};

const Settings = ({ player, onChange }: SettingsProps) => {
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
      <S.Button
        onClick={() => {
          const updatedPlayer = {
            ...player,
            settings: { ...player.settings, flipped: !player.settings.flipped },
          };
          onChange(updatedPlayer);
        }}
      >
        Flip
      </S.Button>
    </S.SettingsContainer>
  );
};

export default Settings;
