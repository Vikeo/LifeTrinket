import styled from "styled-components";


//LifeCounterWrapper with a background color variable:
export const LifeCounterWrapper = styled.div<{ backgroundColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || "antiquewhite"};
  border-radius: 10px;

`;

export const LifeCounterButton = styled.button`
  width: 100%;
  height: 100%;
  font-size: 5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const LifeCounterText = styled.p`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;

`;



