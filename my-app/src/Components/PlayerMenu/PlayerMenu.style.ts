import styled, { css } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const PlayerMenuWrapper = styled.div<{
  rotation: Rotation;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 40, 40, 0.9);
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
  }}
`;

export const SettingsContainer = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0.5rem;
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

export const Label = styled.label<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
  color: #ffffff;
  font-size: 2vmin;
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

export const Input = styled.input`
  width: 5vmin;
  height: 5vmin;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
`;

export const Button = styled.button<{
  rotation: Rotation;
}>`
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
