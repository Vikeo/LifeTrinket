import { useRef, useState } from "react";
import CommanderTaxIcon from "../../Icons/CommanderTaxIcon";
import styled from "styled-components";

export const StyledCommanderTaxButton = styled.button`
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
`;

const PartnerCommanderTaxButton = () => {
    const [partnerCommanderTax, setPartnerCommanderTax] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [timeoutFinished, setTimeoutFinished] = useState(false);

    const handlePartnerCommanderTaxChange = (increment: number) => {
        setPartnerCommanderTax(partnerCommanderTax + increment);
    };


    const handleDownInput = () => {
        setTimeoutFinished(false);
        timeoutRef.current = setTimeout(() => {
            setTimeoutFinished(true);
            handlePartnerCommanderTaxChange(-1);
        }, 500)
    }

    const handleUpInput = () => {
        if (!timeoutFinished) {
            clearTimeout(timeoutRef.current);
            handlePartnerCommanderTaxChange(1);
        }
    }
    
    return (
        <StyledCommanderTaxButton
            onPointerDown={handleDownInput}
            onPointerUp={handleUpInput}
            onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.preventDefault();
                }
            }
            >
            <CommanderTaxIcon
                size="8vh"
                text={partnerCommanderTax ? partnerCommanderTax : undefined}
            /> 2
        </StyledCommanderTaxButton>
    );
};

export default PartnerCommanderTaxButton;
