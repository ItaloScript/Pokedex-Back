import { Firestore, Timestamp } from '@google-cloud/firestore';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let provider:Firestore

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
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
      ]
    }).compile();
    service = module.get<CommentService>(CommentService);
    provider = module.get('firestoredb');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of comments', async () => {
    const comments = await service.findAll(1);
    expect(comments).toBeInstanceOf(Array);
  })

  it('should create a comment', async () => {
    expect(true).toBe(true);
    const data = {
      id: -1,
      comment: 'This is a comment',
      pokemonId: 1,
      username: 'John Doe',
      email: 'italoyoupw@gmail.com'
    }
    const comment = await service.create(data)
    expect(comment).toEqual({
      ...data,
      created_at: expect.any(Timestamp)
    });

    // delete the comment where created_at is equal to the created_at of the comment
    await provider.collection('comments').where('id', '==', -1).get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      })
    })
  })

});
