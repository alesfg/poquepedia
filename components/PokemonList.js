import React from 'react';
import { Text, Image, View, FlatList, Dimensions } from 'react-native';
import { styles } from '../assets/styles/PokemonListStyles'
import pokegif from '../assets/chiko.gif'
import pokeico from '../assets/navicon.png'
import { pokemon } from '../assets/pokeNames.json'
import PokemonCard from './PokemonCard';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function PokemonList({ navigation }) {

  const renderData = ({ item, index }) => {
    return (
      <PokemonCard 
      item = { item }
      navigation={ navigation }
      />
    )
  }

const { width } = Dimensions.get('window');
  

  return (
    <View style={styles.container}>
        <FlatList
          data={pokemon}
          keyExtractor={(pokemon) => pokemon.id}
          ListHeaderComponent={() =>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 28, margin: 10,paddingTop:40, textAlign:'center' }}>VoiceDex</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom:10 }}>Pokédex con Voz</Text>
            </View>
          }
          ListFooterComponent={()=> 
          <View>
            <Image
            source={pokegif}
            style={{
              height: 179,
              width: width,
              marginTop:10,
              marginBottom:30
            }}
            />
            </View>
            }
          numColumns={3}
          initialNumToRender={15}
          contentContainerStyle={{ alignItems: 'center' }}
          onEndReachedThreshold={0.2}
          onEndReached={()=>{
            // loadMore() no existe
          }}
          renderItem={renderData}
        />
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