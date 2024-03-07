import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';


export const Card = ({ width, height, radius }) => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1 )}
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
      isPressed.value = false;
      if (offset.value.x < 160) {
        offset.value.x = 20; 
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.Image 
        source={require("../assets/card_back.png")}
        style={[{ width, height, zIndex: 10, borderRadius: radius }, animatedStyles]} 
      />
    </GestureDetector>
  )
};
