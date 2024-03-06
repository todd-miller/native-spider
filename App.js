import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styles } from "./src/styles";
import { Ball } from './src/Ball';

export default function App() {
  
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Ball width={60} height={80}/>
        <Ball width={60} height={80}/>
      </View>
    </GestureHandlerRootView>
  );
}

