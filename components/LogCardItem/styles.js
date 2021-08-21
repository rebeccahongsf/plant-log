import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  left: {
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
  },
  month: {
    fontWeight: '800',
    textAlign: 'center',
  },
  day: {
    fontSize: 25,
    textAlign: 'center',
  },
  year: {
    fontWeight: '800',
    textAlign: 'center',
  },
  right: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    flex: 1,
    alignSelf: 'stretch',
  },
  time: {
    color: '#5a5a5a',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
});

export default styles;
