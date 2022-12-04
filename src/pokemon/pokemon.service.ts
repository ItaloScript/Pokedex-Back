import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class PokemonService {

  api: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
      'Accept-Encoding': 'application/json',
    }
  });

  async findAll(offset:number = 0, limit: number=20) {
    console.log(offset, limit)
    const pokemons = await this.api.get(`pokemon/?limit=${limit}&offset=${offset}`)
    const pokemonResults = pokemons.data.results.map(async pokemon => {
      const pokemonDetailed = await this.api.get(pokemon.url)
      return ({
        id: pokemonDetailed.data.id,
        name: pokemonDetailed.data.name,
        types: pokemonDetailed.data.types,
        sprites: pokemonDetailed.data.sprites,
        height: pokemonDetailed.data.height,
        weight: pokemonDetailed.data.weight,
      })
    })
    return await Promise.all(pokemonResults)
  }

  async findOne(id: number) {
    const pokemon = (await this.api.get(`pokemon/${id}`)).data
    const species = (await this.api.get(pokemon.species.url)).data

    if(!pokemon) {
      throw new HttpException('Pokemon not found', 404)
    }

    if(!species) {
      throw new HttpException('Specie not found', 404)
    }

    return {
      ...pokemon,
      species
    }
  }
}
