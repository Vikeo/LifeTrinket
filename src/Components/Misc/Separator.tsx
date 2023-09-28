import styled from 'styled-components';
import { Spacer } from './Spacer';

const SeparatorContainer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #00000025;
  border-radius: 50px;
`;

export const Separator = ({
  width = '100%',
  height = '100%',
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <>
      <Spacer height="0.5rem" />
      <SeparatorContainer width={width} height={height} />
      <Spacer height="0.5rem" />
    </>
  );
};
