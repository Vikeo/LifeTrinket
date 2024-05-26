import { useAnalytics } from '../../Hooks/useAnalytics';
import {
  CommanderTax,
  Energy,
  Experience,
  PartnerTax,
  Poison,
} from '../../Icons/generated';
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
          <div className="flex flex-col">
            <div>
              <a
                href="https://github.com/Vikeo"
                target="_blank"
                className="text-text-secondary underline"
              >
                Vikeo
              </a>
              : Creator
            </div>
            <div>
              <a href="#" className="text-text-secondary underline">
                Elin
              </a>
              : Icon design
            </div>
          </div>
        </div>
        <div className="mt-2 text-text-primary">
          Visit the{' '}
          <a
            href="https://github.com/Vikeo/LifeTrinket"
            target="_blank"
            className="text-text-secondary underline"
          >
            GitHub
          </a>{' '}
          to contribute or learn more about this web app.
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

          <h3 className="text-lg font-bold mb-1">Other counter symbols</h3>
          <ul className="list-disc ml-6 mb-4">
            <li className="flex items-center">
              <CommanderTax className="size-6" /> - Commander Tax
            </li>
            <li className="flex items-center">
              <PartnerTax className="size-6" /> - Partner Tax
            </li>
            <li className="flex items-center">
              <Poison className="size-6" /> - Poison
            </li>
            <li className="flex items-center">
              <Energy className="size-6" /> - Energy
            </li>
            <li className="flex items-center">
              <Experience className="size-6" /> - Experience
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

          <h3 className="text-lg font-bold mb-2">Acknowledgements </h3>
          <Paragraph>
            LifeTrinket is unofficial Fan Content permitted under the{' '}
            <a
              href="https://company.wizards.com/en/legal/fancontentpolicy"
              className="text-text-secondary underline"
              target="_blank"
            >
              Fan Content Policy
            </a>
            . Not approved or endorsed by Wizards. Portions of the material or
            concepts, such as "Commander", used are property of Wizards of the
            Coast. ©Wizards of the Coast LLC.
          </Paragraph>
        </div>
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
