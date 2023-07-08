import styled, { css, keyframes } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const LifeCounterWrapper = styled.div<{
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

export const LifeCounterContentContainer = styled.div<{
  rotation: Rotation;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  z-index: 1;

  ${(props) =>
    css`
      rotate: ${props.rotation}deg;
    `};
`;

export const LifeCountainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

export const LifeCounterText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30vmin;
  text-align: center;
  text-size-adjust: auto;
  margin: 0;
  padding: 0;
  width: 100%;
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

export const RecentDifference = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 5vmin;
  color: #333333;
  animation: ${fadeOut} 3s 1s ease-out forwards;
`;
