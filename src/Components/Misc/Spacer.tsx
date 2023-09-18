import styled from 'styled-components';

export const Spacer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
