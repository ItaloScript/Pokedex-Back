export class CommentCollection {
    
    static collectionName = 'comments';

    username: string;
    email: string;
    comment: string;
    pokemonId: number;
    created_at: Date;
}