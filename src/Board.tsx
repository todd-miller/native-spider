import { View, LayoutChangeEvent } from 'react-native';
import { styles } from "./styles";
import { Stack } from './Stack';
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
          game.stacks.map((_, index) => {
            return <Stack key={index} index={index} /> 
          })
        }
    </View>
  )
}
