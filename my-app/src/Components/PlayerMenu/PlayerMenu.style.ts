import styled from 'styled-components';

export const PlayerMenuWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 40, 40, 0.9);
  z-index: 2;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 70%;
  padding: 1rem;
  gap: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
  color: #ffffff;
  font-size: 2vh;
`;

export const Input = styled.input`
  width: 5vh;
  height: 5vh;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  color: #ffffff;
`;
