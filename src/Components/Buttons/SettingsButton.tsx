import styled, { css } from 'styled-components/macro';
import SettingsIcon from '../../Icons/SettingsIcon';
import { Rotation } from '../../Types/Player';

export const StyledSettingsButton = styled.button<{ rotation: number }>`
  position: absolute;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  top: 12vmin;
  right: 1vmax;
  background-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  ${(props) => {
    if (
      props.rotation === Rotation.Side ||
      props.rotation === Rotation.SideFlipped
    ) {
      return css`
        right: auto;
        top: 1vmax;
        left: 12vmin;
      `;
    }
  }}
`;

type SettingsButtonProps = {
  onClick: () => void;
  rotation: number;
};

const SettingsButton = ({ onClick, rotation }: SettingsButtonProps) => {
  return (
    <StyledSettingsButton onClick={onClick} rotation={rotation}>
      <SettingsIcon size="5vmin" />
    </StyledSettingsButton>
  );
};

export default SettingsButton;
