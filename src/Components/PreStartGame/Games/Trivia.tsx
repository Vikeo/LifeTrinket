import { useState } from 'react';
import { useGlobalSettings } from '../../../Hooks/useGlobalSettings';

const questions = [
  'Who has the most siblings?',
  'Who has the most pets?',
  'Who has the most tattoos?',
  'Who has the most piercings?',
  'Who has the most expensive shoes?',
  'Who has the most most amount of teeth?',
  'Who has the least amount of teeth?',
  'Who lives closest to the equator?',
  'Who is the tallest person in the group?',
  'Who is the shortest person in the group?',
  'Who speaks the most languages?',
  'Who has traveled to the most countries?',
  'Who has the earliest birthday in the year?',
  'Who has won the most awards or trophies?',
  'Who is the best cook among you?',
  'Who is the fastest runner?',
  'Who has the most unique hobby?',
  'Who is the biggest movie buff?',
  'Who is the most tech-savvy?',
  'Who is the best at solving puzzles?',
  'Who has the most extensive music collection?',
  'Who has the most impressive collection of books?',
  'Who has the most experience in a particular sport or activity?',
  'Who has the most interesting job or profession?',
  'Who has the most artistic talent?',
  'Who is the most organized person?',
  'Who is the best at keeping secrets?',
  'Who has the most fascinating family history?',
  'Who has the most embarrassing childhood nickname?',
  'Who has the most unusual talent or skill?',
  'Who has the most interesting family tradition?',
  'Who has the most impressive celebrity encounter?',
  'Who has the most unusual phobia?',
  'Who has the most adventurous spirit?',
  'Who has the most unique item in their wallet/purse?',
  'Who has the most daring fashion sense?',
  'Who has the most impressive party trick?',
  'Who has the most memorable encounter with a wild animal?',
  'Who has the most adventurous palate?',
  'Who has the most unusual collection?',
  'Who has the most unique bucket list item?',
  'Who has the most inspiring life motto or mantra?',
  'Who is the most likely to break out into song or dance in public?',
  'Who is the most likely to be found binge-watching TV shows?',
  'Who is the biggest procrastinator?',
  'Who is the most likely to cry during a movie?',
  'Who is the most adventurous when it comes to trying new foods?',
  "Who is the most likely to forget someone's birthday?",
  'Who is the best at giving advice?',
  'Who is the worst at giving advice?',
  'Who is the most likely to be found reading a book at a party?',
  'Who is the most likely to win in a game of charades?',
  'Who is the most likely to get lost in their own neighborhood?',
  'Who is the most sentimental?',
  'Who is the most likely to become famous?',
  'Who is the most likely to become a millionaire?',
  'Who is the most likely to start their own business?',
  'Who is the most likely to become president?',
  'Who is the most likely to go viral on social media?',
  'Who is the most likely to win a Nobel Prize?',
  'Who is the most likely to be a superhero in disguise?',
  'Who is the most likely to survive a zombie apocalypse?',
  'Who is the most likely to believe in aliens?',
  'Who is the most likely to spend all their money on something silly?',
  'Who is the most likely to write a bestselling novel?',
  'Who is the most likely to be a secret agent?',
  'Who is the most likely to be a professional athlete?',
  'Who is the most likely to win a game of trivia?',

  'Who is the most likely to win the upcoming game?',
  'Who is the most likely to win at a game of Pokémon TCG?',
  'Who has the most valuable card in their collection?',
  'Who is the best at building decks?',
  'Who has won the most games?',
  'Who has the largest collection of cards?',
  'Who is the most knowledgeable about Magic the Gathering lore?',
  'Who is the most strategic?',
  'Who is the most likely to trade away their most valuable card for something silly?',
  'Who is the most competitive?',
  'Who would be the most creative when it comes to making up new Magic the Gathering rules?',
  'Who is the most likely to organize a Magic the Gathering draft tournament?',
  'Who is the most enthusiastic about opening booster packs?',
  'Who has the most unique and unusual Magic the Gathering deck?',
  'Who is the most likely to cosplay as their favorite Magic the Gathering character?',
  'Who is the most likely to forget to bring their Magic the Gathering deck to a game night?',
  'Who is the most generous when it comes to lending out their decks?',
  'Who is the most likely to start their own Magic the Gathering YouTube channel?',
  'Who is the most skilled at bluffing during a game of Magic the Gathering?',
  'Who is the most likely to spend all their money on Magic the Gathering cards?',
  'Who is the most likely to rage quit during a game of Magic the Gathering?',
  'Who is the most likely to win in a Magic the Gathering trivia contest?',
  'Who is the most likely to build a themed Magic the Gathering deck?',
  'Who is the most likely to organize a Magic the Gathering cube draft?',
  'Who is the most likely to teach new players how to play Magic the Gathering?',
  'Who is the most likely to build a commander deck with a ridiculous theme?',
  'Who is the most likely to collect foreign-language Magic the Gathering cards?',
  'Who is the most likely to participate in a Magic the Gathering charity event?',
  'Who is the most likely to cosplay as their Magic the Gathering commander?',
  'Who is the most likely to organize a Magic the Gathering charity tournament?',
];

export const Trivia = () => {
  const { setPlaying, goToStart } = useGlobalSettings();

  const [randomQuestion, setRandomQuestion] = useState(
    questions[Math.floor(Math.random() * questions.length)]
  );

  const setUniqueRandomQuestion = () => {
    let newRandomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    while (newRandomQuestion === randomQuestion) {
      newRandomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
    }
    setRandomQuestion(newRandomQuestion);
  };

  return (
    <div
      className="absolute flex justify-center items-center w-full h-full portrait:h-[100dvw] portrait:w-[100dvh] z-50 bg-primary-dark overflow-hidden"
      onClick={() => setPlaying(true)}
    >
      <button
        className="absolute flex top-4 left-4 rounded-lg px-2 py-1 justify-center bg-primary-main text-text-primary text-xs  duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark"
        onClick={goToStart}
      >
        <div className="text-xl leading-[0.80rem]">{'<'}&nbsp;</div>
        Back
      </button>

      <button
        className="absolute flex top-4 right-4 rounded-lg px-2 py-1 justify-center bg-primary-main text-text-primary text-xs  duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark"
        onClick={(e) => {
          e.stopPropagation();
          setUniqueRandomQuestion();
        }}
      >
        Reroll
      </button>

      <div className="size-full flex flex-col  justify-between items-center whitespace-nowrap pointer-events-none webkit-user-select-none text-wrap text-center py-[10vmin] px-[10vmax]">
        <div className="text-[6vmin]">Decide who starts by answering:</div>
        <div className="flex flex-col">
          <div className="text-[8vmin] rotate-180 text-text-primary opacity-60">
            {randomQuestion}
          </div>
          <div className="text-[8vmin]">{randomQuestion}</div>
        </div>

        <div className="text-[6vmin]">(Tap the screen to dismiss)</div>
      </div>
    </div>
  );
};
