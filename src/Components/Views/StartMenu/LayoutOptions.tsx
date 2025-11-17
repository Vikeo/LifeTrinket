import { twc } from 'react-twc';
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
import OnePlayerLandscape from '../../../Icons/generated/Layouts/OnePlayerLandscape';
import { Orientation } from '../../../Types/Settings';

const LayoutsRadioGroup = twc.div`flex flex-row justify-center items-center gap-4 self-center w-full`;

const Label = twc.label`flex flex-row relative max-w-[118px] hover:bg-white/[0.03] rounded-2xl cursor-pointer`;

const Input = twc.input`peer sr-only`;

const IconWrapper = twc(
  'div'
)`peer-checked:fill-primary-main fill-primary-dark max-h-[200px] h-[40vmin] w-[21vmin]`;

type LayoutOptionsProps = {
  numberOfPlayers: number;
  selectedOrientation: Orientation;
  onChange: (orientation: Orientation) => void;
};

export const LayoutOptions = ({
  numberOfPlayers,
  selectedOrientation,
  onChange,
}: LayoutOptionsProps) => {
  switch (numberOfPlayers) {
    case 1:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <OnePlayerLandscape className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <OnePlayerPortrait className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );
    case 2:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <TwoPlayersSameSide className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <TwoPlayersOppositePortrait className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label
            htmlFor={`${numberOfPlayers}p-${Orientation.OppositeLandscape}`}
          >
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.OppositeLandscape}`}
              checked={selectedOrientation === Orientation.OppositeLandscape}
              value={Orientation.OppositeLandscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <TwoPlayersOppositeLandscape className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );
    case 3:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <ThreePlayers className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <ThreePlayersSide className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );

    case 4:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <FourPlayers className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <FourPlayersSide className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );

    case 5:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <FivePlayers className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <FivePlayersSide className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );

    case 6:
      return (
        <LayoutsRadioGroup>
          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Landscape}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Landscape}`}
              checked={selectedOrientation === Orientation.Landscape}
              value={Orientation.Landscape}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <SixPlayers className="w-full h-full" />
            </IconWrapper>
          </Label>

          <Label htmlFor={`${numberOfPlayers}p-${Orientation.Portrait}`}>
            <Input
              type="radio"
              id={`${numberOfPlayers}p-${Orientation.Portrait}`}
              checked={selectedOrientation === Orientation.Portrait}
              value={Orientation.Portrait}
              onChange={(e) => onChange(e.target.value as Orientation)}
            />
            <IconWrapper>
              <SixPlayersSide className="w-full h-full" />
            </IconWrapper>
          </Label>
        </LayoutsRadioGroup>
      );

    default:
      return null;
  }
};
