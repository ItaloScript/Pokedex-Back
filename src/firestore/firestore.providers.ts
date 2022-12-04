import { CommentCollection } from "src/comment/collections/comment.collection";

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [
    CommentCollection.collectionName
];