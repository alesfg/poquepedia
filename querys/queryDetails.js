import { gql } from '@apollo/client';

export const GET_DETALLES = gql`
query getDetalles($_eq: Int,$_lan: String) {
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