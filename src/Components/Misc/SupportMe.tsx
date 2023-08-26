import styled from 'styled-components';
import { Paragraph } from './TextComponents';
import { BuyMeCoffee, KoFi } from '../../Icons/generated/Support';
import { theme } from '../../Data/theme';
// import { ButtonBase } from '@mui/material';

const SupportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

const SupportButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  background-color: ${theme.palette.primary.main};
  border-radius: 4px;
  margin: 0 1rem;
  padding: 0 1rem;
  transition: background-color 0.2s ease-in-out;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: ${theme.palette.primary.dark};
  }
`;

export const SupportMe = () => {
  const handleOpenBuyMeCoffee = () => {
    window.open('https://www.buymeacoffee.com/vikeo');
  };

  const handleOpenKoFi = () => {
    window.open('https://ko-fi.com/vikeo');
  };

  return (
    <SupportContainer>
      <SupportButton onClick={handleOpenBuyMeCoffee}>
        <BuyMeCoffee
          height={'24px'}
          width={'24px'}
          style={{ marginRight: '0.5rem' }}
        />
        <Paragraph>Buy me a tea</Paragraph>
      </SupportButton>
      <SupportButton onClick={handleOpenKoFi}>
        <KoFi
          height={'24px'}
          width={'24px'}
          style={{ marginRight: '0.5rem' }}
        />
        <Paragraph>Buy me a ko-fi</Paragraph>
      </SupportButton>
    </SupportContainer>
  );
};
