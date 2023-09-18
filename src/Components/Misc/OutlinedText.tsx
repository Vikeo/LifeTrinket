import styled, { css } from 'styled-components';
import { theme } from '../../Data/theme';
import { Rotation } from '../../Types/Player';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CenteredText = styled.div<{
  strokeWidth?: string;
  strokeColor?: string;
  fillColor?: string;
  fontSize?: string;
  fontWeight?: string;
  $rotation?: Rotation;
}>`
  position: absolute;
  font-weight: ${(props) => props.fontWeight || ''};
  font-variant-numeric: tabular-nums;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;

  color: ${(props) => props.fillColor || theme.palette.common.black};
  font-size: ${(props) => props.fontSize || '6vmin'};
  -webkit-text-stroke: ${(props) => props.strokeWidth || '1vmin'}${(props) => props.strokeColor || theme.palette.common.white};
  -webkit-text-fill-color: ${(props) =>
    props.fillColor || theme.palette.common.black};

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: 270deg;
      `;
    }
  }}
`;

const CenteredTextOutline = styled.span`
  position: absolute;
  left: 0;
  -webkit-text-stroke: 0;
  pointer-events: none;
`;

type OutlinedTextProps = {
  children?: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
  strokeWidth?: string;
  strokeColor?: string;
  fillColor?: string;
  rotation?: Rotation;
};

export const OutlinedText: React.FC<OutlinedTextProps> = ({
  children,
  fontSize,
  fontWeight,
  strokeWidth,
  strokeColor,
  fillColor,
  rotation,
}) => {
  return (
    <Container>
      <CenteredText
        fontSize={fontSize}
        fontWeight={fontWeight}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        fillColor={fillColor}
        $rotation={rotation}
      >
        {children}
        <CenteredTextOutline aria-hidden>{children}</CenteredTextOutline>
      </CenteredText>
    </Container>
  );
};
