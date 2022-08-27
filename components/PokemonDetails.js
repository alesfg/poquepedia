import React, { useState, useEffect } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client';
import { backgroundColors, stats, emojis, colors } from '../assets/colors'
import Progress from './ProgressBars';
import pokeball_bg from '../assets/pokeball_bg.png'
import pokegif from '../assets/image11.gif'
import pokeico from '../assets/navicon.png'
import { translateHabitat, translateType, code, voice } from '../assets/translate'
import { styles } from '../assets/styles/PokemonDetailsStyles';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';
import { GET_DETALLES } from '../querys/queryDetails';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const PokemonDetails = ({ route, navigation }) => {

  const { getItem: getLang } = useAsyncStorage('@lang');


  const { id } = route.params
  const [types, settypes] = useState([])
  const [name, setname] = useState()
  const [genus, setgenus] = useState()
  const [flavor, setflavor] = useState()
  const [habitat, sethabitat] = useState()
  const [hp, sethp] = useState()
  const [attack, setattack] = useState()
  const [defense, setdefense] = useState()
  const [specialattack, setspecialattack] = useState()
  const [specialdefense, setspecialdefense] = useState()
  const [speed, setspeed] = useState()
  const [islegendary, setislegendary] = useState()
  const [tinyGifUri, settinyGifUri] = useState(null)
  const [tinyBackGifUri, settinyBackGifUri] = useState(null)
  const [tinyshinyUri, settinyshinyUri] = useState(null)
  const [tinyBackShinyUri, settinyBackShinyUri] = useState(null)
  const [tinyImgUri, settinyImgUri] = useState(null)
  const [tinyBackImgUri, settinyBackImgUri] = useState(null)
  const [wgpoke, setweight] = useState()
  const [hgpoke, setheight] = useState()

  const [selectedLanguage, setSelectedLanguage] = useState()

  const readItemFromStorage = async () => {
    const lang = await getLang();
    setSelectedLanguage(lang);
  };

  const imageUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const iconuri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`

  const speak = (code, voice) => {
    Speech.speak(name + "." +
      data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts[0].flavor_text, {
      rate: 1.1,
      language: code,
      pitch: 1,
      voice: voice
    });
  };

  const { loading, error, data } = useQuery(GET_DETALLES, {
    variables: { "id": id, "lang": parseInt(selectedLanguage) }
  });

  useEffect(() => {
    readItemFromStorage();
  }, [])

  useEffect(() => {
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
      setspecialattack(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[3].base_stat)
      setspecialdefense(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[4].base_stat)
      setspeed(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0].pokemon_v2_pokemonstats[5].base_stat)
      setislegendary(data.pokemon_v2_pokemonspecies[0].is_legendary)
      setweight(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0]?.weight)
      setheight(data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons_aggregate.nodes[0]?.height)
      settinyGifUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`)
      settinyBackGifUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${id}.gif`)
      settinyImgUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
      settinyBackImgUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`)
      settinyshinyUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${id}.gif`)
      settinyBackShinyUri(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/${id}.gif`)
      navigation.addListener('beforeRemove', (e) => {
        Speech.stop()
      })
    }
    if (Speech.isSpeakingAsync) {
      Speech.stop()
    }
  }, [data])

  if (!loading) {
    if (data && Object.keys(data)?.length > 0 && name != undefined) {
      speak(code(selectedLanguage), voice(selectedLanguage));
    }
  }

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
      id: Math.ceil(Math.random() * 897)
    })
  }

  if (error) {
    console.error(error)
    return (
      <View>
        <Text>
          Error!
        </Text>
      </View>
    )
  }



  return (
    <View style={[styles.screen, { backgroundColor: backgroundColors[types[0]] }]}>
      <View style={[styles.name]}>
        {/* GOBACK / NAME / ID */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* LEGENDARIO */}
          {islegendary &&
            <View style={{ backgroundColor: '#000', borderRadius: 5, marginRight: 10, alignSelf: 'center', top: 2 }}>
              <Text style={{ color: '#F9CF30', fontWeight: 'bold', textAlignVertical: 'center', paddingHorizontal: 7, paddingVertical: 2 }}>LEGENDARIO</Text>
            </View>
          }
          <Text style={{ fontWeight: 'bold', fontSize: 24, color: "white", alignSelf: 'flex-end', paddingRight: 30 }}>
            # {id.toString().length == 1 ? '00' : ''}
            {id.toString().length == 2 ? '0' : ''}
            {id}
          </Text>
        </View>
      </View>
      {/* SCROLLVIEW */}
      <ScrollView>

        {/* BG IMG */}
        <View style={{ opacity: 0.12, paddingTop: 20 }}>
          <ImageBackground source={pokeball_bg} style={{
            width: 190, height: 140, alignSelf: 'flex-end'
          }}
            resizeMode='contain'
          />
        </View>
        {/* PREVIOUS/NEXT POKEMON */}
        <View style={styles.arrows}>
          {id > 1 &&
            <TouchableOpacity
              style={{ alignSelf: 'flex-start' }}
              onPress={() => goPreviousPokemon()}
            >
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
          }
          {id == 1 &&
            <TouchableOpacity
              style={{ alignSelf: 'flex-start' }}
            >
              <AntDesign name="left" size={24} color="transparent" />
            </TouchableOpacity>
          }

          {id < 898 &&
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => goNextPokemon()}
            >
              <AntDesign name="right" size={24} color="#fff" />
            </TouchableOpacity>
          }

        </View>
        {/* INFOCARD */}
        <View style={styles.infoCard}>
          {/* FAV and RANDOM*/}
          <View style={styles.fav}>

            <TouchableOpacity
              onPress={goRandomPokemon}>
              <AntDesign name="retweet" size={25} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity>
              <AntDesign name="heart" size={30}
                color={'#0B0B0B'}
              // color={fav !== true ?  '#0B0B0B' : 'red'}
              />
            </TouchableOpacity>

          </View>
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

          {!(data && Object.keys(data)?.length > 0)
            ?
            <View>
              <Image
                source={pokegif}
                style={{
                  height: 179,
                  width: 320,
                  marginTop: 50,
                  paddingBottom: 300,
                  marginBottom:100
                }}
              />
            </View>
            :
            <View>
              {/* FLAVOR GENUS */}
              <Text style={[{ color: backgroundColors[types[0]] }, styles.genus]}>
                {types[1] && emojis[types[1]]} {genus} {emojis[types[0]]}
              </Text>
              <View style={{ maxWidth: 310, height: 80 }}>
                <Text numberOfLines={3} ellipsizeMode='tail' selectable={true} selectionColor={'gray'} style={{ textAlign: 'justify' }}>
                  {flavor}
                </Text>
              </View>

              {/* SPRITES */}
              {id < 650 &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 15 }}>
                  <Image
                    source={{ uri: tinyGifUri }} style={styles.sprite} resizeMode='contain' />
                  <Image
                    source={{ uri: tinyBackGifUri }} style={styles.sprite} resizeMode='contain' />
                </View>
              }
              {id > 649 &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 15 }}>
                  <Image
                    source={{ uri: tinyImgUri }} style={styles.sprite} resizeMode='contain' />
                  <Image
                    source={{ uri: tinyBackImgUri }} style={styles.sprite} resizeMode='contain' />
                </View>
              }

              {/* STATS */}
              <View>
                <View>
                  <Text style={[{ color: colors[types[0]] }, styles.genus]}>Estadísticas</Text>
                </View>
                <View style={{ marginTop: 5, width: '100%', alignSelf: 'center' }}>
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
                    <Text style={[styles.stats, { color: stats['specialAttack'] }]}>Ataque especial</Text>
                    <Progress step={specialattack} stat={'specialAttack'} height={6} />
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.stats, { color: stats['specialDefense'] }]}>Defensa especial</Text>
                    <Progress step={specialdefense} stat={'specialDefense'} height={6} />
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.stats, { color: stats['speed'] }]}>Velocidad</Text>
                    <Progress step={speed} stat={'speed'} height={6} />
                  </View>
                </View>
              </View>

              {/* PESO ALTURA */}
              <View>
                <Text style={[{ color: colors[types[0]] }, styles.genus]}>Dimensiones</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 15 }}>
                <View>
                  <Text style={[{ color: backgroundColors[types[0]] }, styles.span]}>Peso</Text>
                  <View style={{ borderRadius: 10, padding: 5, backgroundColor: backgroundColors[types[0]], marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: '#000000' }}>
                      {wgpoke / 10} kg
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={[{ color: backgroundColors[types[0]] }, styles.span]}>Altura</Text>
                  <View style={{ borderRadius: 10, padding: 5, backgroundColor: backgroundColors[types[0]], marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', color: '#000000' }}>
                      {hgpoke / 10} m
                    </Text>
                  </View>
                </View>
              </View>

              {/* HABITAT */}
              {habitat &&
                <View style={{paddingBottom:30}}>
                  <View>
                    <Text style={[{ color: colors[types[0]] }, styles.genus]}>Hábitat</Text>
                  </View>
                  <View>
                    <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{translateHabitat(habitat)}</Text>
                  </View>
                </View>
              }

              {/* Shiny Sprites */}
              {id < 650 &&
                <View>
                  <Text style={[{ color: colors[types[0]] }, styles.genus]}>Forma Shiny</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 15 }}>
                    <Image
                      source={{ uri: tinyshinyUri }} style={styles.sprite} resizeMode='contain' />
                    <Image
                      source={{ uri: tinyBackShinyUri }} style={styles.sprite} resizeMode='contain' />
                  </View>
                </View>
              }
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15, top: 16, zIndex:1 }}>
                    <Image
                      source={{ uri: iconuri }} style={{height:56,width:68}} resizeMode='contain' />
                    
                  </View>

              {/* MORE DETAILS */}
              <TouchableOpacity>
                <View style={{ marginTop: 15, backgroundColor: '#BFD0CA', borderRadius: 10, width: 150, display: 'flex', alignSelf: 'center' }}>
                  <Text style={{ textAlign: 'center', padding: 10 }}>VoiceDex</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
      </ScrollView>

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