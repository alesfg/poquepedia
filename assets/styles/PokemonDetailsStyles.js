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
      paddingBottom:10,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    infoCard: {
      margin: 8,
      backgroundColor: '#FFFFFF',
      flex: 1,
      borderRadius: 25,
      alignItems: 'center',
      padding: 20,
    },
    arrows: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 60
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      height: 30,
      alignItems: 'center'
    },
    genus: {
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 20,
      marginBottom:15,
      textAlign: 'center'
    },
    stats: {
      left: 0,
      marginLeft: 1,
      marginRight: 1,
      width: '50%',
      fontWeight: "bold",
      fontSize: 16
    },
    span: {
      fontWeight:'bold',
      fontSize:16,
      marginHorizontal:10
    },
    image: {
      width: 220,
      height: 220,
      marginTop: -200
    },
    sprite: {
      width: 90,
      height: 90
    },
    subtitle: {
      fontWeight: 'bold',
      fontSize: 21,
      marginTop: 20,
      marginBottom:15,
      textAlign: 'left'
    },
    type: {
      borderRadius: 10,
      padding: 5,
      marginVertical:7,
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
      top: 40,
      width: '82%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 1
    }
  })