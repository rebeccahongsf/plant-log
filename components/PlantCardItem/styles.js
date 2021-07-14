import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    aspectRatio: 1 / 1,
  },
  detailsContainer: {
    marginTop: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  avatar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'grey',
  },
});

export default styles;
