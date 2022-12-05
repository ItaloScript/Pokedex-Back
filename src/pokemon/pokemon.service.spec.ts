import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of pokemon', async () => {
    const pokemon = await service.findAll(0, 20);
    expect(pokemon).toBeInstanceOf(Array);
  })

  it('should return a single pokemon', async () => {
    const pokemon = await service.findOne(1);
    expect(pokemon).toBeInstanceOf(Object);
  })
});
