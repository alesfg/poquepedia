import { StyleSheet,Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor:'#F7F7F7',
    marginVertical: 10,
    borderRadius: 15,
    width: width / 3.5,
    height: width / 3,
    justifyContent: 'center',
    // backgroundColor: 'white',
    borderWidth: 1.5,
    // elevation: 1,
    margin: 3,
  },
  image: {
    // backgroundColor:'lightgreen',
    flex: 3,
  },
  digits: {
    fontSize: 12,
    flex: 0.6,
    paddingRight: 10,
    paddingTop: 1,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 16,
    textAlign: 'center',
  },
  nameContainer: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: -1
  },
});