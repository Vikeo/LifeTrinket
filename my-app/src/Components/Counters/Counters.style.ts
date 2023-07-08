import styled from 'styled-components';

export const CountersWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const CountersGrid = styled.div<{ gridTemplateAreas: string }>`
  display: grid;
  gap: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
`;

export const GridItemContainer = styled.div<{
  gridArea: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  grid-area: ${(props) => props.gridArea};
`;

export const ExtraCountersGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;
