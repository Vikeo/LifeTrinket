import { useState } from "react";
import * as S from "./LifeCounter.style";

type LifeCounterProps = {
    backgroundColor: string;
}

const LifeCounter = ({backgroundColor}: LifeCounterProps)  => {
    const [life, setLife] = useState(40);

    return (
        <S.LifeCounterWrapper backgroundColor={backgroundColor}>
            <S.LifeCounterButton onClick={() => setLife(life - 1)}>-</S.LifeCounterButton>
            <S.LifeCounterText>{life}</S.LifeCounterText>
            <S.LifeCounterButton onClick={() => setLife(life + 1)}>+</S.LifeCounterButton>
        </S.LifeCounterWrapper>
    );
}

export default LifeCounter;