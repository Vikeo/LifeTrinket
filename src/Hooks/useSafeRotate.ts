import { useEffect } from 'react';
import { Rotation } from '../Types/Player';

type useSafeRotateProps = {
  rotation: Rotation;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const useSafeRotate = ({
  rotation,
  containerRef,
}: useSafeRotateProps) => {
  const isSide =
    rotation === Rotation.Side || rotation === Rotation.SideFlipped;

  const calculateSize = (container: HTMLDivElement) => {
    if (isSide) {
      //set height to 100% of the width of the parent
      container.style.height = `${container.parentElement?.clientWidth}px`;

      //set width to 100% of the height of the parent
      container.style.width = `${container.parentElement?.clientHeight}px`;
    }
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const resizeObserver = new ResizeObserver(() => {
      calculateSize(container);
      console.log('resize by observer');
      return;
    });

    // Initially calculate size
    calculateSize(container);

    resizeObserver.observe(container.parentElement as Element);

    return () => {
      // Cleanup: disconnect the ResizeObserver when the component unmounts.
      resizeObserver.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return { isSide };
};
