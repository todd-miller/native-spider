import { useSelector } from '@xstate/react';
import { GameContext } from './game/game.machine';
import { View, Image } from 'react-native';
import { CARD_IMAGES, CARD_BACK } from './constants';
import { Card as CardType } from './types';


const compareCard = (prevCard: CardType, nextCard: CardType) => prevCard.position == nextCard.position;

export const Card = ({ id }) => {
  const gameRef = GameContext.useActorRef();
  const { width, height, radius } = useSelector(gameRef, (snapshot) => snapshot.context.dimensions.card);
  const card = useSelector(gameRef, (snapshot) => ( 
    snapshot.context.game.cards.filter((card) => card.id === id)[0]),
    compareCard
  );

  const { x, y, z} = card.position;
  const imageString = card.hidden ? '?' : `${card.label}_of_${card.suit}`;
  const image = card.hidden 
    ? CARD_BACK 
    : CARD_IMAGES[imageString];


  const touchStart = (e: any) => {
    e.persist();
    gameRef.send({ type: "START_MOVE", id: card.id, event: e });
  };
  const touchMove = (e: any) => {
    e.persist();
    gameRef.send({ type: "MOVE", id: card.id, event: e })
  };
  const touchEnd = (e: any) => {
    e.persist();
    gameRef.send({ type: "END_MOVE", id: card.id, event: e })
  };

  return (
    <View 
      style={{ position: 'absolute', width, height, top: y, left: x, zIndex:z }}
      onPointerDown={touchStart}
      onTouchStart={touchStart}
      onPointerMove={touchMove} 
      onTouchMove={touchMove} 
      onPointerUp={touchEnd}
      onTouchEnd={touchEnd}>
      <Image
        style={{ position: 'relative', width, height, borderRadius: radius }}
        testID={card.id}
        source={image}/>
    </View>
  )
};
