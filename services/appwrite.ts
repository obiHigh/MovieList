// track the searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_SAVED_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_SAVED_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query)
        ]);

        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            // if a document is found, increment the searchCound field
            const existingMovie = result.documents[0];
        
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            );
        } else {
            // if no document is found, create a new document in Appwrite database => 1
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            );
        }
    } catch (error) {
        console.log(error);
        throw(error);
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

export const saveOrRemoveMovie = async (movie_id: number, poster_path: string, title: string, vote_average: number, release_date: string) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_SAVED_ID, [
            Query.equal("id", movie_id),
            Query.limit(1)
        ]);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
        
            await database.deleteDocument(
                DATABASE_ID,
                COLLECTION_SAVED_ID,
                existingMovie.$id
            )

            return {action: "removed", id: existingMovie.$id};
        } else {
            const doc = await database.createDocument(
                DATABASE_ID,
                COLLECTION_SAVED_ID,
                ID.unique(),
                {
                    id: movie_id,
                    poster_path: poster_path,
                    title: title,
                    vote_average: vote_average,
                    release_date: release_date
                }
            );

            return {action: "created", doc}
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const isMovieSaved = async (movie_id: number): Promise<boolean> => {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_SAVED_ID, [
      Query.equal("id", movie_id),
      Query.limit(1),
    ]);
    return (res.documents || []).length > 0;
  } catch (err) {
    console.log("isMovieSaved error", err);
    return false;
  }
};

export const getSavedMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_SAVED_ID, [
        ]);

        return result.documents;
    } catch (err) {
        console.log(err);
        throw err;
    }
}