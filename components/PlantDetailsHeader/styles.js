import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    padding: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: '100%',
    zIndex: 1,
  },
  avatar: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  type: {
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 5,
    width: '100%',
  },
});

export default styles;
