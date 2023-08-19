import styled from 'styled-components';
import { theme } from '../../Data/theme';
import { Paragraph } from './TextComponents';

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 58px;
  background-color: ${theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

export const SupportMe = () => {
  return (
    <Footer>
      <Paragraph>Support me</Paragraph>
    </Footer>
  );
};
