import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    screen: {
      height: height,
      width: width,
      alignSelf: 'center',
      flex: 1
    },
    name: {
      paddingTop: 45,
      paddingLeft: 21,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    infoCard: {
      margin: 14,
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      padding: 20,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      height: 30,
      alignItems: 'center'
    },
    stats: {
      left: 0,
      marginLeft: 1,
      marginRight: 1,
      width: '50%',
      fontWeight: "bold",
      fontSize: 16
    },
    image: {
      width: 200,
      height: 200,
      marginTop: -170
    },
    sprite: {
      width: 60,
      height: 60
    },
    type: {
      borderRadius: 10,
      padding: 5,
      marginHorizontal: 5,
      textTransform: 'capitalize'
    },
    habitat: {
      paddingTop: 5,
      fontFamily: 'monospace'
    },
    openDrawer: {
      backgroundColor: '#3e5f8f',
      position: 'absolute',
      right: 0,
      bottom: 0,
      marginBottom: 110,
      width: 80,
      borderColor: '#cdcdcd',
      borderWidth: 0.1,
      borderTopLeftRadius: 100,
      borderBottomLeftRadius: 100,
      opacity: 0.7
    },
    fav: {
      position: 'absolute',
      top: 100,
      opacity: 0.8,
      marginLeft: 35,
      width: '82%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1
    }
  })