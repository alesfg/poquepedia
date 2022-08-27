import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../assets/colors'
import { styles } from '../assets/styles/PokemonCardStyles'
 

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
        id: id,
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