import styled, { css } from 'styled-components';
import SettingsIcon from '../../Icons/SettingsIcon';
import { Rotation } from '../../Types/Player';

export const StyledExtraCounterButton = styled.button<{ rotation: number }>`
  position: relative;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  margin-bottom: -5vmin;
  top: 8px;
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
        margin-bottom: 0;
        top: 0
        margin-right: -5vmin;
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
    <StyledExtraCounterButton onClick={onClick} rotation={rotation}>
      <SettingsIcon size="4vmin" />
    </StyledExtraCounterButton>
  );
};

export default SettingsButton;
