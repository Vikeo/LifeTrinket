import { Modal } from '@mui/material';
import { twc } from 'react-twc';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';
import { Cross } from '../../Icons/generated';

export const ModalWrapper = twc.div`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85vh] bg-background-default p-4 overflow-scroll rounded-2xl border-none text-text-primary w-[95vw] max-w-[548px]`;

type InfoModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const InfoModal = ({ isOpen, closeModal }: InfoModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      style={{ display: 'flex', justifyContent: 'center' }}
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
          <div>
            <h2 className="text-2xl text-center mb-4">📋 Usage Guide</h2>
            <Separator height="1px" />
            <Paragraph className="my-4">
              There are some controls that you might not know about, so here's a
              short list of them.
            </Paragraph>
            <h3 className="text-lg font-bold mb-2">Life counter</h3>
            <ul className="list-disc ml-6 mb-4">
              <li>
                <strong>Tap</strong> on a player's + or - button to add or
                subtract <strong>1 life</strong>.
              </li>
              <li>
                <strong>Long press</strong> on a player's + or - button to add
                or subtract <strong>10 life</strong>.
              </li>
            </ul>

            <h3 className="text-lg font-bold mb-2">
              Commander damage and other counters
            </h3>
            <ul className="list-disc ml-6 mb-4">
              <li>
                <strong>Tap</strong> on the counter to add{' '}
                <strong>1 counter</strong>.
              </li>
              <li>
                <strong>Long press</strong> on the counter to subtract{' '}
                <strong>1 counter</strong>.
              </li>
            </ul>

            <h3 className="text-lg font-bold mb-2">Other functionality</h3>
            <ul className="list-disc ml-6">
              <li>
                <Paragraph className="mb-1">
                  When a player is <strong>at or below 0 life</strong>, has
                  taken <strong>21 or more Commander Damage</strong> or has{' '}
                  <strong>10 or more poison counters</strong>, a button with a
                  skull will appear on that player's card. Tapping it will dim
                  the player's card.
                </Paragraph>
              </li>
              <li>
                <Paragraph className="mb-4">
                  Swiping <strong>down</strong> on a player's card will show
                  that player's settings menu.
                </Paragraph>
              </li>
            </ul>
          </div>
          <div className="text-center mt-4">
            Visit my{' '}
            <a
              href="https://github.com/Vikeo/LifeTrinket"
              target="_blank"
              className="text-text-secondary underline"
            >
              GitHub
            </a>{' '}
            for more info about this web app.
          </div>
        </ModalWrapper>
      </>
    </Modal>
  );
};
