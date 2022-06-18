import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from './PokemonList'
import PokemonDetails from './PokemonDetails'

const Stack = createNativeStackNavigator();

export default function StackNavigation() {

  return (
  
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={PokemonList} name='Pokemon List' />
            <Stack.Screen component={PokemonDetails} name='Pokemon Details'/>
          </Stack.Navigator>
  );
}