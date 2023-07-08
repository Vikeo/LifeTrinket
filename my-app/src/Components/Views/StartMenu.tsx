import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridTemplateAreas } from '../../Data/getGridTemplateAreas';
import {
  createInitialPlayers,
  InitialSettings,
} from '../../Data/getInitialPlayers';
import { Player } from '../../Types/Player';
import Slider from '@mui/material/Slider';
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';

const MainWrapper = styled.div`
  width: 100vmax;
  height: 100vmin;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: auto;
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

  return (
    <MainWrapper>
      <FormControl style={{ minWidth: '80%' }}>
        <FormLabel>Number of Players</FormLabel>
        <Slider
          title="Number of Players"
          max={6}
          min={1}
          aria-label="Custom marks"
          defaultValue={4}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
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
          valueLabelDisplay="auto"
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
        <RadioGroup
          row
          onChange={(e, value) =>
            setPlayerOptions({
              ...playerOptions,
              gridAreas: value as GridTemplateAreas,
            })
          }
        >
          {playerOptions.numberOfPlayers === 1 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.OnePlayerHorizontal}
                control={<Radio />}
                label="Horizontal"
              />
              <FormControlLabel
                value={GridTemplateAreas.OnePlayerVertical}
                control={<Radio />}
                label="Vertical"
              />
            </>
          )}
          {playerOptions.numberOfPlayers === 2 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.TwoPlayersOppositeHorizontal}
                control={<Radio />}
                label="Opposite Horizontal"
              />
              <FormControlLabel
                value={GridTemplateAreas.TwoPlayersOppositeVertical}
                control={<Radio />}
                label="Opposite Vertical"
              />
              <FormControlLabel
                value={GridTemplateAreas.TwoPlayersSameSide}
                control={<Radio />}
                label="Same Side"
              />
            </>
          )}
          {playerOptions.numberOfPlayers === 3 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.ThreePlayers}
                control={<Radio />}
                label="Three Players"
              />
              <FormControlLabel
                value={GridTemplateAreas.ThreePlayersSide}
                control={<Radio />}
                label="Three Players Side"
              />
            </>
          )}
          {playerOptions.numberOfPlayers === 4 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.FourPlayers}
                control={<Radio />}
                label="Four Players"
              />
              <FormControlLabel
                value={GridTemplateAreas.FourPlayersSide}
                control={<Radio />}
                label="Four Players Side"
              />
            </>
          )}
          {playerOptions.numberOfPlayers === 5 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.FivePlayers}
                control={<Radio />}
                label="Five Players"
              />
              <FormControlLabel
                value={GridTemplateAreas.FivePlayersSide}
                control={<Radio />}
                label="Five Players Side"
              />
            </>
          )}
          {playerOptions.numberOfPlayers === 6 && (
            <>
              <FormControlLabel
                value={GridTemplateAreas.SixPlayers}
                control={<Radio />}
                label="Six Players"
              />
              <FormControlLabel
                value={GridTemplateAreas.SixPlayersSide}
                control={<Radio />}
                label="Six Players Side"
              />
            </>
          )}
        </RadioGroup>
        <hr />
        <hr />
        <hr />
        <button onClick={doStartGame}>Start Game</button>
      </FormControl>
    </MainWrapper>
  );
};

export default Start;
