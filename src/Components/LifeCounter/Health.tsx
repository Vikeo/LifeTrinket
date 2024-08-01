import { useEffect, useRef, useState } from 'react';
import { twc } from 'react-twc';
import { Player, Rotation } from '../../Types/Player';
import { RotationDivProps } from '../Buttons/CommanderDamage';
import LifeCounterButton from '../Buttons/LifeCounterButton';
import { OutlinedText } from '../Misc/OutlinedText';

const LifeContainer = twc.div<RotationDivProps>((props) => [
  'flex flex-grow relative w-full h-full justify-between items-center',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col-reverse'
    : 'flex-row',
]);

const LifeCounterTextContainer = twc.div<RotationDivProps>((props) => [
  'absolute m-0 p-0 pointer-events-none select-none webkit-user-select-none',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'w-full h-2/3'
    : 'w-2/3 h-full',
]);

const TextWrapper = twc.div`
  flex
  absolute
  justify-center
  items-center
  w-full
  h-full
  z-[-1]
`;

const RecentDifference = twc.div`
  absolute min-w-[20vmin] drop-shadow-none text-center bg-interface-recentDifference-background tabular-nums rounded-full p-[6px 12px] text-[8vmin] text-interface-recentDifference-text animate-fadeOut 

  top-1/4 left-[50%] -translate-x-1/2
  data-[isSide=true]:top-1/3 data-[isSide=true]:translate-x-1/4 data-[isSide=true]:translate-y-1/2 data-[isSide=true]:rotate-[270deg] data-[isSide=true]:left-auto
  `;

type HealthProps = {
  player: Player;
  rotation: Rotation;
  handleLifeChange: (updatedLifeTotal: number) => void;
  differenceKey: number;
  recentDifference: number;
};

const Health = ({
  player,
  handleLifeChange,
  differenceKey,
  recentDifference,
}: HealthProps) => {
  const [fontSize, setFontSize] = useState(16);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textContainerRef.current) {
      return;
    }

    const textContainer = textContainerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const calcFontSize = calculateFontSize(textContainer);
      setFontSize(calcFontSize);
    });

    // Initially calculate font size
    const initialCalculation = () => {
      const calcFontSize = calculateFontSize(textContainer);
      setFontSize(calcFontSize);
    };
    initialCalculation();

    resizeObserver.observe(textContainer);

    return () => {
      // Cleanup: disconnect the ResizeObserver when the component unmounts.
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textContainerRef]);

  const calculateFontSize = (container: HTMLDivElement) => {
    const widthRatio = player.isSide
      ? container.clientHeight
      : container.clientWidth;

    const heightRatio = player.isSide
      ? container.clientWidth
      : container.clientHeight;

    const minRatio = Math.min(widthRatio, heightRatio);

    const heightIs40PercentSmaller = heightRatio > widthRatio * 0.6;

    const scaleFactor = heightIs40PercentSmaller ? 0.8 : 1;

    return minRatio * scaleFactor * 1;
  };

  const isSide =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side;

  return (
    <LifeContainer $rotation={player.settings.rotation}>
      <LifeCounterButton
        player={player}
        setLifeTotal={handleLifeChange}
        operation="subtract"
        increment={-1}
      />

      {player.name && isSide ? (
        <div className="size-full relative flex items-center justify-start">
          <div className="fixed flex justify-center -rotate-90 left-[5.4vmax] ">
            <div
              data-contrast={player.iconTheme}
              className="absolute text-[4vmin] opacity-50 font-bold
              data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
            >
              {player.name}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative flex items-start justify-center">
          <div
            data-contrast={player.iconTheme}
            className="absolute text-[4vmin] -top-[1.1vmin] opacity-50 font-bold
            data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
          >
            {player.name}
          </div>
        </div>
      )}

      <TextWrapper>
        <LifeCounterTextContainer
          $rotation={player.settings.rotation}
          ref={textContainerRef}
        >
          <OutlinedText
            fontSize={`${fontSize}px`}
            strokeWidth={`${fontSize / 16}px`}
            rotation={player.settings.rotation}
          >
            {player.lifeTotal}
          </OutlinedText>
          {recentDifference !== 0 && (
            <RecentDifference data-isSide={isSide} key={differenceKey}>
              {recentDifference > 0 ? '+' : ''}
              {recentDifference}
            </RecentDifference>
          )}
        </LifeCounterTextContainer>
      </TextWrapper>
      <LifeCounterButton
        player={player}
        setLifeTotal={handleLifeChange}
        operation="add"
        increment={1}
      />
    </LifeContainer>
  );
};

export default Health;
