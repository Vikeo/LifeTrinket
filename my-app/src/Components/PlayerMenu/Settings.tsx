import React from 'react';
import { Player } from '../../Types/Player';

type SettingsProps = {
  player: Player;
  onChange: (updatedPlayer: Player) => void;
};

const Settings = ({ player, onChange }: SettingsProps) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = { ...player, color: event.target.value };
    onChange(updatedPlayer);
  };

  const handleLifeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = {
      ...player,
      lifeTotal: parseInt(event.target.value),
    };
    onChange(updatedPlayer);
  };

  const handleSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...player.settings, [name]: checked };
    const updatedPlayer = { ...player, settings: updatedSettings };
    onChange(updatedPlayer);
  };

  return (
    <div>
      <label>
        Color:
        <input type="color" value={player.color} onChange={handleColorChange} />
      </label>
      <label>
        Life Total:
        <input
          type="number"
          value={player.lifeTotal}
          onChange={handleLifeChange}
        />
      </label>
      <label>
        Use Commander Damage:
        <input
          type="checkbox"
          name="useCommanderDamage"
          checked={player.settings.useCommanderDamage}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Use Partner Commander:
        <input
          type="checkbox"
          name="usePartner"
          checked={player.settings.usePartner}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Show Poison Damage:
        <input
          type="checkbox"
          name="usePoison"
          checked={player.settings.usePoison}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Show Energy:
        <input
          type="checkbox"
          name="useEnergy"
          checked={player.settings.useEnergy}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Show Energy:
        <input
          type="checkbox"
          name="useEnergy"
          checked={player.settings.useEnergy}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Show Experience:
        <input
          type="checkbox"
          name="useExperience"
          checked={player.settings.useExperience}
          onChange={handleSettingsChange}
        />
      </label>
      <button
        onClick={() => {
          const updatedPlayer = {
            ...player,
            settings: { ...player.settings, flipped: !player.settings.flipped },
          };
          onChange(updatedPlayer);
        }}
      >
        Flip
      </button>
    </div>
  );
};

export default Settings;
