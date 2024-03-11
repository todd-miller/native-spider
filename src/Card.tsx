import { useSelector } from '@xstate/react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { GameContext } from './game/game.machine';
import { CARD_IMAGES, CARD_BACK } from './constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';


export const Card = ({ card, hidden = false }) => {
  const gameRef = GameContext.useActorRef();
  const { width, height, radius } = useSelector(gameRef, (snapshot) => snapshot.context.dimensions.card);
  const image = hidden 
    ? CARD_BACK 
    : CARD_IMAGES[`${card.label}_of_${card.suit}`];

  
  // TODO - these things sound probably be handled by xstate
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: card.x, y: card.y });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.1 : 1 )}
      ],
    }
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      isPressed.value = true;
    })
    .onChange((e) => {
      'worklet';
      offset.value = {
        x: e.changeX + offset.value.x,
        y: e.changeY + offset.value.y,
      };
    })
    .onFinalize(() => {
      'worklet';
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.Image 
        source={image}
        style={[{ width, height, zIndex: 10, borderRadius: radius }, animatedStyles]}
      />
    </GestureDetector>
  )
};
