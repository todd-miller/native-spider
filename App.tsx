import { Board } from './src/Board';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GameContext } from './src/game/game.machine';


export default function App() {
  return (
    <GestureHandlerRootView>
      <GameContext.Provider>
        <Board />
      </GameContext.Provider>
    </GestureHandlerRootView>
  );
};

