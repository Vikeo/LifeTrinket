import React from 'react';
import styled from 'styled-components';
import { GridTemplateAreas } from '../../../Data/GridTemplateAreas';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import OnePlayerLandscape from '../../../Icons/Layouts/OnePlayerLandscape';
import OnePlayerPortrait from '../../../Icons/Layouts/OnePlayerPortrait';
import TwoPlayersOppositeLandscape from '../../../Icons/Layouts/TwoPlayersOppositeLandscape';
import TwoPlayersOppositePortrait from '../../../Icons/Layouts/TwoPlayersOppositePortrait';
import TwoPlayersSameSide from '../../../Icons/Layouts/TwoPlayersSameSide';
import FivePlayers from '../../../Icons/Layouts/FivePlayers';
import FourPlayers from '../../../Icons/Layouts/FourPlayers';
import FourPlayersSide from '../../../Icons/Layouts/FourPlayersSide';
import ThreePlayers from '../../../Icons/Layouts/ThreePlayers';
import ThreePlayersSide from '../../../Icons/Layouts/ThreePlayersSide';
import SixPlayers from '../../../Icons/Layouts/SixPlayers';
import { theme } from '../../../Data/theme';

const LayoutWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
`;

type LayoutOptionsProps = {
  numberOfPlayers: number;
  gridAreas: GridTemplateAreas;
  onChange: (gridAreas: GridTemplateAreas) => void;
};

const LayoutOptions: React.FC<LayoutOptionsProps> = ({
  numberOfPlayers,
  gridAreas,
  onChange,
}) => {
  const iconSize = '33vmin';

  const renderLayoutOptions = () => {
    switch (numberOfPlayers) {
      case 1:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.OnePlayerLandscape}
              control={
                <Radio
                  icon={
                    <OnePlayerLandscape
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <OnePlayerLandscape
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
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
                  icon={
                    <OnePlayerPortrait
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <OnePlayerPortrait
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
          </>
        );
      case 2:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.TwoPlayersOppositeLandscape}
              control={
                <Radio
                  icon={
                    <TwoPlayersOppositeLandscape
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersOppositeLandscape
                      size={iconSize}
                      color={theme.palette.primary.main}
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
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersOppositePortrait
                      size={iconSize}
                      color={theme.palette.primary.main}
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
                    <TwoPlayersSameSide
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersSameSide
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
          </>
        );
      case 3:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.ThreePlayers}
              control={
                <Radio
                  icon={
                    <ThreePlayers
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <ThreePlayers
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
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
                  icon={
                    <ThreePlayersSide
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <ThreePlayersSide
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
          </>
        );

      case 4:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.FourPlayers}
              control={
                <Radio
                  icon={
                    <FourPlayers
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FourPlayers
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
            <FormControlLabel
              value={GridTemplateAreas.FourPlayersSide}
              control={
                <Radio
                  icon={
                    <FourPlayersSide
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FourPlayersSide
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
          </>
        );

      case 5:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.FivePlayers}
              control={
                <Radio
                  icon={
                    <FivePlayers
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FivePlayers
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
            {/* <FormControlLabel
              value={GridTemplateAreas.FivePlayersSide}
              control={
                <Radio
                  icon={
                    <FivePlayersSide
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FivePlayersSide
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            /> */}
          </>
        );

      case 6:
        return (
          <>
            <FormControlLabel
              value={GridTemplateAreas.SixPlayers}
              control={
                <Radio
                  icon={
                    <SixPlayers
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <SixPlayers
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            />
            {/* <FormControlLabel
              value={GridTemplateAreas.SixPlayersSide}
              control={
                <Radio
                  icon={
                    <SixPlayersSide
                      size={iconSize}
                      color={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <SixPlayersSide
                      size={iconSize}
                      color={theme.palette.primary.main}
                    />
                  }
                  TouchRippleProps={{ style: { display: 'none' } }}
                />
              }
              label=""
            /> */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <LayoutWrapper>
      <RadioGroup
        row
        onChange={(e, value) => {
          onChange(value as GridTemplateAreas);
        }}
        value={gridAreas}
        style={{ justifyContent: 'center' }}
      >
        {renderLayoutOptions()}
      </RadioGroup>
    </LayoutWrapper>
  );
};

export default LayoutOptions;
