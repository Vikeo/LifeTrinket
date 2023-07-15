import { Checkbox } from '@mui/material';
import { Player } from '../../Types/Player';
import * as S from './PlayerMenu.style';
import ExperienceIcon from '../../Icons/ExperienceIcon';
import PartnerTaxIcon from '../../Icons/PartnerTaxIcon';
import EnergyIcon from '../../Icons/EnergyIcon';
import PoisonIcon from '../../Icons/PoisonIcon';
import { useWakeLock } from 'react-screen-wake-lock';

type SettingsProps = {
  player: Player;
  opponents: Player[];
  onChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
};

const Settings = ({
  player,
  opponents,
  onChange,
  resetCurrentGame,
}: SettingsProps) => {
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
    <S.SettingsContainer rotation={player.settings.rotation}>
      <S.Label rotation={player.settings.rotation}>
        Color:
        <S.Input
          type="color"
          value={player.color}
          onChange={handleColorChange}
        />
      </S.Label>
      <Checkbox
        name="usePartner"
        checked={player.settings.usePartner}
        icon={<PartnerTaxIcon size="32px" color="black" />}
        checkedIcon={<PartnerTaxIcon size="32px" color={player.color} />}
        onChange={handleSettingsChange}
      />
      <Checkbox
        name="usePoison"
        checked={player.settings.usePoison}
        icon={<PoisonIcon size="32px" color="black" />}
        checkedIcon={<PoisonIcon size="32px" color={player.color} />}
        onChange={handleSettingsChange}
      />
      <Checkbox
        name="useEnergy"
        checked={player.settings.useEnergy}
        icon={<EnergyIcon size="32px" color="black" />}
        checkedIcon={<EnergyIcon size="32px" color={player.color} />}
        onChange={handleSettingsChange}
      />
      <Checkbox
        name="useExperience"
        checked={player.settings.useExperience}
        icon={<ExperienceIcon size="32px" color="black" />}
        checkedIcon={<ExperienceIcon size="32px" color={player.color} />}
        onChange={handleSettingsChange}
      />
      <S.Button rotation={player.settings.rotation} onClick={handleResetGame}>
        Reset All
      </S.Button>

      <S.Button rotation={player.settings.rotation} onClick={handleNewGame}>
        Back to Start
      </S.Button>
      <S.Button rotation={player.settings.rotation} onClick={toggleFullscreen}>
        Fullscreen
      </S.Button>

      <S.Button rotation={player.settings.rotation} onClick={handleWakeLock}>
        {released === false ? 'Release' : 'Request'} nosleep
      </S.Button>
    </S.SettingsContainer>
  );
};

export default Settings;
