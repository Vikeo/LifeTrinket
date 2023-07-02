import { useRef, useState } from "react";
import { Player } from "../../Types/Player";
import styled from "styled-components";

const CommanderDamageGrid = styled.div`
  display: flex; 
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;

const CommanderDamageContainer = styled.div`
  display: flex; 
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;

const CommanderDamageButton = styled.button<{ backgroundColor?: string }>`
  display: flex;
  flex-grow: 1;
  border: none;
  height: 10vh;
  outline: none;
  cursor: pointer;
  background-color: ${props => props.backgroundColor || "antiquewhite"}; 
`;

const CommanderDamageButtonText = styled.p`
  position: relative;
  margin: auto;
  font-size: 1.5rem;
  text-align: center;
  text-size-adjust: auto;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  width: 2rem;
  user-select: none;
`;

const VerticalSeperator = styled.div`
    width: 1px;
    background-color: rgba(0, 0, 0, 1);
`;



type CommanderDamageBarProps = {
    lifeTotal: number;
    setLifeTotal: (lifeTotal: number) => void;
    opponents: Player[];
};

const CommanderDamageBar = ({ opponents, lifeTotal, setLifeTotal }: CommanderDamageBarProps) => {
    const [commanderDamage, setCommanderDamage] = useState<number[]>(
        Array(opponents.length).fill(0)
    );
    const [partnerCommanderDamage, setPartnerCommanderDamage] = useState<number[]>(
        Array(opponents.length).fill(0)
    );


    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [timeoutFinished, setTimeoutFinished] = useState(false);

    const handleCommanderDamageChange = (index: number, increment: number) => {
        const currentCommanderDamage = commanderDamage[index];
        if (currentCommanderDamage === 0 && increment === -1) {
            return;
        }

        if (currentCommanderDamage === 21 && increment === 1) {
            return;
        }

        const updatedCommanderDamage = [...commanderDamage];
        updatedCommanderDamage[index] += increment;
        setCommanderDamage(updatedCommanderDamage);
        setLifeTotal(lifeTotal - increment);
    };

    const handlePartnerCommanderDamageChange = (index: number, increment: number) => {
        const currentPartnerCommanderDamage = partnerCommanderDamage[index];
        if (currentPartnerCommanderDamage === 0 && increment === -1) {
            return;
        }

        const updatedPartnerCommanderDamage = [...partnerCommanderDamage];
        updatedPartnerCommanderDamage[index] += increment;

        setPartnerCommanderDamage(updatedPartnerCommanderDamage);
        setLifeTotal(lifeTotal - increment);
    };

    const handleDownInput = (index: number) => {
        setTimeoutFinished(false);
        timeoutRef.current = setTimeout(() => {
            setTimeoutFinished(true);
            handleCommanderDamageChange(index, -1);
        }, 500)
    }

    const handleUpInput = (index: number) => {
        if (!timeoutFinished) {
            clearTimeout(timeoutRef.current);
            handleCommanderDamageChange(index, 1);
        }
        clearTimeout(timeoutRef.current);
    }

    const handlePartnerDownInput = (index: number) => {
        setTimeoutFinished(false);
        timeoutRef.current = setTimeout(() => {
            setTimeoutFinished(true);
            handlePartnerCommanderDamageChange(index, -1);
        }, 500)
    }

    const handlePartnerUpInput = (index: number) => {
        if (!timeoutFinished) {
            clearTimeout(timeoutRef.current);
            handlePartnerCommanderDamageChange(index, 1);
        }
    }

    return (
        <CommanderDamageGrid>
            {opponents.map((opponent, index) => {
                return (
                    <CommanderDamageContainer>
                        <CommanderDamageButton
                            key={index}
                            onPointerDown={() => handleDownInput(index)}
                            onPointerUp={() => handleUpInput(index)}
                            onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                e.preventDefault();
                            }
                            }
                            backgroundColor={opponent.color}
                        >
                            <CommanderDamageButtonText>
                                {commanderDamage[index] > 0 ? commanderDamage[index] : ""}
                            </CommanderDamageButtonText>
                        </CommanderDamageButton>

                        {opponent.settings.usePartner && (
                            <>
                                <VerticalSeperator />
                                <CommanderDamageButton
                                    key={index}
                                    onPointerDown={() => handlePartnerDownInput(index)}
                                    onPointerUp={() => handlePartnerUpInput(index)}
                                    onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                        e.preventDefault();
                                    }
                                    }
                                    backgroundColor={opponent.color}
                                >
                                    <CommanderDamageButtonText>
                                        {partnerCommanderDamage[index] > 0 ? partnerCommanderDamage[index] : ""}
                                    </CommanderDamageButtonText>
                                </CommanderDamageButton>
                            </>

                        )
                        }
                    </CommanderDamageContainer>
                )
            })}
        </CommanderDamageGrid>
    );
};

export default CommanderDamageBar;
