import { useEffect } from 'react';
import { twc } from 'react-twc';
import { twGridTemplateAreas } from '../../../tailwind.config';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Orientation, PreStartMode } from '../../Types/Settings';
import { Players } from '../Players/Players';
import { PreStart } from '../PreStartGame/PreStart';

const MainWrapper = twc.div`w-[100dvmax] h-[100dvmin] overflow-hidden, setPlayers`;

type GridTemplateAreasKeys = keyof typeof twGridTemplateAreas;

export type GridLayout = `grid-areas-${GridTemplateAreasKeys}`;

export const Play = () => {
  const { players, setPlayers } = usePlayers();
  const { initialGameSettings, playing, settings, preStartCompleted, swapMode, selectedPlayersForSwap, setSwapMode } =
    useGlobalSettings();

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

  return (
    <MainWrapper>
      {players.length > 1 &&
        !preStartCompleted &&
        settings.preStartMode !== PreStartMode.None &&
        !playing &&
        settings.showStartingPlayer && <PreStart />}

      {swapMode && (
        <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 p-4 flex flex-col items-center justify-center gap-2">
          <div className="text-white text-xl font-bold">
            Swap Player Lives
          </div>
          <div className="text-white text-sm text-center">
            Select two players to swap their life totals
            <br />
            ({selectedPlayersForSwap.length}/2 selected)
          </div>
          <button
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-bold"
            onClick={() => setSwapMode(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <Players gridLayout={gridLayout} />
    </MainWrapper>
  );
};
