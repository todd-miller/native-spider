import { View } from 'react-native';
import { styles } from "./styles";
import { Card } from './Card';
import { Lane } from './Lane';
import { GameContext } from './game/game.machine';



export const Board = () => {
  const gameRef = GameContext.useActorRef();

  const log = (e, parent) => {
    console.log(`${parent} bounds: `, e.nativeEvent.layout);
    gameRef.send({ type: "LOG" })
  }
  return (
    <View onLayout={(e) => log(e, "background")} style={styles.container}>
        { 
          [...Array(10)].map((_, i) => <Lane key={i} x={20+ (i*80)} />)
        }
        <Card width={60} height={80} radius={10} />
    </View>
  )
}
