import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { View, Image } from 'react-native'

import poke from './assets/navicon.png'

import 'react-native-gesture-handler'

import StackNavigation from './components/StackNavigation'
import Favorites from './components/Favorites'
import Conf from './components/Conf'

export default function App() {

  const client = new ApolloClient({
    uri: 'https://beta.pokeapi.co/graphql/v1beta/',
    cache: new InMemoryCache(),
  });

  const Drawer = createDrawerNavigator();


  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={{
          drawerPosition: 'right',
          drawerType: 'slide',
          headerShown: false,
          drawerIcon: () => (
            <Image source={poke}/>
          )            
        }}>
          <Drawer.Screen name="Home" component={StackNavigation} />
          <Drawer.Screen name="Favoritos" component={Favorites} />
          <Drawer.Screen name="Configuracion" component={Conf} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}