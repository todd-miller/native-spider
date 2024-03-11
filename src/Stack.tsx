import { Card } from './Card';
import { useSelector } from '@xstate/react';
import { GameContext } from './game/game.machine';


interface Card {
  x: number;
  y: number;
  hidden: boolean;
  stack: number;
  label: string;
  suit: string;
}

/*
 * I'm not sure Stack should be anthing but two mappings, I think cards should
 * carry all their information
 */
export const Stack = ({ index }) => {
  const gameRef = GameContext.useActorRef();
  const { hidden, visible, padding, width } = useSelector(gameRef,
    (snapshot) => {
      const { hidden, visible } = snapshot.context.game.stacks[index]
      const { padding, stack } = snapshot.context.dimensions; 
      return { hidden, visible, padding, ...stack };
    }
  );

  return (
    <>
      { hidden.map((card, i) => <Card key={i} card={card} hidden />)}
      { visible.map((card, i) => <Card key={i} card={card} />) }
    </>
  );
};
