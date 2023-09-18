import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Player, Rotation } from '../../Types/Player';
import LifeCounterButton from '../Buttons/LifeCounterButton';
import { OutlinedText } from '../Misc/OutlinedText';

const LifeCountainer = styled.div<{
  $rotation: Rotation;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const LifeCounterTextContainer = styled.div<{
  $rotation: Rotation;
}>`
  position: absolute;
  width: 60%;
  height: 100%;
  margin: 0;
  padding: 0;
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        width: 100%;
        height: 60%;
      `;
    }
  }}
`;

const TextWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  33% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
`;

export const RecentDifference = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
  font-variant-numeric: tabular-nums;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 8vmin;
  color: #333333;
  animation: ${fadeOut} 3s 1s ease-out forwards;
`;

type HealthProps = {
  player: Player;
  onPlayerChange: (updatedPlayer: Player) => void;
  differenceKey: number;
  setDifferenceKey: (key: number) => void;
  rotation: Rotation;
};

const Health = ({
  player,
  onPlayerChange,
  differenceKey,
  setDifferenceKey,
  rotation,
}: HealthProps) => {
  const handleLifeChange = (updatedLifeTotal: number) => {
    const difference = updatedLifeTotal - player.lifeTotal;
    const updatedPlayer = {
      ...player,
      lifeTotal: updatedLifeTotal,
      hasLost: false,
    };
    setRecentDifference(recentDifference + difference);
    onPlayerChange(updatedPlayer);
    setDifferenceKey(Date.now());
  };

  const [recentDifference, setRecentDifference] = useState(0);
  const [showStartingPlayer, setShowStartingPlayer] = useState(
    localStorage.getItem('playing') === 'true'
  );
  const [fontSize, setFontSize] = useState(16);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentDifference(0);
    }, 3_000);

    return () => clearTimeout(timer);
  }, [recentDifference]);

  useEffect(() => {
    if (!showStartingPlayer) {
      const playingTimer = setTimeout(() => {
        localStorage.setItem('playing', 'true');
        setShowStartingPlayer(localStorage.getItem('playing') === 'true');
      }, 3_000);

      return () => clearTimeout(playingTimer);
    }
  }, [showStartingPlayer]);

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
    const isSide =
      rotation === Rotation.SideFlipped || rotation === Rotation.Side;

    const widthRatio = isSide ? container.clientHeight : container.clientWidth;

    const heightRatio = isSide ? container.clientWidth : container.clientHeight;

    const minRatio = Math.min(widthRatio, heightRatio);

    const heightIsLarger = heightRatio > widthRatio;

    const scaleFactor = heightIsLarger ? 0.8 : 1;

    return minRatio * scaleFactor * 1;
  };

  return (
    <LifeCountainer $rotation={player.settings.rotation}>
      <LifeCounterButton
        lifeTotal={player.lifeTotal}
        setLifeTotal={handleLifeChange}
        rotation={player.settings.rotation}
        operation="subtract"
        increment={-1}
      />
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
            <RecentDifference key={differenceKey}>
              {recentDifference > 0 ? '+' : ''}
              {recentDifference}
            </RecentDifference>
          )}
        </LifeCounterTextContainer>
      </TextWrapper>
      <LifeCounterButton
        lifeTotal={player.lifeTotal}
        setLifeTotal={handleLifeChange}
        rotation={player.settings.rotation}
        operation="add"
        increment={1}
      />
    </LifeCountainer>
  );
};

export default Health;
