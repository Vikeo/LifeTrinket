import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../Data/theme';
import {
  FivePlayers,
  FourPlayers,
  FourPlayersSide,
  OnePlayerPortrait,
  SixPlayers,
  ThreePlayers,
  ThreePlayersSide,
  TwoPlayersOppositeLandscape,
  TwoPlayersOppositePortrait,
  TwoPlayersSameSide,
} from '../../../Icons/generated/Layouts';

import OnePlayerLandscape from '../../../Icons/generated/Layouts/OnePlayerLandscape';
import { Orientation } from '../../../Types/Settings';

const LayoutWrapper = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
`;

type LayoutOptionsProps = {
  numberOfPlayers: number;
  selectedOrientation: Orientation;
  onChange: (orientation: Orientation) => void;
};

export const LayoutOptions: React.FC<LayoutOptionsProps> = ({
  numberOfPlayers,
  selectedOrientation,
  onChange,
}) => {
  const iconHeight = '30vmin';
  const iconWidth = '20vmin';

  const renderLayoutOptions = () => {
    switch (numberOfPlayers) {
      case 1:
        return (
          <>
            <FormControlLabel
              value={Orientation.Landscape}
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
              value={Orientation.Portrait}
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
              value={Orientation.Landscape}
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
            <FormControlLabel
              value={Orientation.Portrait}
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
              value={Orientation.OppositeLandscape}
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
          </>
        );
      case 3:
        return (
          <>
            <FormControlLabel
              value={Orientation.Landscape}
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
              value={Orientation.Portrait}
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
              value={Orientation.Landscape}
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
              value={Orientation.Portrait}
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
              value={Orientation.Landscape}
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
              value={Orientation.Landscape}
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
          onChange(value as Orientation);
        }}
        value={selectedOrientation}
        style={{ justifyContent: 'center' }}
      >
        {renderLayoutOptions()}
      </RadioGroup>
    </LayoutWrapper>
  );
};
