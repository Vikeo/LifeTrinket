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
  text-[7vmin] font-bold text-center
  text-text-primary
  -mb-4
`;

const ButtonContainer = twc.div`
  flex flex-col gap-3
`;

const WinnerName = twc.div`
  text-[6vmin] font-bold text-center
  py-[2vmin] px-[3vmin] rounded-xl
  text-white
  mb-0
`;

const PrimaryButton = twc.button`
  py-[2vmin] px-[3vmin] rounded-xl
  text-[4vmin] font-semibold
  bg-interface-primary
  text-white
  transition-all duration-200
  hover:scale-105 active:scale-95
  border-3 border-white/50
  shadow-lg shadow-interface-primary/50
`;

const SecondaryButton = twc.button`
  py-[2vmin] px-[3vmin] rounded-xl
  text-[4vmin] font-semibold
  bg-secondary-main
  text-text-primary
  transition-all duration-200
  hover:scale-105 active:scale-95
  border-3 border-primary-main
  shadow-lg shadow-secondary-main/50
`;

type GameOverProps = {
  winner: Player;
  onStartNextGame: () => void;
  onStay: () => void;
};

export const GameOver = ({
  winner,
  onStartNextGame,
  onStay,
}: GameOverProps) => {
  return (
    <Overlay>
      <Modal>
        <Title>Winner</Title>
        <WinnerName style={{ backgroundColor: winner.color }}>
          {winner.name || `Player ${winner.index + 1}`}
        </WinnerName>
        <ButtonContainer>
          <SecondaryButton onClick={onStartNextGame}>
            Start Next Game
          </SecondaryButton>
          <PrimaryButton onClick={onStay}>Close</PrimaryButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  );
};
