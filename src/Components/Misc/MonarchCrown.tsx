import { usePlayers } from '../../Hooks/usePlayers';
import { Monarch } from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import { IconCheckbox } from './IconCheckbox';

export const MonarchCrown = ({ player }: { player: Player }) => {
  const { players, setPlayers } = usePlayers();

  const iconSize =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? '5vmax'
      : '10vmin';

  return (
    <div className="flex justify-center items-center pointer-events-all flex-grow">
      <IconCheckbox
        name="useMonarch"
        checked={player.isMonarch}
        icon={<Monarch size={iconSize} color={player.color} stroke="white" />}
        checkedIcon={<Monarch size={iconSize} color="black" stroke="black" />}
        onChange={(e) => {
          const updatedPlayer = { ...player, isMonarch: e.target.checked };

          const updatedPlayers = players.map((p) => {
            if (p.index === player.index) {
              return updatedPlayer;
            }
            return { ...p, isMonarch: false };
          });

          setPlayers(updatedPlayers);
        }}
        aria-checked={player.isMonarch}
        aria-label="Monarch"
      />
    </div>
  );
};
