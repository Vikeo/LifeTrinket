import { initialPlayerOptions } from '../../App';
import { createInitialPlayers } from '../../Data/getInitialPlayers';
import { Player, Rotation } from '../../Types/Player';
import * as S from './PlayerMenu.style';

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

    const initialPlayers = createInitialPlayers(initialPlayerOptions);

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
    localStorage.removeItem('initialGameSettings');

    window.location.reload();
  };

  const handleFlip = () => {
    const updatedPlayer = {
      ...player,
      settings: {
        ...player.settings,
        rotation: Rotation.Flipped ? Rotation.Normal : Rotation.Flipped,
      },
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
    <S.SettingsContainer rotation={player.settings.rotation}>
      <S.Label rotation={player.settings.rotation}>
        Color:
        <S.Input
          type="color"
          value={player.color}
          onChange={handleColorChange}
        />
      </S.Label>

      <S.Label rotation={player.settings.rotation}>
        Commander:
        <S.Input
          type="checkbox"
          name="useCommanderDamage"
          checked={player.settings.useCommanderDamage}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label rotation={player.settings.rotation}>
        Partner:
        <S.Input
          type="checkbox"
          name="usePartner"
          checked={player.settings.usePartner}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label rotation={player.settings.rotation}>
        Poison:
        <S.Input
          type="checkbox"
          name="usePoison"
          checked={player.settings.usePoison}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label rotation={player.settings.rotation}>
        Energy:
        <S.Input
          type="checkbox"
          name="useEnergy"
          checked={player.settings.useEnergy}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Label rotation={player.settings.rotation}>
        Experience:
        <S.Input
          type="checkbox"
          name="useExperience"
          checked={player.settings.useExperience}
          onChange={handleSettingsChange}
        />
      </S.Label>
      <S.Button rotation={player.settings.rotation} onClick={handlePlayerReset}>
        Reset
      </S.Button>
      <S.Button rotation={player.settings.rotation} onClick={handleFlip}>
        Flip
      </S.Button>
      <S.Button rotation={player.settings.rotation} onClick={handleNewGame}>
        NEW GAME
      </S.Button>
      <S.Button rotation={player.settings.rotation} onClick={toggleFullscreen}>
        Fullscreen
      </S.Button>
    </S.SettingsContainer>
  );
};

export default Settings;
