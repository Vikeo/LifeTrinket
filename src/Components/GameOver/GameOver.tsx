import { twc } from 'react-twc';
import { Player } from '../../Types/Player';

const Overlay = twc.div`
  absolute top-0 left-0 w-full h-full
  bg-black/80 backdrop-blur-sm
  flex items-center justify-center
  z-50
`;

const Modal = twc.div`
  bg-background-default
  rounded-2xl p-8
  max-w-md w-[90%]
  shadow-2xl
  flex flex-col gap-6
`;

const Title = twc.h2`
  text-4xl font-bold text-center
  text-text-primary
`;

const ButtonContainer = twc.div`
  flex flex-col gap-3
`;

const PlayerButton = twc.button`
  py-4 px-6 rounded-xl
  text-xl font-semibold
  text-white
  transition-all duration-200
  hover:scale-105 active:scale-95
  border-2 border-transparent
  hover:border-white/30
`;

type GameOverProps = {
  players: Player[];
  onWinnerSelected: (winnerIndex: number) => void;
};

export const GameOver = ({ players, onWinnerSelected }: GameOverProps) => {
  const activePlayers = players.filter((player) => !player.hasLost);

  return (
    <Overlay>
      <Modal>
        <Title>Game Over!</Title>
        <p className="text-center text-text-secondary text-lg">
          Who won this game?
        </p>
        <ButtonContainer>
          {activePlayers.map((player) => (
            <PlayerButton
              key={player.index}
              style={{ backgroundColor: player.color }}
              onClick={() => onWinnerSelected(player.index)}
            >
              {player.name || `Player ${player.index + 1}`}
            </PlayerButton>
          ))}
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};
