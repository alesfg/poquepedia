import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import pokeico from '../assets/navicon.png'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function Conf({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState("7");
  const [narrator, isNarrator] = useState(true);
  const { getItem: getLang, setItem: setLang } = useAsyncStorage('@lang');
  const { getItem: getNarrator, setItem: setNarrator } = useAsyncStorage('@narrator');

  const readItemFromStorage = async () => {
    const item = await getLang();
    setSelectedLanguage(item);
  };

  const writeItemToStorage = async newValue => {
    await setLang(newValue);
    setSelectedLanguage(newValue);
  };
  function setlang(lang) {
    setSelectedLanguage(lang)
    writeItemToStorage(lang)
  }
  
  const readNarratorFromStorage = async () => {
    const nar = await getNarrator();
    isNarrator(JSON.parse(nar));
    console.log("narrator read: "+narrator)
  };
  const writeNarratorToStorage = async newValue => {
    await setNarrator(JSON.stringify(newValue));
  };
  const toggleVoice = async() => {
    isNarrator(previousState => !previousState);
    await writeNarratorToStorage(narrator)
    console.log("Narrador togleao: " + narrator)
  }

  useEffect(() => {
    readItemFromStorage();
    // readNarratorFromStorage()
    console.log("eff"+narrator)
  }, [])


  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: 'bold', fontSize: 22, paddingBottom: 50 }}>Configuración</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 30 }}>Idioma</Text>
      <View style={{ backgroundColor: '#fefefe', width: '100%', minWidth: 200 }}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => {
            setlang(itemValue)
          }}
          placeholder={"Set your language"}
        >
          <Picker.Item label="Español" value={"7"} />
          <Picker.Item label="Inglés" value={"9"} />
          <Picker.Item label="Francés" value={"5"} />
          <Picker.Item label="Alemán" value={"6"} />
          <Picker.Item label="Italiano" value={"8"} />
          <Picker.Item label="Japonés" value={"1"} />
          <Picker.Item label="Chino simplificado" value={"12"} />
          <Picker.Item label="Chino tradicional" value={"4"} />
          <Picker.Item label="Coreano" value={"3"} />
        </Picker>
      </View>

      <Text style={{ fontSize: 16, marginTop: 50 }}>Para aplicar cambios salga de detalles</Text>
      <Text style={{ fontSize: 20 }}>🎙</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 30 }}>Narrador</Text>
      {/* <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={narrator ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleVoice()}
      /> */}


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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4EAFF',
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }, openDrawer: {
    backgroundColor: '#3e5f8f',
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 110,
    width: 80,
    borderColor: '#cdcdcd',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    opacity: 0.7
  }
})


