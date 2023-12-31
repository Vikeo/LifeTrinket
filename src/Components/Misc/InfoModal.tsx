import { Modal } from '@mui/material';
import { theme } from '../../Data/theme';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 85vh;
  background-color: ${theme.palette.background.default};
  padding: 1rem;
  overflow: scroll;
  border-radius: 1rem;
  color: ${theme.palette.text.primary};
  border: none;
`;

type InfoModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const InfoModal = ({ isOpen, closeModal }: InfoModalProps) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalWrapper>
        <div>
          <h2 style={{ textAlign: 'center' }}>📋 Usage Guide</h2>
          <p>
            There are some controls that you might not know about, so here's a
            short list of them.
          </p>

          <h3>Life counter</h3>
          <ul>
            <li>
              <strong>Tap</strong> on a player's + or - button to add or
              subtract <strong>1 life</strong>.
            </li>
            <li>
              <strong>Long press</strong> on a player's + or - button to add or
              subtract <strong>10 life</strong>.
            </li>
          </ul>

          <h3>Commander damage and other counters</h3>
          <ul>
            <li>
              <strong>Tap</strong> on the counter to add{' '}
              <strong>1 counter</strong>.
            </li>
            <li>
              <strong>Long press</strong> on the counter to subtract{' '}
              <strong>1 counter</strong>.
            </li>
          </ul>

          <h3>Other</h3>
          <p>
            When a player is <strong>at or below 0 life</strong>, has taken{' '}
            <strong>21 or more Commander Damage</strong> or has{' '}
            <strong>10 or more poison counters</strong>, a button with a skull
            will appear on that player's card.
          </p>
          <p>
            Tap on the button to mark that player as lost, dimming their player
            card.
          </p>
        </div>
        <br />
        <div
          style={{
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          Visit my
          <a
            href="https://github.com/Vikeo/LifeTrinket"
            target="_blank"
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.light,
            }}
          >
            {' '}
            GitHub{' '}
          </a>
          for more info about this web app.
        </div>
      </ModalWrapper>
    </Modal>
  );
};
