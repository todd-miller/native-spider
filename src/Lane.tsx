import { View } from 'react-native';
import { styles } from './styles';

export const Lane = ({ x, deckSize }) => {
  console.log("deckSize: ", deckSize);
  return (<View style={{ ...styles.lane, left: x }} />);
};
