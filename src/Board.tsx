import { View, LayoutChangeEvent } from 'react-native';
import { styles } from "./styles";
import { Card } from './Card';
import { GameContext } from './game/game.machine';
import { useSelector } from '@xstate/react';


export const Board = () => {
  const gameRef = GameContext.useActorRef();
  const { game } = useSelector(gameRef, (state) => state.context);
  
  const startGame = (e: LayoutChangeEvent) => gameRef.send({
    type: "START_GAME",
    payload: e.nativeEvent.layout 
  });


  return (
    <View onLayout={startGame} style={styles.container}>
        { 
          game.cards.map((card, index) => {
            return <Card id={card.id} key={index} /> 
          })
        }
    </View>
  )
}
