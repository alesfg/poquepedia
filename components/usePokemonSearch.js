import { useEffect, useState } from 'react'
// import {pokemons} from '../assets/pokeNames.json'

export default function usePokemonSearch(query) {
    const [names, setNames] = useState(null)
    const id=0;
    const data=[];
    setNames(pokemons.filter((pokemon) => pokemon.name.includes(query)))
    names.forEach(e => {
        console.log(e.name)
    });
    

  return null
}
