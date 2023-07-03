import { useState } from "react";
import { Player } from "../../Types/Player";
import LifeCounter from "../LifeCounter/LifeCounter";
import * as S from "./Counters.style";

type CountersProps = {
    players: Player[];
};

const Counters = ({ players }: CountersProps) => {
    const [isAnyButtonsPressed, setIsAnyButtonsPressed] = useState(false);
    return (
        <S.CountersWrapper>
            <S.CountersGrid>
                {players.map((player) => {
                    if (player.settings.flipped) {
                        return (
                            <S.GridItemContainerFlipped>
                                <LifeCounter backgroundColor={player.color} player={player} opponents={
                                    players.filter((opponent) => opponent.key !== player.key)
                                } isAnyButtonsPressed={isAnyButtonsPressed}
                                    setIsAnyButtonsPressed={setIsAnyButtonsPressed}
                                />
                            </S.GridItemContainerFlipped>
                        )
                    }
                    return (
                        <S.GridItemContainer>
                            <LifeCounter backgroundColor={player.color} player={player} opponents={
                                players.filter((opponent) => opponent.key !== player.key)
                            }
                                isAnyButtonsPressed={isAnyButtonsPressed}
                                setIsAnyButtonsPressed={setIsAnyButtonsPressed}
                            />
                        </S.GridItemContainer>
                    )
                })}
            </S.CountersGrid>
        </S.CountersWrapper>
    );
}

export default Counters;
