import { Timestamp } from '@google-cloud/firestore';

export class CommentCollection {
    
    static collectionName = 'comments';

    name: string;
    email: string;
    created_at: Date
    comment: string;
    pokemonId: number;
}