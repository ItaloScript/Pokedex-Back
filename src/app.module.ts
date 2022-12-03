import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PokemonModule, CommentModule],
})
export class AppModule {}
