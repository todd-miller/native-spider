import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 100,
    backgroundColor: "#7A1B07"
  },
  lane: {
    zIndex: 1, 
    width: 1.3*60,
    height: 500,
    opacity: 0.5,
    position: 'absolute',
    backgroundColor: "blue",
    borderWidth: "1px",
    borderColor: "green",
    borderStyle: "solid"
  },
  text: {
    color: '#000'
  },
});
