import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../Data/theme';
import { BuyMeCoffee, KoFi } from '../../Icons/generated/Support';
import { Paragraph } from './TextComponents';
import LittleGuy from '../../Icons/generated/LittleGuy';

// import { ButtonBase } from '@mui/material';

const SupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenBuyMeCoffee = () => {
    window.open('https://www.buymeacoffee.com/vikeo');
  };

  const handleOpenKoFi = () => {
    window.open('https://ko-fi.com/vikeo');
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        size="small"
        variant="contained"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontSize: '0.5rem',
        }}
      >
        Nourish <br /> this guy {'->'}
      </Button>

      <LittleGuy
        height={'4rem'}
        width={'2.5rem'}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: '2.5rem',
          right: '0',
          color: theme.palette.text.primary,
        }}
      />

      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
      >
        <SupportContainer>
          <SupportButton onClick={handleOpenBuyMeCoffee}>
            <BuyMeCoffee
              height={'1.5rem'}
              width={'1.5rem'}
              style={{ marginRight: '0.5rem' }}
            />
            <Paragraph style={{ fontSize: '0.7rem' }}>Buy him a tea</Paragraph>
          </SupportButton>
          <SupportButton onClick={handleOpenKoFi}>
            <KoFi
              height={'1.5rem'}
              width={'1.5rem'}
              style={{ marginRight: '0.5rem' }}
            />
            <Paragraph style={{ fontSize: '0.7rem' }}>
              Buy him a ko-fi
            </Paragraph>
          </SupportButton>
        </SupportContainer>
      </Drawer>
    </>
  );
};
