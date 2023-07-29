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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 2vmin;
  height: 100%;
  width: 100%;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: row;
        padding-top: 36px;
      `;
    } else {
      return css`
        padding-top: 36px;
      `;
    }
  }}
`;

export const SettingsSection = styled.div<{ rotation: Rotation }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 0.5rem;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

export const ColorPicker = styled.input<{
  rotation: Rotation;
}>`
  position: absolute;
  top: 5%;
  left: 5%;
  height: 8vmax;
  width: 8vmax;

  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;

  ${(props) => {
    if (props.rotation === Rotation.Side) {
      return css`
        rotate: ${props.rotation - 180}deg;
        bottom: 5%;
        top: auto;
      `;
    } else if (props.rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: 5%;
        left: auto;
        right: 5%;
      `;
    }
  }}
`;

export const CloseButton = styled.button<{
  rotation: Rotation;
}>`
  position: absolute;
  top: 5%;
  right: 5%;
  cursor: pointer;
  user-select: none;
  color: black;
  ${(props) => {
    if (props.rotation === Rotation.Side) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: 5%;
        right: auto;
        left: 5%;
      `;
    } else if (props.rotation === Rotation.SideFlipped) {
      return css`
        rotate: ${props.rotation - 180}deg;
        top: auto;
        left: auto;
        bottom: 5%;
        right: 5%;
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
        rotate: ${props.rotation + 90}deg;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
        text-orientation: sideways;
      `;
    }
  }}
`;
