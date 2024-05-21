import { useAnalytics } from '../../Hooks/useAnalytics';
import { BuyMeCoffee } from '../../Icons/generated/Support';
import { Separator } from '../Misc/Separator';
import { Paragraph } from '../Misc/TextComponents';
import { Dialog } from './Dialog';

export const InfoDialog = ({
  dialogRef,
}: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}) => {
  const analytics = useAnalytics();
  return (
    <Dialog id="info" title="Info" dialogRef={dialogRef}>
      <div className=" text-text-primary">
        <h2 className="text-md underline">Contributors</h2>
        <div className="flex flex-row items-center gap-1 text-sm">
          {/* <Trinket className="size-4" /> */}
          <a href="#">Elin:</a> Icon and colors
        </div>
        <Separator height="1px" />
      </div>
      <div className="text-text-primary mt-4">
        <div className="text">
          <h2 className="text-xl">📋 Usage Guide</h2>
          <Separator height="1px" />
        </div>
        <div className="text-text-primary">
          <Paragraph className="mb-4">
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
              <strong>Long press</strong> on a player's + or - button to add or
              subtract <strong>10 life</strong>.
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
                When a player is <strong>at or below 0 life</strong>, has taken{' '}
                <strong>21 or more Commander Damage</strong> or has{' '}
                <strong>10 or more poison counters</strong>, a button with a
                skull will appear on that player's card. Tapping it will dim the
                player's card.
              </Paragraph>
            </li>
            <li>
              <Paragraph className="mb-4">
                Swiping <strong>down</strong> on a player's card will show that
                player's settings menu.
              </Paragraph>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4 text-text-primary">
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
      <div className="flex justify-center mt-4">
        <a
          className="flex flex-row items-center self-center border-none cursor-pointer bg-primary-main rounded-md mx-4 pr-4 pl-3 py-2 transition-colors duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark"
          onClick={() => {
            analytics.trackEvent('click_bmc');
          }}
          href="https://www.buymeacoffee.com/vikeo"
          target="_blank"
        >
          <BuyMeCoffee height="1.5rem" width="1.5rem" className="mr-2" />
          <Paragraph className="text-xs">Buy me a tea</Paragraph>
        </a>
      </div>
    </Dialog>
  );
};
