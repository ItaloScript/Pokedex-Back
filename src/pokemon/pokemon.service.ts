import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  api: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
      'Accept-Encoding': 'application/json',
    }
  });

  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  async findAll(offset:number = 0, limit: number=20) {
    console.log(offset, limit)
    const pokemons = await this.api.get(`/?limit=${limit}&offset=${offset}`)

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
    const pokemon = await this.api.get(`/${id}`)
    const characteristic = await this.api.get(`/characteristic/${id}`)

    if(!pokemon) {
      throw new HttpException('Pokemon not found', 404)
    }

    if(!characteristic) {
      throw new HttpException('Characteristic not found', 404)
    }

    return {
      ...pokemon.data,
      characteristic
    }
  }
}
