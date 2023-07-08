import styled, { css, keyframes } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const SideLifeCounterWrapper = styled.div<{
  backgroundColor: string;
}>`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.backgroundColor || 'antiquewhite'};
`;

export const SideLifeCounterContentContainer = styled.div<{
  rotation: Rotation;
}>`
  position: relative;
  display: flex;
  flex-direction: row;

  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;

  ${(props) => {
    if (props.rotation === Rotation.SideFlipped) {
      return css`
        rotate: 180deg;
      `;
    }
  }}
`;

export const SideLifeCountainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SideLifeCounterText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  font-size: 30vmin;
  text-align: center;
  text-size-adjust: auto;
  margin: 0;
  padding: 0;
  rotate: 270deg;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff,
    1px 1px 0 #ffffff;
  color: #000000;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  33% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
`;

export const SideRecentDifference = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  translate: -50%, -50%;
  text-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 5vmin;
  color: #333333;
  animation: ${fadeOut} 3s 1s ease-out forwards;
`;
