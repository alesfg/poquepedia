import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'

import { useQuery, gql } from '@apollo/client';
import { backgroundColors, stats, emojis, colors } from '../assets/colors'
import pokeball_bg from '../assets/pokeball_bg.png'
import pokegif from '../assets/image11.gif'
import pokeico from '../assets/navicon.png'
import { translateHabitat, translateType } from '../assets/translate'

import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GET_DETALLES = gql`
query getDetalles($_eq: Int) {
  pokemon_v2_pokemonspecies(where: {id: {_eq: $_eq}}) {
    pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 7}}, limit: 1) {
      flavor_text
    }
    pokemon_v2_pokemonshape {
      name
    }
    pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 7}}) {
      genus
    }
    name
    pokemon_v2_pokemons_aggregate {
      nodes {
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        height
        weight
      }
    }
    pokemon_v2_pokemons(where: {id: {_eq: $_eq}}) {
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
    is_legendary
    pokemon_v2_pokemonhabitat {
      name
    }
    generation_id
    evolves_from_species_id
  }
}
`
const STORAGE_FAV = '@favourites';


const PokemonDetails = ({ route, navigation }) => {

  const { id } = route.params
  const [types, settypes] = useState([])
  const [name, setname] = useState()
  const [genus, setgenus] = useState()
  const [flavor, setflavor] = useState()
  const [habitat, sethabitat] = useState()
  const [hp, sethp] = useState()
  const [attack, setattack] = useState()
  const [defense, setdefense] = useState()
  const [speed, setspeed] = useState()
  const [islegendary, setislegendary] = useState()
  const [tinyGifUri, settinyGifUri] = useState(null)
  const [tinyBackGifUri, settinyBackGifUri] = useState(null)
  const [tinyImgUri, settinyImgUri] = useState(null)
  const [tinyBackImgUri, settinyBackImgUri] = useState(null)
  const [wgpoke, setweight] = useState()
  const [hgpoke, setheight] = useState()
  const [fav, setFav] = useState(false)

  const { loading, error, data } = useQuery(GET_DETALLES, {
    variables: { "_eq": id },
  });
  const Progress = ({ step, stat, height }) => {
    return (
      <>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, width: 30 }}>{step}</Text>
        <View style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderTopEndRadiusRadius: height,
          borderTopRightRadius: height,
          overflow: 'hidden',
          width: 110,
          alignSelf: 'center',
        }}>
          <View style={{
            height,
            width: step,
            borderTopEndRadiusRadius: height,
            borderTopRightRadius: height,
            backgroundColor: stats[stat],
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
            top: 0
          }}></View>
        </View>
      </>
    )
  }
  const imageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  const speak = () => {
    Speech.speak(name + "." +
      data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text, {
      rate: 1.1,
      language: 'es-ES',
      pitch: 1,
      voice: "es-es-x-eed-network"
    });
  };

  if (!loading) {
    if (data && Object.keys(data)?.length > 0 && name != undefined) {
      console.log("EL loading mas data >")

      speak();
    }
  }

  useEffect(() => {
    console.log("Use Effect data")
    if (route.params?.type) {
      settypes([route.params.type])
    }
    if (data && Object.keys(data)?.length > 0) {
      setname(data.pokemon_v2_pokemonspecies[0].name)
      settypes([data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name, data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name])
      setflavor(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text.replace(/\s+/g, ' ').replace(".", ".\n"))
      setgenus(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesnames[0].genus)
      sethabitat(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonhabitat?.name)
      sethp(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[0].base_stat)
      setattack(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[1].base_stat)
      setdefense(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[2].base_stat)
      setspeed(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[5].base_stat)
      setislegendary(data.pokemon_v2_pokemonspecies[0].is_legendary)
      setweight(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0]?.weight)
      setheight(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0]?.height)
      settinyGifUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`)
      settinyBackGifUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`)
      settinyImgUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
      settinyBackImgUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`)
      navigation.addListener('beforeRemove', (e) => {
        Speech.stop()
      })
      // getFavs(id)
    }
    if (Speech.isSpeakingAsync) {
      Speech.stop()
    }
  }, [data])

  const goPokemonList = () => { navigation.navigate("Pokemon List") }
  const goNextPokemon = () => {
    navigation.navigate("Pokemon Details", {
      id: id + 1
    })
  }
  const goPreviousPokemon = () => {
    navigation.navigate("Pokemon Details", {
      id: id - 1
    })
  }
  const goRandomPokemon = () => {
    navigation.navigate("Pokemon Details", {
      id: Math.ceil(Math.random() * 840)
    })
  }
  const toggleFav = async () => {
    /* await AsyncStorage.setItem(STORAGE_FAV,`${id}`);
    const storageSample = await AsyncStorage.getItem(STORAGE_FAV)
    alert(storageSample) */
  }


  return (
    <View style={[styles.screen, { backgroundColor: backgroundColors[types[0]] }]}>
      <View style={[styles.name]}>
        {/* GOBACK/NAME */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={goPokemonList}
          >
            <AntDesign name="arrowleft" size={30} color="#fff" />
          </TouchableOpacity>
          {!loading && name != undefined &&
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: "white", paddingLeft: 10 }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
          }
        </View>
        {/* ID */}
        <Text style={{ fontWeight: 'bold', fontSize: 24, color: "white", alignSelf: 'flex-end', paddingRight: 30 }}>
          # {id.toString().length == 1 ? '00' : ''}
          {id.toString().length == 2 ? '0' : ''}
          {id}
        </Text>
      </View>
      {/* FAV and RANDOM*/}
      <View style={styles.fav}>

        <TouchableOpacity
          onPress={goRandomPokemon}>
          <AntDesign name="retweet" size={35} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFav()}>
          <AntDesign name="heart" size={35} color="red" />
        </TouchableOpacity>

      </View>
      {/* BG IMG */}
      <View style={{ opacity: 0.12, paddingTop: 20 }}>
        <ImageBackground source={pokeball_bg} style={{
          width: 190, height: 140, alignSelf: 'flex-end'
        }}
          resizeMode='contain'
        />
      </View>
      {/* PREVIOUS/NEXT POKEMON */}
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 70, paddingBottom: 30 }}>
        {id > 1 &&
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}
            onPress={() => goPreviousPokemon()}
          >
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
        }

        {id < 899 &&
          <TouchableOpacity style={{ right: 0, position: 'absolute', paddingRight: 70 }}
            onPress={() => goNextPokemon()}
          >
            <AntDesign name="right" size={24} color="#fff" />
          </TouchableOpacity>
        }

      </View>
      {/* LEGENDARIO */}
      {islegendary &&
        <View style={{ position: 'absolute', right: 99, top: 48 }}>
          <AntDesign name="dingding" size={24} color='#000' />
        </View>
      }
      <View style={styles.infoCard}>
        {/* INFOCARD */}
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
        <View style={{ flexDirection: 'row' }}>
          <View>
            {types[0] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[0]] }]}> {translateType(types[0])} </Text>}
          </View>
          <View>
            {types[1] && <Text style={[styles.type, { backgroundColor: backgroundColors[types[1]] }]}> {translateType(types[1])} </Text>}
          </View>
        </View>
        {/* LOADING */}
        {!(data && Object.keys(data)?.length > 0) ?
          <View>
            <Image
              source={pokegif}
              style={{
                height: 179,
                width: 320,
                marginTop: 100
              }}
            />
          </View>
          :
          <View>
            {/* FLAVOR GENUS */}
            <Text style={{ color: backgroundColors[types[0]], fontWeight: 'bold', fontSize: 20, padding: 18, textAlign: 'center' }}>
              {types[1] && emojis[types[1]]} {genus} {emojis[types[0]]}
            </Text>
            <Text selectable={true} selectionColor={'gray'}>
              {flavor}
            </Text>

            {/* SPRITES */}
            {id < 650 &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 7 }}>
                <Image
                  source={{ uri: tinyGifUri }} style={styles.sprite} resizeMode='contain' />
                <Image
                  source={{ uri: tinyBackGifUri }} style={styles.sprite} resizeMode='contain' />
              </View>
            }
            {id > 649 &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 7 }}>
                <Image
                  source={{ uri: tinyImgUri }} style={styles.sprite} resizeMode='contain' />
                <Image
                  source={{ uri: tinyBackImgUri }} style={styles.sprite} resizeMode='contain' />
              </View>
            }
            {/* STATS */}
            {height >= 750 ?
            <View style={{ marginTop: 5 }}>
              <View style={styles.row}>
                <Text style={[styles.stats, { color: stats['hp'] }]}>PV</Text>
                <Progress step={hp} stat={'hp'} height={6} />
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats, { color: stats['attack'] }]}>Ataque</Text>
                <Progress step={attack} stat={'attack'} height={6} />
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats, { color: stats['defense'] }]}>Defensa</Text>
                <Progress step={defense} stat={'defense'} height={6} />
              </View>
              <View style={styles.row}>
                <Text style={[styles.stats, { color: stats['speed'] }]}>Velocidad</Text>
                <Progress step={speed} stat={'speed'} height={6} />
              </View>
            </View>
            : <></>}
            {/* PESO ALTURA */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
              <View style={{ marginRight: 30 }}>
                <Text style={{ fontWeight: 'bold', color: colors[types[0]] }}>{wgpoke / 10} kg</Text>
              </View>
              <View style={{ width: 2, height: 20, backgroundColor: backgroundColors[types[0]] }}>
                {/* Separator */}
              </View>
              <View style={{ marginLeft: 30 }}>
                <Text style={{ fontWeight: 'bold', color: colors[types[0]] }}>{hgpoke / 10} m</Text>
              </View>
            </View>

              {/* MORE DETAILS */}
              <TouchableOpacity>
                <View style={{marginTop:20,backgroundColor:'#BFD0CA', borderRadius:10, width:150, display:'flex', alignSelf:'center'}}>
                  <Text style={{textAlign:'center',padding:10}}>Más detalles</Text>
                </View>
              </TouchableOpacity>
          </View>
        }
      </View>
      <View style={styles.openDrawer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={{ padding: 3 }}>
            <Image source={pokeico} />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PokemonDetails
const { width, height } = Dimensions.get('window');

console.log("wid: "+ width, "hei: "+height)

const styles = StyleSheet.create({
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
    margin: 10,
    backgroundColor: '#FFFFFF',
    // height: '58%',
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
