import React, { useState } from 'react';
import { Text, Image, View, FlatList, Dimensions, TextInput } from 'react-native';
import { styles } from '../assets/styles/PokemonListStyles'
import pokegif from '../assets/chiko.gif'
import pokeico from '../assets/navicon.png'
import { pokemon } from '../assets/pokeNames.json'
import PokemonCard from './PokemonCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';




export default function PokemonList({ navigation }) {

  const { width } = Dimensions.get('window');

  const [filterData, setfilterData] = useState(pokemon)

  const searchName = (input) => {
    let filtered = [];
    pokemon.filter((poke) => {
      poke.name.includes(input.toLowerCase()) && filtered.push(poke)
    })
    setfilterData(filtered)
  }


  const renderData = ({ item }) => {
    return (
      <PokemonCard
        item={item}
        navigation={navigation}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={{
        paddingTop: 50, padding: 10, justifyContent: 'center',
        display: 'flex', flexDirection: 'row', alignItems: 'center'
      }}>
        <AntDesign name='search1' size={20} color='#777777' style={{ paddingRight: 10 }} />
        <TextInput
          placeholder='Búsqueda por nombre'
          onChangeText={(input) => searchName(input)}
          maxLength={20}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filterData}
        keyExtractor={(pokemon) => pokemon.id}
        ListHeaderComponent={() =>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 10, textAlign: 'center' }}>VoiceDex</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Pokédex con Voz</Text>

          </View>
        }
        ListFooterComponent={() =>
          <View>
            <Image
              source={pokegif}
              style={{
                width: width,
              }}
            />
          </View>
        }
        numColumns={3}
        initialNumToRender={15}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={800}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={renderData}
      />
      <View style={styles.openDrawer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={{ paddingLeft: 3, paddingBottom: 1, paddingTop: 1 }}>
            <Image source={pokeico} />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}