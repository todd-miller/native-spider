import { View, LayoutChangeEvent } from 'react-native';
import { styles } from "./styles";
import { Card } from './Card';
import { Lane } from './Lane';
import { GameContext, DECK_SIZES } from './game/game.machine';
import { useSelector } from '@xstate/react';



export const Board = () => {
  const gameRef = GameContext.useActorRef();
  const { padding, card, piles }= useSelector(gameRef, (snapshot) =>  snapshot.context.dimensions);
  
  const startGame = (e: LayoutChangeEvent) => gameRef.send({
    type: "START_GAME",
    payload: e.nativeEvent.layout 
  });


  return (
    <View onLayout={startGame} style={styles.container}>
        { 
          DECK_SIZES.map((deckSize, pileIndex) => (
            <Lane 
              key={pileIndex} 
              deckSize={deckSize} 
              x={padding + (pileIndex * piles.width)} 
            />
          ))
        }
        <Card width={card.width} height={card.height} radius={10} />
    </View>
  )
}
