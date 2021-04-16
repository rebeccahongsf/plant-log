import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 25,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    paddingLeft: 5,
    justifyContent: 'space-around',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
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
});

export default styles;
