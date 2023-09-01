import styled from 'styled-components';
import { css } from 'styled-components';
import { Rotation } from '../../Types/Player';
import { Cog } from '../../Icons/generated';

export const StyledSettingsButton = styled.button<{ rotation: number }>`
  position: absolute;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  top: 25%;
  right: 1vmax;
  background-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  z-index: 1;
  ${(props) => {
    if (
      props.rotation === Rotation.Side ||
      props.rotation === Rotation.SideFlipped
    ) {
      return css`
        right: auto;
        top: 1vmax;
        left: 27%;
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
      <Cog size="5vmin" color="black" opacity="0.3" />
    </StyledSettingsButton>
  );
};

export default SettingsButton;
