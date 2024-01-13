import { Button, FormLabel, Modal, Switch } from '@mui/material';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { ModalWrapper } from './InfoModal';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';

const SettingContainer = twc.div`w-full flex flex-col`;

const ToggleContainer = twc.div`flex flex-row justify-between items-center`;

const Container = twc.div`flex flex-col items-center w-full`;

const Description = twc.p`mr-16 text-xs text-left text-text-secondary`;

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
              <Separator height="1px" />
              <SettingContainer>
                <ToggleContainer>
                  <Paragraph>
                    <b>Tip:</b> You can{' '}
                    <b>add this webapp to your home page on iOS</b> or{' '}
                    <b>install it on Android</b> to have it act just like a
                    normal app!
                  </Paragraph>
                </ToggleContainer>
                <Description className="mt-1">
                  If you do, this app will work offline and the toolbar will be
                  automatically hidden.
                </Description>
              </SettingContainer>
            </>
          )}
          <Separator height="1px" />
          <SettingContainer>
            {/* @ts-expect-error is defined in vite.config.ts*/}
            <Paragraph>Version: 0.4.1</Paragraph>
            <Button
              variant="contained"
              onClick={() => window?.location.reload()}
            >
              Try to update version
            </Button>
          </SettingContainer>
          <Separator height="1px" />

          <Button variant="contained" onClick={closeModal}>
            Save and Close
          </Button>
        </Container>
      </ModalWrapper>
    </Modal>
  );
};
