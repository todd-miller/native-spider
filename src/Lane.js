import { View } from 'react-native';
import { styles } from './styles';

export const Lane = ({ x }) => (
  <View style={{ ...styles.lane, left: x }} />
);
