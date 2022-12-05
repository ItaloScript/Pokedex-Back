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
      useFactory: (configService: ConfigService) => {

        console.log({
          projectId: configService.get<string>('PROJECT_ID'),
          credentials: {
            client_email: configService.get<string>('CLIENT_EMAIL'),
            private_key: configService.get<string>('PRIVATE_KEY'),
          }
          
        })
        console.log(process.env.PRIVATE_KEY)
        return ({
          projectId: configService.get<string>('PROJECT_ID'),
          credentials: {
            client_email: configService.get<string>('CLIENT_EMAIL'),
            private_key: configService.get<string>('PRIVATE_KEY'),
          }
          
        })
      },
      inject: [ConfigService],
    }),
    PokemonModule,
    CommentModule
  ],
})
export class AppModule {}
