import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import pokeico from '../assets/navicon.png'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function Conf({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState("7");
  const [narrator, isNarrator] = useState("1");
  const { getItem: getLang, setItem: setLang } = useAsyncStorage('@lang');
  const { getItem: getNarrator, setItem: setNarrator } = useAsyncStorage('@narrator');

  const readItemFromStorage = async () => {
    const item = await getLang();
    if(item==null||item==undefined){
      item='7'
    }
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
    if(nar==null||nar==undefined){
      nar='1'
    }
    isNarrator(nar);
  }

  const writeNarratorToStorage = async newValue => {
    await setNarrator(newValue);
    isNarrator(newValue)
  }

  function setnarrator(narra) {
    isNarrator(narra)
    writeNarratorToStorage(narra)
  }

  useEffect(() => {
    readItemFromStorage();
    readNarratorFromStorage()
  }, [])


  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: 'bold', fontSize: 22, paddingBottom: 30 }}>Configuración</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 30 }}>Language | Idioma</Text>
      <View style={{ backgroundColor: '#fefefe', width: '80%', minWidth: 200 }}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => {
            setlang(itemValue)
          }}
          placeholder={"Set your language"}
        >
          <Picker.Item label={`Español - ES`} value={"7"} />
          <Picker.Item label={`Latino - LAT`} value={"77"} />
          <Picker.Item label="Inglés - EN" value={"9"} />
          <Picker.Item label="Francés - FR" value={"5"} />
          <Picker.Item label="Alemán - DE" value={"6"} />
          <Picker.Item label="Italiano - IT" value={"8"} />
          <Picker.Item label="Japonés - JA" value={"1"} />
          <Picker.Item label="Chino simplificado - CH" value={"12"} />
          <Picker.Item label="Coreano - KO" value={"3"} />
        </Picker>
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 30 }}>Narrador 🎙</Text>
      <View style={{ backgroundColor: '#fefefe', width: '80%', minWidth: 200 }}>
        <Picker
          selectedValue={narrator}
          onValueChange={(itemValue, itemIndex) => {
            setnarrator(itemValue)
          }}
          placeholder={"Activa/Desactiva el narrador"}
        >
          <Picker.Item label={`Activado`} value={"1"} />
          <Picker.Item label={`Desactivado`} value={"0"} />
        </Picker>
      </View>


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


