import { Button, FormLabel, Modal, Switch } from '@mui/material';
import { ModalWrapper } from './InfoModal';
import styled from 'styled-components';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { theme } from '../../Data/theme';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';

const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Description = styled.p`
  margin-top: -0.25rem;
  margin-right: 3.5rem;
  font-size: 0.8rem;
  text-align: left;
  color: ${theme.palette.text.secondary};
`;

type SettingsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SettingsModal = ({ isOpen, closeModal }: SettingsModalProps) => {
  const { settings, setSettings, isPWA } = useGlobalSettings();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalWrapper>
        <Container>
          <h2 style={{ textAlign: 'center' }}>⚙️ Settings ⚙️</h2>
          <SettingContainer>
            <ToggleContainer>
              <FormLabel>Show Start Player</FormLabel>
              <Switch
                checked={settings.showStartingPlayer}
                onChange={() => {
                  setSettings({
                    ...settings,
                    showStartingPlayer: !settings.showStartingPlayer,
                  });
                }}
              />
            </ToggleContainer>
            <Description>
              On start or reset of game, will pick a random player who will
              start first if this is enabled.
            </Description>
          </SettingContainer>
          <SettingContainer>
            <ToggleContainer>
              <FormLabel>Keep Awake</FormLabel>
              <Switch
                checked={settings.keepAwake}
                onChange={() => {
                  setSettings({ ...settings, keepAwake: !settings.keepAwake });
                }}
              />
            </ToggleContainer>
            <Description>
              Will prevent device from going to sleep while this app is open if
              this is enabled.
            </Description>
          </SettingContainer>
          <SettingContainer>
            <ToggleContainer>
              <FormLabel>Go fullscreen on start (Android only)</FormLabel>
              <Switch
                checked={settings.goFullscreenOnStart}
                onChange={() => {
                  setSettings({
                    ...settings,
                    goFullscreenOnStart: !settings.goFullscreenOnStart,
                  });
                }}
              />
            </ToggleContainer>
            <Description>
              Will enter fullscreen mode when starting a game if this is
              enabled.
            </Description>
          </SettingContainer>
          {!isPWA && (
            <>
              <Separator height="2px" />
              <SettingContainer>
                <ToggleContainer>
                  <Paragraph>
                    <b>Tip:</b> You can{' '}
                    <b>add this webapp to your home page on iOS</b> or{' '}
                    <b>install it on Android</b> to have it act just like a
                    normal app!
                  </Paragraph>
                </ToggleContainer>
                <Description>
                  If you do, this app will work offline and the toolbar will be
                  automatically hidden.
                </Description>
              </SettingContainer>
            </>
          )}
          <Separator height="2px" />
          <Button variant="contained" onClick={closeModal}>
            Save and Close
          </Button>
        </Container>
      </ModalWrapper>
    </Modal>
  );
};
