import styled, { css } from 'styled-components';
import { Skull } from '../../Icons/generated';
import { Rotation } from '../../Types/Player';

export const LoseButton = styled.button<{ rotation: Rotation }>`
  position: absolute;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  top: 25%;
  right: 15%;
  background-color: #43434380;
  border-radius: 8px;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  z-index: 1;

  ${(props) => {
    if (props.rotation === Rotation.SideFlipped) {
      return css`
        right: auto;
        top: 15%;
        left: 27%;
        rotate: ${props.rotation}deg;
      `;
    } else if (props.rotation === Rotation.Side) {
      return css`
        right: auto;
        top: 15%;
        left: 27%;
        rotate: ${props.rotation - 180}deg;
      `;
    }
  }}
`;

type LoseButtonProps = {
  onClick: () => void;
  rotation: Rotation;
};

export const LoseGameButton = ({ rotation, onClick }: LoseButtonProps) => {
  return (
    <LoseButton rotation={rotation} onClick={onClick}>
      <Skull size="5vmin" color="black" opacity={0.5} />
    </LoseButton>
  );
};
