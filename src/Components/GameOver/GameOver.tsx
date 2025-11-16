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

const WinnerName = twc.div`
  text-3xl font-bold text-center
  py-4 px-6 rounded-xl
  text-white
  mb-2
`;

const StartButton = twc.button`
  py-4 px-6 rounded-xl
  text-xl font-semibold
  bg-interface-primary
  text-white
  transition-all duration-200
  hover:scale-105 active:scale-95
  border-2 border-transparent
  hover:border-white/30
`;

type GameOverProps = {
  winner: Player;
  onStartNextGame: () => void;
};

export const GameOver = ({ winner, onStartNextGame }: GameOverProps) => {
  return (
    <Overlay>
      <Modal>
        <Title>Game Over!</Title>
        <WinnerName style={{ backgroundColor: winner.color }}>
          {winner.name || `Player ${winner.index + 1}`}
        </WinnerName>
        <p className="text-center text-text-primary text-2xl font-semibold">
          Won the game!
        </p>
        <ButtonContainer>
          <StartButton onClick={onStartNextGame}>
            Start Next Game
          </StartButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};
