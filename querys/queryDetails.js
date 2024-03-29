import { gql } from '@apollo/client';

export const GET_DETALLES = gql`
query getDetalles($id: Int, $lang: Int) {
  pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
    pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: $lang}}, limit: 1) {
      flavor_text
    pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            name
            id
            pokemon_v2_pokemonevolutions_aggregate {
              nodes {
                min_level
              }
            }
          }
        }
      }
    }
    pokemon_v2_pokemonshape {
      name
    }
    pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $lang}}) {
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
    pokemon_v2_pokemons(where: {id: {_eq: $id}}) {
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
  }
}
`