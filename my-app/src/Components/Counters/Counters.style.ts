import styled from "styled-components";

export const CountersWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:   #4f4f4f;
`;

export const CountersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
`;

export const GridItemContainer = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;
