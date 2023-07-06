import styled from 'styled-components';

export const CountersWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  background-color: black;
`;

export const CountersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  row-gap: 4px;
  column-gap: 4px;
`;

export const GridItemContainer = styled.div`
  display: flex;
  width: calc(50vmax - 2px);
  height: calc(50vmin - 2px);
  justify-content: center;
  align-items: center;
`;

export const GridItemContainerFlipped = styled.div`
  display: flex;
  width: calc(50vmax - 2px);
  height: calc(50vmin - 2px);
  justify-content: center;
  align-items: center;
  transform: rotate(180deg);
`;

export const ExtraCountersGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;
