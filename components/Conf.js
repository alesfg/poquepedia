import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import pokeico from '../assets/navicon.png'


export default function Conf({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
}

function close() {
  pickerRef.current.blur();
}
  const lang = [
    { key: '1', value: 'Japonés' },
    { key: '3', value: 'Coreano' },
    { key: '4', value: 'Chino tradicional' },
    { key: '5', value: 'Francés' },
    { key: '6', value: 'Alemán' },
    { key: '7', value: 'Español' },
    { key: '8', value: 'Italiano' },
    { key: '9', value: 'Inglés' },
    { key: '12', value: 'Chino simplificado' }
  ]

  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: 'bold', fontSize: 22, paddingBottom: 50 }}>¡Configuración estará disponible en la próxima actualización!</Text>
      <View style={{backgroundColor:'#fefefe', width:'100%', minWidth:200}}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Español" value="7" />
        <Picker.Item label="Inglés" value="9" />
        <Picker.Item label="Japonés" value="1" />
        <Picker.Item label="Francés" value="5" />
      </Picker>
    </View>

      <Text style={{ fontSize: 50 }}>⚙</Text>
      <Text style={{ fontSize: 16, marginTop: 50 }}>Ajustes relacionados a la voz</Text>
      <Text style={{ fontSize: 20 }}>🎙</Text>
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


