import { twc } from 'react-twc';
import { Player } from '../../Types/Player';
import { GameScore } from '../../Contexts/GlobalSettingsContext';

const ScoreContainer = twc.div`
  absolute bottom-4 left-1/2 -translate-x-1/2
  bg-background-default/90 backdrop-blur-sm
  rounded-lg p-4
  shadow-lg
  z-40
  min-w-[200px]
`;

const Title = twc.h3`
  text-sm font-semibold text-text-secondary
  uppercase tracking-wide mb-3
`;

const ScoreList = twc.div`
  flex flex-col gap-2
`;

const ScoreItem = twc.div`
  flex items-center justify-between gap-4
`;

const PlayerInfo = twc.div`
  flex items-center gap-2
`;

const PlayerColor = twc.div`
  w-4 h-4 rounded-full
`;

const PlayerName = twc.span`
  text-text-primary font-medium
`;

const Score = twc.span`
  text-text-primary font-bold text-lg
`;

type ScoreDisplayProps = {
  players: Player[];
  gameScore: GameScore;
};

export const ScoreDisplay = ({ players, gameScore }: ScoreDisplayProps) => {
  const hasAnyScore = Object.values(gameScore).some((score) => score > 0);

  if (!hasAnyScore) {
    return null;
  }

  return (
    <ScoreContainer>
      <Title>Match Score</Title>
      <ScoreList>
        {players.map((player) => (
          <ScoreItem key={player.index}>
            <PlayerInfo>
              <PlayerColor style={{ backgroundColor: player.color }} />
              <PlayerName>{player.name || `Player ${player.index + 1}`}</PlayerName>
            </PlayerInfo>
            <Score>{gameScore[player.index] || 0}</Score>
          </ScoreItem>
        ))}
      </ScoreList>
    </ScoreContainer>
  );
};
