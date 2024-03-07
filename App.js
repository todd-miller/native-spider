import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from "./src/styles";
import { Card } from './src/Card';
import { Lane } from './src/Lane';

export default function App() {
  const log = (e, parent) => {
    console.log(`${parent} bounds: `, e.nativeEvent.layout);
  }
  
  return (
    <GestureHandlerRootView>
      <View onLayout={(e) => log(e, "background")} style={styles.container}>
        { 
          [...Array(10)].map((_, i) => <Lane key={i} x={20+ (i*80)} />)
        }
        <Card width={60} height={80} radius={10} />
      </View>
    </GestureHandlerRootView>
  );
};

