import { useEffect, useState } from 'react';
import { twc } from 'react-twc';
import { twGridTemplateAreas } from '../../../tailwind.config';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Orientation, PreStartMode } from '../../Types/Settings';
import { Players } from '../Players/Players';
import { PreStart } from '../PreStartGame/PreStart';
import { GameOver } from '../GameOver/GameOver';
import { ScoreDisplay } from '../ScoreDisplay/ScoreDisplay';

const MainWrapper = twc.div`w-[100dvmax] h-[100dvmin] overflow-hidden, setPlayers`;

type GridTemplateAreasKeys = keyof typeof twGridTemplateAreas;

export type GridLayout = `grid-areas-${GridTemplateAreasKeys}`;

export const Play = () => {
  const { players, setPlayers, resetCurrentGame, setStartingPlayerIndex } = usePlayers();
  const { initialGameSettings, playing, settings, preStartCompleted, gameScore, setGameScore } =
    useGlobalSettings();
  const [showGameOver, setShowGameOver] = useState(false);

  let gridLayout: GridLayout;
  switch (players.length) {
    case 1:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        gridLayout = 'grid-areas-onePlayerPortrait';
      }
      gridLayout = 'grid-areas-onePlayerLandscape';
      break;
    case 2:
      switch (initialGameSettings?.orientation) {
        case Orientation.Portrait:
          gridLayout = 'grid-areas-twoPlayersOppositePortrait';
          break;
        default:
        case Orientation.Landscape:
          gridLayout = 'grid-areas-twoPlayersSameSideLandscape';
          break;
        case Orientation.OppositeLandscape:
          gridLayout = 'grid-areas-twoPlayersOppositeLandscape';
          break;
      }
      break;
    case 3:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        gridLayout = 'grid-areas-threePlayersSide';
        break;
      }
      gridLayout = 'grid-areas-threePlayers';
      break;
    default:
    case 4:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        gridLayout = 'grid-areas-fourPlayerPortrait';
        break;
      }
      gridLayout = 'grid-areas-fourPlayer';
      break;
    case 5:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        gridLayout = 'grid-areas-fivePlayersSide';
        break;
      }
      gridLayout = 'grid-areas-fivePlayers';
      break;
    case 6:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        gridLayout = 'grid-areas-sixPlayersSide';
        break;
      }
      gridLayout = 'grid-areas-sixPlayers';
      break;
  }

  useEffect(() => {
    if (settings.preStartMode !== PreStartMode.None) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * players.length);

    setPlayers(
      players.map((p) =>
        p.index === randomIndex
          ? {
              ...p,
              isStartingPlayer: true,
            }
          : {
              ...p,
              isStartingPlayer: false,
            }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for game over in 1v1 games
  useEffect(() => {
    if (players.length !== 2 || showGameOver) {
      return;
    }

    const playersLost = players.filter((p) => p.hasLost);

    // Only show game over if exactly one player has lost
    if (playersLost.length === 1) {
      setShowGameOver(true);
    }
  }, [players, showGameOver]);

  const handleWinnerSelected = (winnerIndex: number) => {
    // Update score
    const newScore = { ...gameScore };
    newScore[winnerIndex] = (newScore[winnerIndex] || 0) + 1;
    setGameScore(newScore);

    // Set the loser as the starting player for next game
    const loserIndex = players.find((p) => p.index !== winnerIndex)?.index ?? 0;
    setStartingPlayerIndex(loserIndex);

    // Reset game
    resetCurrentGame();
    setShowGameOver(false);
  };

  return (
    <MainWrapper>
      {players.length > 1 &&
        !preStartCompleted &&
        settings.preStartMode !== PreStartMode.None &&
        !playing &&
        settings.showStartingPlayer && <PreStart />}

      <Players gridLayout={gridLayout} />

      {players.length === 2 && <ScoreDisplay players={players} gameScore={gameScore} />}

      {showGameOver && (
        <GameOver players={players} onWinnerSelected={handleWinnerSelected} />
      )}
    </MainWrapper>
  );
};
