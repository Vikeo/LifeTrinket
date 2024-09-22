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

  const rotationIsSide =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side;

  return (
    <div
      data-rotation-is-side={rotationIsSide}
      className="absolute w-full h-full flex items-start justify-center pointer-events-none z-[1]
      data-[rotation-is-side=true]:justify-start data-[rotation-is-side=true]:items-center
      "
    >
      <div
        data-rotation-is-side={rotationIsSide}
        className="data-[rotation-is-side=true]:-rotate-90"
      >
        <IconCheckbox
          className="pointer-events-all"
          name="useMonarch"
          checked={player.isMonarch}
          icon={<Monarch size={iconSize} color={player.color} stroke="white" />}
          checkedIcon={<Monarch size={iconSize} color="gold" stroke="white" />}
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
    </div>
  );
};
