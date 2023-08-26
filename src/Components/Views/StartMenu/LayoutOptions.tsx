import React from 'react';
import styled from 'styled-components';
import { GridTemplateAreas } from '../../../Data/GridTemplateAreas';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { theme } from '../../../Data/theme';
import {
  OnePlayerPortrait,
  TwoPlayersOppositeLandscape,
  TwoPlayersOppositePortrait,
  ThreePlayers,
  ThreePlayersSide,
  FourPlayers,
  FourPlayersSide,
  FivePlayers,
  SixPlayers,
  TwoPlayersSameSide,
} from '../../../Icons/generated/Layouts';
import OnePlayerLandscape from '../../../Icons/generated/Layouts/OnePlayerLandscape';

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
  const iconHeight = '33vmin';
  const iconWidth = '20vmin';

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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <OnePlayerLandscape
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <OnePlayerPortrait
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersOppositeLandscape
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersOppositePortrait
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <TwoPlayersSameSide
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <ThreePlayers
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <ThreePlayersSide
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FourPlayers
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FourPlayersSide
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FivePlayers
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                                            height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <FivePlayersSide
                                            height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <SixPlayers
                      height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
                                            height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.secondary.main}
                    />
                  }
                  checkedIcon={
                    <SixPlayersSide
                                            height={iconHeight}
                      width={iconWidth}
                      fill={theme.palette.primary.main}
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
        onChange={(_e, value) => {
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
