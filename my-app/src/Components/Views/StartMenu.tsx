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

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainWrapper = styled.div`
  padding-top: 58px;
  padding-bottom: 58px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const LayoutWrapper = styled.div`
  flex-direction: row;
  display: flex;
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
    <Wrapper>
      <MainWrapper>
        <FormControl style={{ width: '80vw' }}>
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
                    value={GridTemplateAreas.OnePlayerLandscape}
                    control={
                      <Radio
                        icon={
                          <OnePlayerLandscape size="20vmax" color="black" />
                        }
                        checkedIcon={
                          <OnePlayerLandscape size="20vmax" color="blue" />
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
                        icon={<OnePlayerPortrait size="20vmax" color="black" />}
                        checkedIcon={
                          <OnePlayerPortrait size="20vmax" color="blue" />
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
                            size="20vmax"
                            color="black"
                          />
                        }
                        checkedIcon={
                          <TwoPlayersOppositeLandscape
                            size="20vmax"
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
                            size="20vmax"
                            color="black"
                          />
                        }
                        checkedIcon={
                          <TwoPlayersOppositePortrait
                            size="20vmax"
                            color="blue"
                          />
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
                        icon={
                          <TwoPlayersSameSide size="20vmax" color="black" />
                        }
                        checkedIcon={
                          <TwoPlayersSameSide size="20vmax" color="blue" />
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
                        icon={<ThreePlayers size="20vmax" color="black" />}
                        checkedIcon={
                          <ThreePlayers size="20vmax" color="blue" />
                        }
                        TouchRippleProps={{ style: { display: 'none' } }}
                      />
                    }
                    label=""
                  />
                  <FormControlLabel
                    value={GridTemplateAreas.ThreePlayersSide}
                    control={
                      <Radio
                        icon={<ThreePlayersSide size="20vmax" color="black" />}
                        checkedIcon={
                          <ThreePlayersSide size="20vmax" color="blue" />
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
                        icon={<FourPlayers size="20vmax" color="black" />}
                        checkedIcon={<FourPlayers size="20vmax" color="blue" />}
                      />
                    }
                    label=""
                  />
                  <FormControlLabel
                    value={GridTemplateAreas.FourPlayersSide}
                    control={
                      <Radio
                        icon={<FourPlayersSide size="20vmax" color="black" />}
                        checkedIcon={
                          <FourPlayersSide size="20vmax" color="blue" />
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
                        icon={<FivePlayers size="20vmax" color="black" />}
                        checkedIcon={<FivePlayers size="20vmax" color="blue" />}
                      />
                    }
                    label=""
                  />
                  <FormControlLabel
                    value={GridTemplateAreas.FivePlayersSide}
                    control={
                      <Radio
                        icon={<FivePlayersSide size="20vmax" color="black" />}
                        checkedIcon={
                          <FivePlayersSide size="20vmax" color="blue" />
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
                        icon={<SixPlayers size="20vmax" color="black" />}
                        checkedIcon={<FivePlayers size="20vmax" color="blue" />}
                      />
                    }
                    label=""
                  />
                  <FormControlLabel
                    value={GridTemplateAreas.SixPlayersSide}
                    control={
                      <Radio
                        icon={<SixPlayersSide size="20vmax" color="black" />}
                        checkedIcon={
                          <SixPlayersSide size="20vmax" color="blue" />
                        }
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
    </Wrapper>
  );
};

export default Start;
