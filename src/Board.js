import { View, Text } from 'react-native';
import { styles } from "./styles";
import { Card } from './Card';
import { Lane } from './Lane';
import { GameContext } from './game/game.machine';
import { useSelector } from '@xstate/react';



export const Board = () => {
  const gameRef = GameContext.useActorRef();
  const card = useSelector(gameRef, (snapshot) =>  snapshot.context.card);

  const startGame = (e) => gameRef.send({
    type: "START_GAME",
    payload: e.nativeEvent.layout 
  });


  return (
    <View onLayout={startGame} style={styles.container}>
        { 
          [...Array(10)].map((_, i) => <Lane key={i} x={20+ (i*80)} />)
        }
        <Card width={card.width} height={card.height} radius={10} />
    </View>
  )
}
