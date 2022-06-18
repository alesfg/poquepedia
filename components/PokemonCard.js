import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../assets/colors'

export default function PokemonCard({ item, navigation }) {
  const { id, name } = item
  const type = item.pokemon_v2_pokemontypes[0].pokemon_v2_type.name
  const [imageUri, setImageUri] = useState(null)

  const getImage = () => {
    setImageUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
  }


  useEffect(() => {
    getImage()
  }, [])

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Pokemon Details", {
        screen: 'Pokemon Details',
        type:type,
        id: id
      })}
    >

      <View style={[styles.card, { borderColor: colors[type] }]}>
        <Text style={[styles.digits, { color: colors[type] }]}>
          #
          {id.toString().length == 1 ? '00' : ''}
          {id.toString().length == 2 ? '0' : ''}
          {id}
        </Text>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />
        <View style={[styles.nameContainer, { backgroundColor: colors[type] }]}>
          <Text style={[styles.name]}> 
            {name.length>11 ? name.substring(0,11) :
              name.charAt(0).toUpperCase() + name.slice(1)
            }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
