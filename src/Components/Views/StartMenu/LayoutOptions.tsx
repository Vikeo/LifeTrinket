import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { theme } from '../../../Data/theme';
import {
  FivePlayers,
  FivePlayersSide,
  FourPlayers,
  FourPlayersSide,
  OnePlayerPortrait,
  SixPlayers,
  SixPlayersSide,
  ThreePlayers,
  ThreePlayersSide,
  TwoPlayersOppositeLandscape,
  TwoPlayersOppositePortrait,
  TwoPlayersSameSide,
} from '../../../Icons/generated/Layouts';

import { twc } from 'react-twc';
import OnePlayerLandscape from '../../../Icons/generated/Layouts/OnePlayerLandscape';
import { Orientation } from '../../../Types/Settings';

const LayoutWrapper = twc.div`flex flex-row justify-center items-center self-center w-full`;

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
  const iconWidth = '21vmin';
  const iconHeight = '40vmin';
  const iconMaxWidth = '124px';
  const iconMaxHeight = '196px';

  const renderLayoutOptions = () => {
    switch (numberOfPlayers) {
      case 1:
        return (
          <div>
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
                />
              }
              label=""
            />
          </div>
        );
      case 2:
        return (
          <>
            <FormControlLabel
              value={Orientation.Landscape}
              control={
                <Radio
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
            <FormControlLabel
              value={Orientation.Portrait}
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
            />
          </>
        );

      case 6:
        return (
          <>
            <FormControlLabel
              value={Orientation.Landscape}
              control={
                <Radio
                  style={{ maxWidth: iconMaxWidth, maxHeight: iconMaxHeight }}
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
            <FormControlLabel
              value={Orientation.Portrait}
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
            />
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
