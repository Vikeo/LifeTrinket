import { Button, FormControl, FormLabel, Switch } from '@mui/material';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { GridTemplateAreas } from '../../../Data/GridTemplateAreas';
import {
  InitialSettings,
  createInitialPlayers,
} from '../../../Data/getInitialPlayers';
import { Player } from '../../../Types/Player';
import LayoutOptions from './LayoutOptions';
import { SupportMe } from '../../Misc/SupportMe';
import { H2 } from '../../Misc/TextComponents';

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-bottom: 58px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const playerMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
];

const healthMarks = [
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 40,
    label: '40',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 60,
    label: '60',
  },
];

type StartProps = {
  setInitialGameSettings: (options: InitialSettings) => void;
  setPlayers: (updatedPlayer: Player[]) => void;
  initialGameSettings: InitialSettings | null;
};

const Start = ({
  initialGameSettings,
  setPlayers,
  setInitialGameSettings,
}: StartProps) => {
  const [playerOptions, setPlayerOptions] = useState<InitialSettings>(
    initialGameSettings || {
      numberOfPlayers: 4,
      startingLifeTotal: 40,
      useCommanderDamage: true,
      gridAreas: GridTemplateAreas.FourPlayers,
    }
  );
  const doStartGame = () => {
    if (!initialGameSettings) {
      return;
    }
    setInitialGameSettings(initialGameSettings);
    setPlayers(createInitialPlayers(initialGameSettings));
  };

  useEffect(() => {
    setInitialGameSettings(playerOptions);
  }, [playerOptions, setInitialGameSettings]);

  const valuetext = (value: number) => {
    return `${value}°C`;
  };

  const getDefaultLayout = (numberOfPlayers: number) => {
    switch (numberOfPlayers) {
      case 1:
        return GridTemplateAreas.OnePlayerLandscape;
      case 2:
        return GridTemplateAreas.TwoPlayersOppositeLandscape;
      case 3:
        return GridTemplateAreas.ThreePlayers;
      case 4:
        return GridTemplateAreas.FourPlayers;
      case 5:
        return GridTemplateAreas.FivePlayers;
      case 6:
        return GridTemplateAreas.SixPlayers;
      default:
        return GridTemplateAreas.FourPlayers;
    }
  };

  useEffect(() => {
    const defaultLayout = getDefaultLayout(playerOptions.numberOfPlayers);

    setPlayerOptions({
      ...playerOptions,
      gridAreas: defaultLayout,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOptions.numberOfPlayers]);

  return (
    <MainWrapper>
      <H2>Game Setup</H2>
      <FormControl focused={false} style={{ width: '80vw' }}>
        <FormLabel>Number of Players</FormLabel>
        <Slider
          title="Number of Players"
          max={6}
          min={1}
          aria-label="Custom marks"
          defaultValue={4}
          getAriaValueText={valuetext}
          step={null}
          marks={playerMarks}
          onChange={(e, value) => {
            setPlayerOptions({
              ...playerOptions,
              numberOfPlayers: value as number,
            });
          }}
        />
        <FormLabel>Starting Health</FormLabel>
        <Slider
          title="Starting Health"
          max={60}
          min={20}
          aria-label="Custom marks"
          defaultValue={40}
          getAriaValueText={valuetext}
          step={10}
          marks={healthMarks}
          onChange={(e, value) =>
            setPlayerOptions({
              ...playerOptions,
              startingLifeTotal: value as number,
            })
          }
        />
        <FormLabel>Commander</FormLabel>
        <Switch
          checked={playerOptions.useCommanderDamage}
          defaultChecked
          onChange={(e, value) =>
            setPlayerOptions({
              ...playerOptions,
              useCommanderDamage: value,
            })
          }
        />

        <FormLabel>Layout</FormLabel>

        <LayoutOptions
          numberOfPlayers={playerOptions.numberOfPlayers}
          gridAreas={playerOptions.gridAreas}
          onChange={(gridAreas) =>
            setPlayerOptions({ ...playerOptions, gridAreas })
          }
        />
        <Button
          style={{ marginTop: '24px' }}
          size="large"
          variant="contained"
          onClick={doStartGame}
        >
          Start Game
        </Button>
      </FormControl>
      <SupportMe />
    </MainWrapper>
  );
};

export default Start;
