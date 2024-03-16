import { Button, FormLabel, Modal, Switch } from '@mui/material';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { ModalWrapper } from './InfoModal';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';
import { useEffect, useState } from 'react';
import { Cross } from '../../Icons/generated';

const SettingContainer = twc.div`w-full flex flex-col mb-2`;

const ToggleContainer = twc.div`flex flex-row justify-between items-center -mb-1`;

const Container = twc.div`flex flex-col items-center w-full`;

const Description = twc.p`mr-16 text-xs text-left text-text-secondary`;

type SettingsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SettingsModal = ({ isOpen, closeModal }: SettingsModalProps) => {
  const { settings, setSettings, isPWA } = useGlobalSettings();
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [newVersion, setNewVersion] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    async function checkIfLatestVersion() {
      try {
        const result = await fetch(
          'https://api.github.com/repos/Vikeo/LifeTrinket/releases/latest',
          {
            headers: {
              /* @ts-expect-error is defined in vite.config.ts*/
              Authorization: `Bearer ${REPO_READ_ACCESS_TOKEN}`,
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );
        const data = await result.json();

        if (!data.name) {
          setNewVersion(undefined);
          setIsLatestVersion(false);
          return;
        }

        setNewVersion(data.name);

        /* @ts-expect-error is defined in vite.config.ts*/
        if (data.name === APP_VERSION) {
          setIsLatestVersion(true);
          return;
        }

        setIsLatestVersion(false);
      } catch (error) {
        console.error('error getting latest version string', error);
      }
    }
    checkIfLatestVersion();
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      className="w-full flex justify-center"
    >
      <>
        <div className="flex justify-center items-center relative w-full max-w-[532px]">
          <button
            onClick={closeModal}
            className="flex absolute top-12 right-0 z-10 w-10 h-10 bg-primary-main items-center justify-center rounded-full border-solid border-primary-dark border-2"
          >
            <Cross size="16px" className="text-text-primary " />
          </button>
        </div>
        <ModalWrapper>
          <Container>
            <h2 className="text-center text-2xl mb-2">⚙️ Settings ⚙️</h2>
            <Separator height="1px" />
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
                <FormLabel>Show Player Menu Cog</FormLabel>
                <Switch
                  checked={settings.showPlayerMenuCog}
                  onChange={() => {
                    setSettings({
                      ...settings,
                      showPlayerMenuCog: !settings.showPlayerMenuCog,
                    });
                  }}
                />
              </ToggleContainer>
              <Description>
                A cog on the top right of each player's card will be shown if
                this is enabled.
              </Description>
            </SettingContainer>
            <SettingContainer>
              <ToggleContainer>
                <FormLabel>Randomize starting player with interval</FormLabel>
                <Switch
                  checked={settings.useRandomStartingPlayerInterval}
                  onChange={() => {
                    setSettings({
                      ...settings,
                      useRandomStartingPlayerInterval:
                        !settings.useRandomStartingPlayerInterval,
                    });
                  }}
                />
              </ToggleContainer>
              <Description>
                Will randomize between all players at when starting a game,
                pressing the screen aborts the interval and chooses the player
                that has the crown.
              </Description>
            </SettingContainer>
            <SettingContainer>
              <ToggleContainer>
                <FormLabel>Keep Awake</FormLabel>
                <Switch
                  checked={settings.keepAwake}
                  onChange={() => {
                    setSettings({
                      ...settings,
                      keepAwake: !settings.keepAwake,
                    });
                  }}
                />
              </ToggleContainer>
              <Description>
                Will prevent device from going to sleep while this app is open
                if this is enabled.
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
                    If you do, this app will work offline and the toolbar will
                    be automatically hidden.
                  </Description>
                </SettingContainer>
              </>
            )}
            <Separator height="1px" />
            <SettingContainer>
              <Paragraph>
                {/* @ts-expect-error is defined in vite.config.ts*/}
                Current version: {APP_VERSION}{' '}
                {isLatestVersion && (
                  <span className="text-sm text-text-secondary">(latest)</span>
                )}
              </Paragraph>
              {!isLatestVersion && newVersion && (
                <Paragraph className="text-text-secondary text-lg text-center">
                  New version ({newVersion}) is available!{' '}
                </Paragraph>
              )}
            </SettingContainer>
            {!isLatestVersion && newVersion && (
              <Button
                variant="contained"
                style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}
                onClick={() => window?.location?.reload()}
              >
                <span>Update</span>
                <span className="text-xs">&nbsp;(reload app)</span>
              </Button>
            )}
            <Separator height="1px" />

            <Button
              variant="contained"
              onClick={closeModal}
              style={{ marginTop: '0.25rem' }}
            >
              Save and Close
            </Button>
          </Container>
        </ModalWrapper>
      </>
    </Modal>
  );
};
