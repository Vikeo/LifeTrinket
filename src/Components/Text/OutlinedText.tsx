import styled from 'styled-components/macro';
import { theme } from '../../Data/theme';

const CenteredText = styled.div<{
  strokeWidth?: string;
  strokeColor?: string;
  fillColor?: string;
  fontSize?: string;
  fontWeight?: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  -webkit-text-stroke: ${(props) => props.strokeWidth || '1vmin'} ${(props) => props.strokeColor || theme.palette.common.white};
  -webkit-text-fill-color: ${(props) =>
    props.fillColor || theme.palette.common.black};
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
};

export const OutlinedText: React.FC<OutlinedTextProps> = ({
  children,
  fontSize,
  fontWeight,
  strokeWidth,
  strokeColor,
  fillColor,
}) => {
  return (
    <CenteredText
      fontSize={fontSize}
      fontWeight={fontWeight}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      fillColor={fillColor}
    >
      {children}
      <CenteredTextOutline aria-hidden>{children}</CenteredTextOutline>
    </CenteredText>
  );
};
