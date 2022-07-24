import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList, TextInput } from 'react-native';

import { useQuery, gql } from '@apollo/client';
import usePokemonSearch from './usePokemonSearch';
import pokegif from '../assets/chiko.gif'
import pokeico from '../assets/navicon.png'


import PokemonCard from './PokemonCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const POKEMON = gql`
  query samplePokeAPIquery ($offset: Int) {
  pokemon_v2_pokemon(limit: 15,offset: $offset){
    name
    id
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
  }
}
`

export default function PokemonList({ navigation }) {
  
  const [offst, setOffset] = useState(0)
  const { loading, error, data } = useQuery(POKEMON, {variables: { "offset": offst }});
  const [text, onChangeText] = useState('pi')
  const [pokemons, setPokemons] = useState([]);
  const loadMore = () => {
    !loading && setOffset(offst+15)
  }

  useEffect( () => {
    if(data && Object.keys(data)?.length>0){
      setPokemons([...pokemons,...data.pokemon_v2_pokemon])
    }
     
  }, [data])

  const renderData = ({ item, index }) => {
    return (
      <PokemonCard 
      item = { item }
      navigation={ navigation }
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* <View style={{height:'10%',backgroundColor:'#E4EAFF',alignItems:'center'}}>
        <Text>Buscador</Text>
      </View> */}
      {/* <TextInput
        value={text}
        onChangeText={onChangeText}
        placeholder='Busca un Pokémon'
        maxLength={12}
        /> */}
      {loading && pokemons?.length===0 ? 
        <View>
          <Image
          source={pokegif}
          style={{
            height: 179,
            width: 320,
            marginTop:100
          }}
          />
        </View>
        :
        <FlatList
          data={pokemons}
          keyExtractor={(pokemon) => pokemon.id}
          ListHeaderComponent={() =>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 10,paddingTop:40, textAlign:'center' }}>VoiceDex</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom:10 }}>Pokédex con Voz</Text>
            </View>
          }
          ListFooterComponent={()=> loading && <View>
            <Image
            source={pokegif}
            style={{
              height: 179,
              width: 350,
              marginTop:10,
              marginBottom:30
            }}
            />
            </View>
            }
          numColumns={3}
          contentContainerStyle={{ alignItems: 'center' }}
          onEndReachedThreshold={0.2}
          onEndReached={()=>{
            loadMore()
          }}
          renderItem={renderData}
        />
      }
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
    // backgroundColor: '#F7F7F7',
    backgroundColor: '#E4EAFF',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

