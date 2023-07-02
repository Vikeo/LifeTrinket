import { useRef, useState } from "react";
import styled from "styled-components";

export const StyledLifeCounterButton = styled.button<{ align?: string }>`
  width: 50%;
  height: auto;
  color: rgba(0, 0, 0, 0.4);
  font-size: 4rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 28px;
  text-align: ${props => props.align || "center"};
  user-select: none;
`;

type SubtractLifeButtonProps = {
    lifeTotal: number;
    setLifeTotal: (lifeTotal: number) => void;
};

const SubtractLifeButton = ({ lifeTotal, setLifeTotal }: SubtractLifeButtonProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [timeoutFinished, setTimeoutFinished] = useState(false);

    const handleLifeChange = (increment: number) => {
        setLifeTotal(lifeTotal + increment);
    };

    const handleDownInput = () => {
        setTimeoutFinished(false);
        timeoutRef.current = setTimeout(() => {
            handleLifeChange(-10);
            setTimeoutFinished(true);
        }, 500)
    }

    const handleUpInput = () => {
        if (!timeoutFinished) {
            clearTimeout(timeoutRef.current);
            handleLifeChange(-1);
        }
    }

    return (
        <StyledLifeCounterButton
            onPointerDown={handleDownInput}
            onPointerUp={handleUpInput}
            onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.preventDefault();
            }}
            align="left"
        >
            &#8722;
        </StyledLifeCounterButton>
    );
};

export default SubtractLifeButton;
