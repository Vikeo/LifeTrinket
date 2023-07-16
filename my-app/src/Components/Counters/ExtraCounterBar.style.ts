import styled, { css } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const ExtraCountersGrid = styled.div<{ rotation: number }>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
        height: 100%;
        width: auto;
      `;
    }
  }}
`;
