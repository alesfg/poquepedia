import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import pokeico from '../assets/favicon.png'


export default function Favorites({navigation}) {

  console.log("Favs component")
  const [favs, setfavs] = useState([])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@favs')
      if(value !== null) {
        // value previously stored
        console.log(value)
        value.forEach(fav => {
          console.log(fav)
        });
        setfavs([...favs,value])
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData
    favs.forEach(e => {
      console.log(e)
    });
  }, [])
  

  return (
  <View style={styles.container}>
    
    <Text style={{fontWeight:'bold', fontSize:22, paddingBottom:50}}>¡Favoritos estará disponible en la próxima actualización!</Text>
    <Text style={{fontSize:50}}>⭐</Text>
    <Text style={{ fontSize:16, marginTop:50}}>Ayúdanos dejando sugerencias en Play Store.</Text>
    <Text style={{ fontSize:20}}>Te escuchamos 😀🔥</Text>
    <View style={styles.openDrawer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={{paddingLeft:3,paddingBottom:1,paddingTop:1}}>
            <Image source={pokeico}/>
          </View>
        </TouchableOpacity>
      </View>
  </View>
);
}


const styles = StyleSheet.create({
container: {
  backgroundColor: '#E4EAFF',
  flex: 1,
  width: '100%',
  padding:20,
  alignItems: 'center',
  justifyContent: 'center',
},openDrawer: {
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
})


