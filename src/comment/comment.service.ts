import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { CommentCollection } from './collections/comment.collection';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {

  constructor(@Inject(CommentCollection.collectionName) private commentCollection: CollectionReference<CommentCollection>){}

  async create(createCommentDto: CreateCommentDto) {
    const docRef = this.commentCollection.doc();
    await docRef.set({
      ...createCommentDto,
      created_at: new Date()
    });
    const todoDoc = await docRef.get();
    const todo = todoDoc.data();
    return todo;
  }

  async findAll( pokemonId: number ) {
    const snapshot = await this.commentCollection.where('pokemonId', '==', pokemonId).get();
    const comments: CommentCollection[] = [];
    snapshot.forEach(doc => {
      comments.push({
        ...doc.data(),
        email:undefined
      });
    });
    return comments;
  }

}
