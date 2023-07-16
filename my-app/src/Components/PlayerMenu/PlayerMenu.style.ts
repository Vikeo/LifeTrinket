import styled, { css } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const PlayerMenuWrapper = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
  z-index: 2;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return;
    }
    return css`
      rotate: ${props.rotation}deg;
    `;
  }};
`;

export const SettingsContainer = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 2vmin;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: row;
      `;
    }
  }}
`;

export const SettingsSection = styled.div<{}>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Input = styled.input`
  min-height: 10vmax;
  min-width: 10vmax;

  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
`;

export const CloseButton = styled.button<{
  rotation: Rotation;
}>`
  align-self: flex-end;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation - 180}deg;
      `;
    }
  }}
`;

export const Button = styled.button<{
  rotation: Rotation;
}>`
  cursor: pointer;
  user-select: none;
  color: #000000;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation - 180}deg;
      `;
    }
  }}
`;
