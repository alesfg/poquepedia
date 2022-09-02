import { StyleSheet,Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor:'#F7F7F7',
    marginVertical: 10,
    borderRadius: 10,
    width: width / 3.4,
    height: width / 3,
    justifyContent: 'center',
    borderWidth: 1.5,
    margin: 3,
  },
  image: {
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
    justifyContent:'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: -1
  },
});