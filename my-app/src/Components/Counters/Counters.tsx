import * as S from "./Counters.style";
import LifeCounter from "../LifeCounter/LifeCounter";
import { Player } from "../../Types/Player";

type CountersProps = {
    players: Player[];
};

const Counters = ({ players }: CountersProps) => {
    return (
        <S.CountersWrapper>
            <S.CountersGrid>
                {players.map((player) => {
                    if (player.settings.flipped) {
                        return (
                            <S.GridItemContainerFlipped>
                                <LifeCounter backgroundColor={player.color} player={player} opponents={
                                    players.filter((opponent) => opponent.key !== player.key)
                                } />
                            </S.GridItemContainerFlipped>
                        )
                    }
                    return (
                        <S.GridItemContainer>
                            <LifeCounter backgroundColor={player.color} player={player}  opponents={
                                players.filter((opponent) => opponent.key !== player.key)
                            } />
                        </S.GridItemContainer>
                    )
                })}
            </S.CountersGrid>
        </S.CountersWrapper>
    );
}

export default Counters;
