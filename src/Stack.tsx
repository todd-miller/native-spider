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

// TODO: I'm not sure Stack should exist as a view item
export const Stack = ({ index }) => {
  const gameRef = GameContext.useActorRef();
  const { hidden, visible } = useSelector(gameRef,
    (snapshot) => snapshot.context.game.stacks[index]
  );

  return (
    <>
      { hidden.map((card, i) => <Card key={i} card={card} hidden />)}
      { visible.map((card, i) => <Card key={i} card={card} />) }
    </>
  );
};
