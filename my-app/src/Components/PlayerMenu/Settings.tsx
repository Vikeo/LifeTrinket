import React from 'react';
import { Player } from '../../Types/Player';
import styled from 'styled-components';

type SettingsProps = {
  player: Player;
  onChange: (updatedPlayer: Player) => void;
};

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  height: 70%;
  padding: 1rem;
  gap: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
`;

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
    <SettingsContainer>
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
        Commander:
        <input
          type="checkbox"
          name="useCommanderDamage"
          checked={player.settings.useCommanderDamage}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Partner:
        <input
          type="checkbox"
          name="usePartner"
          checked={player.settings.usePartner}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Poison:
        <input
          type="checkbox"
          name="usePoison"
          checked={player.settings.usePoison}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Energy:
        <input
          type="checkbox"
          name="useEnergy"
          checked={player.settings.useEnergy}
          onChange={handleSettingsChange}
        />
      </label>
      <label>
        Experience:
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
    </SettingsContainer>
  );
};

export default Settings;
