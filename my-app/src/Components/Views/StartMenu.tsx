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
import OnePlayerLandscape from '../../Icons/Layouts/OnePlayerLandscape';
import OnePlayerPortrait from '../../Icons/Layouts/OnePlayerPortrait';
import TwoPlayersOppositeLandscape from '../../Icons/Layouts/TwoPlayersOppositeLandscape';
import TwoPlayersOppositePortrait from '../../Icons/Layouts/TwoPlayersOppositePortrait';
import TwoPlayersSameSide from '../../Icons/Layouts/TwoPlayersSameSide';
import FivePlayers from '../../Icons/Layouts/FivePlayers';
import FourPlayers from '../../Icons/Layouts/FourPlayers';
import FourPlayersSide from '../../Icons/Layouts/FourPlayersSide';
import ThreePlayers from '../../Icons/Layouts/ThreePlayers';
import ThreePlayersSide from '../../Icons/Layouts/ThreePlayersSide';
import FivePlayersSide from '../../Icons/Layouts/FivePlayersSide';
import SixPlayers from '../../Icons/Layouts/SixPlayers';
import SixPlayersSide from '../../Icons/Layouts/SixPlayersSide';

const MainWrapper = styled.div`
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  rotate: -90deg;
  width: 100%;
  height: 100%;
  padding: 5rem;
  min-width: max-content;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  min-width: max-content;
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
        <LayoutWrapper>
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
                  style={{ margin: '0', padding: '0', width: '10%' }}
                  value={GridTemplateAreas.OnePlayerLandscape}
                  control={
                    <Radio
                      icon={<OnePlayerLandscape size="248px" color="black" />}
                      checkedIcon={
                        <OnePlayerLandscape size="248px" color="blue" />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.OnePlayerPortrait}
                  control={
                    <Radio
                      icon={<OnePlayerPortrait size="248px" color="black" />}
                      checkedIcon={
                        <OnePlayerPortrait size="248px" color="blue" />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
              </>
            )}
            {playerOptions.numberOfPlayers === 2 && (
              <>
                <FormControlLabel
                  value={GridTemplateAreas.TwoPlayersOppositeLandscape}
                  control={
                    <Radio
                      icon={
                        <TwoPlayersOppositeLandscape
                          size="248px"
                          color="black"
                        />
                      }
                      checkedIcon={
                        <TwoPlayersOppositeLandscape
                          size="248px"
                          color="blue"
                        />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.TwoPlayersOppositePortrait}
                  control={
                    <Radio
                      icon={
                        <TwoPlayersOppositePortrait
                          size="248px"
                          color="black"
                        />
                      }
                      checkedIcon={
                        <TwoPlayersOppositePortrait size="248px" color="blue" />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.TwoPlayersSameSide}
                  control={
                    <Radio
                      icon={<TwoPlayersSameSide size="248px" color="black" />}
                      checkedIcon={
                        <TwoPlayersSameSide size="248px" color="blue" />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
              </>
            )}
            {playerOptions.numberOfPlayers === 3 && (
              <>
                <FormControlLabel
                  value={GridTemplateAreas.ThreePlayers}
                  control={
                    <Radio
                      icon={<ThreePlayers size="248px" color="black" />}
                      checkedIcon={<ThreePlayers size="248px" color="blue" />}
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.ThreePlayersSide}
                  control={
                    <Radio
                      icon={<ThreePlayersSide size="248px" color="black" />}
                      checkedIcon={
                        <ThreePlayersSide size="248px" color="blue" />
                      }
                      TouchRippleProps={{ style: { display: 'none' } }}
                    />
                  }
                  label=""
                />
              </>
            )}
            {playerOptions.numberOfPlayers === 4 && (
              <>
                <FormControlLabel
                  value={GridTemplateAreas.FourPlayers}
                  control={
                    <Radio
                      icon={<FourPlayers size="248px" color="black" />}
                      checkedIcon={<FourPlayers size="248px" color="blue" />}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.FourPlayersSide}
                  control={
                    <Radio
                      icon={<FourPlayersSide size="248px" color="black" />}
                      checkedIcon={
                        <FourPlayersSide size="248px" color="blue" />
                      }
                    />
                  }
                  label=""
                />
              </>
            )}
            {playerOptions.numberOfPlayers === 5 && (
              <>
                <FormControlLabel
                  value={GridTemplateAreas.FivePlayers}
                  control={
                    <Radio
                      icon={<FivePlayers size="248px" color="black" />}
                      checkedIcon={<FivePlayers size="248px" color="blue" />}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.FivePlayersSide}
                  control={
                    <Radio
                      icon={<FivePlayersSide size="248px" color="black" />}
                      checkedIcon={
                        <FivePlayersSide size="248px" color="blue" />
                      }
                    />
                  }
                  label=""
                />
              </>
            )}
            {playerOptions.numberOfPlayers === 6 && (
              <>
                <FormControlLabel
                  value={GridTemplateAreas.SixPlayers}
                  control={
                    <Radio
                      icon={<SixPlayers size="248px" color="black" />}
                      checkedIcon={<FivePlayers size="248px" color="blue" />}
                    />
                  }
                  label=""
                />
                <FormControlLabel
                  value={GridTemplateAreas.SixPlayersSide}
                  control={
                    <Radio
                      icon={<SixPlayersSide size="248px" color="black" />}
                      checkedIcon={<SixPlayersSide size="248px" color="blue" />}
                    />
                  }
                  label=""
                />
              </>
            )}
          </RadioGroup>
        </LayoutWrapper>
        <hr />
        <hr />
        <hr />
        <button onClick={doStartGame}>Start Game</button>
      </FormControl>
    </MainWrapper>
  );
};

export default Start;