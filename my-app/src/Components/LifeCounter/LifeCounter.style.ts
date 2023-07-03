import styled from 'styled-components';

export const LifeCounterWrapper = styled.div<{ backgroundColor?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor || 'antiquewhite'};
`;

export const LifeCounterContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  font-size: 30vh;
  text-align: center;
  text-size-adjust: auto;
  margin: 0;
  padding: 0;
  width: 100%;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
  text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff,
    1px 1px 0 #ffffff;
  color: #000000;
`;

export const ExtraCountersGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;
