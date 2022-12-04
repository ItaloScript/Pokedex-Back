import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('KEY_FILE_NAME'),
        projectId: configService.get<string>('PROJECT_ID'),
        
      }),
      inject: [ConfigService],
    }),
    PokemonModule,
    CommentModule
  ],
})
export class AppModule {}
