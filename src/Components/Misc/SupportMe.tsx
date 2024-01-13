import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import { BuyMeCoffee, KoFi } from '../../Icons/generated/Support';
import { Paragraph } from './TextComponents';
import LittleGuy from '../../Icons/generated/LittleGuy';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { twc } from 'react-twc';

const SupportContainer = twc.div`flex flex-col items-center justify-center gap-4 mt-4 mb-4`;

const SupportButton = twc.button`
  flex
  flex-row
  items-center
  justify-left
  border-none
  cursor-pointer
  bg-primary-main
  rounded-md
  w-10/12
  mx-4
  px-4
  py-2
  transition-colors duration-200 ease-in-out
  shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)]
  hover:bg-primary-dark
  `;

export const SupportMe = () => {
  const analytics = useAnalytics();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenBuyMeCoffee = () => {
    analytics.trackEvent('click_bmc');
    window.open('https://www.buymeacoffee.com/vikeo');
  };

  const handleOpenKoFi = () => {
    analytics.trackEvent('click_kofi');
    window.open('https://ko-fi.com/vikeo');
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      analytics.trackEvent('toggle_support_drawer');

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
        className="pointer-events-none absolute top-10 right-0 text-text-primary"
      />

      <Drawer
        anchor={'right'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
      >
        <SupportContainer>
          <SupportButton onClick={handleOpenBuyMeCoffee}>
            <BuyMeCoffee height="1.5rem" width="1.5rem" className="mr-2" />
            <Paragraph className="text-xs">Buy him a tea</Paragraph>
          </SupportButton>
          <SupportButton onClick={handleOpenKoFi}>
            <KoFi height="1.5rem" width="1.5rem" className="mr-2" />
            <Paragraph className="text-xs">Buy him a ko-fi</Paragraph>
          </SupportButton>
        </SupportContainer>
      </Drawer>
    </>
  );
};
