import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F7F7F7',
    backgroundColor: '#E7EFFF',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor:'#F7F7F7',
    width:300,
    padding:4,
    borderRadius:10,
    textAlign:'center'
  },
  openDrawer: {
    backgroundColor:'#3e5f8f',
    position:'absolute',
    right:0,
    bottom:0,
    marginBottom:110,
    width:80,
    borderColor:'#cdcdcd',
    borderTopLeftRadius:100,
    borderBottomLeftRadius:100,
    opacity:0.7
  }

});