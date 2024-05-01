import { useEffect } from 'react';
import { Cross } from '../../Icons/generated';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { Separator } from '../Misc/Separator';

export const Dialog: React.FC<{
  id: string;
  title?: string;
  children: React.ReactNode;
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}> = ({ id, title, children, dialogRef }) => {
  const analytics = useAnalytics();

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.addEventListener('click', (e) => {
      const dialogDimensions = dialogRef.current!.getBoundingClientRect();
      if (
        (e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom) &&
        dialogRef.current?.open
      ) {
        analytics.trackEvent(`${id}_outside_clicked`);
        dialogRef.current?.close();
      }
    });
  });

  return (
    <dialog
      id={id}
      ref={dialogRef}
      className="backdrop:bg-background-backdrop border-none backdrop:backdrop-blur-[1px] open:visible invisible bg-transparent overflow-visible m-0 justify-self-center top-[10%]"
    >
      <button
        onClick={() => {
          analytics.trackEvent(`${id}_cross_clicked`);
          dialogRef.current?.close();
        }}
        className="flex absolute -top-2 right-2 z-10 w-10 h-10 bg-primary-main items-center justify-center rounded-full border-solid border-primary-dark border-2"
      >
        <Cross size="16px" className="text-text-primary" />
      </button>

      <div className="h-[95%] bg-background-default rounded-2xl max-w-[548px] max-h-[80vh] flex flex-col">
        <div className="text-2xl text-center text-text-primary px-8 pt-4">
          <h2 className="">{title}</h2>
          <Separator height="1px" />
        </div>

        <div className="h-full overflow-auto text-text-primary show-scrollbar px-8 pb-8">
          {children}
        </div>
      </div>
    </dialog>
  );
};
