import * as S from "./Counters.style";
import LifeCounter from "../LifeCounter/LifeCounter";


const Counters = () => {
  return (
    <S.CountersWrapper>
        <S.CountersGrid>
            <S.GridItemContainer>
                <LifeCounter backgroundColor="grey"/>
            </S.GridItemContainer>
            <S.GridItemContainer>
                <LifeCounter backgroundColor="pink"/>
            </S.GridItemContainer>
            <S.GridItemContainer>
                <LifeCounter backgroundColor="white"/>
            </S.GridItemContainer>
            <S.GridItemContainer>
                <LifeCounter backgroundColor="lightblue"/>
            </S.GridItemContainer>
        </S.CountersGrid>
    </S.CountersWrapper>
  );
}

export default Counters;
