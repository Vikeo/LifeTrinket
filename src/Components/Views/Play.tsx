import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Orientation } from '../../Types/Settings';
import { Player } from '../Player/Player';
import { twc } from 'react-twc';

const MainWrapper = twc.div`w-[100dvmax] h-[100dvmin] overflow-hidden`;

export const Play = () => {
  const { players } = usePlayers();
  const { initialGameSettings } = useGlobalSettings();

  let Layout: JSX.Element;
  switch (players.length) {
    case 1:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        Layout = Player(players, 'grid-areas-onePlayerPortrait');
      }
      Layout = Player(players, 'grid-areas-onePlayerLandscape');
      break;
    case 2:
      switch (initialGameSettings?.orientation) {
        case Orientation.Portrait:
          Layout = Player(players, 'grid-areas-twoPlayersOppositePortrait');
          break;
        default:
        case Orientation.Landscape:
          Layout = Player(players, 'grid-areas-twoPlayersSameSideLandscape');
          break;
        case Orientation.OppositeLandscape:
          Layout = Player(players, 'grid-areas-twoPlayersOppositeLandscape');
          break;
      }
      break;
    case 3:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        Layout = Player(players, 'grid-areas-threePlayersSide');
        break;
      }
      Layout = Player(players, 'grid-areas-threePlayers');
      break;
    default:
    case 4:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        Layout = Player(players, 'grid-areas-fourPlayerPortrait');
        break;
      }
      Layout = Player(players, 'grid-areas-fourPlayer');
      break;
    case 5:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        Layout = Player(players, 'grid-areas-fivePlayersSide');
        break;
      }
      Layout = Player(players, 'grid-areas-fivePlayers');
      break;
    case 6:
      if (initialGameSettings?.orientation === Orientation.Portrait) {
        Layout = Player(players, 'grid-areas-sixPlayersSide');
        break;
      }
      Layout = Player(players, 'grid-areas-sixPlayers');
      break;
  }

  return <MainWrapper>{Layout}</MainWrapper>;
};
