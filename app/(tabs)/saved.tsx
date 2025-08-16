import MovieCard from "@/components/movieCard";
import { icons } from "@/constants/icons";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const saved = () => {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(getSavedMovies);
  //console.log("-------------");
  //console.log("saved.tsx");
  //console.log(movies);

  return (
    <View className="bg-black flex-1 px-5">
      <View className="justify-center items-center w-full mt-10">
        <Image source={icons.logo} className="w-20 h-28 mb-1 mx-auto" />
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => {
          //here is error, don't know how to fix, use debug info
          //[{"$collectionId": "689f0f1100037c9ebbe7", "$createdAt": "2025-08-16T07:37:48.932+00:00", "$databaseId": "689e1970001b3cc46257",
          // "$id": "68a0354c002832b6b40f", "$permissions": [], "$sequence": 8, "$updatedAt": "2025-08-16T07:37:48.932+00:00", "movie_id": 1895,
          // "poster_url": "https://image.tmdb.org/t/p/w500/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg", "title": "Star Wars: Episode III - Revenge of the Sith"}]
          //const id = item.id ?? item.$id ?? String(Math.random());
          //console.log("1");
          //console.log(item);
          // const cardProps = {
          //   ...rest,
          //   id: item.id,
          //   poster_path: item.poster_path,
          //   title: item.title,
          //   vote_average: item.vote_average,
          //   release_date: item.release_date,
          // };

          return <MovieCard {...item} />;
        }}
        keyExtractor={(item) => String(item.id ?? Math.random())}
        className="mt-10"
        numColumns={3}
        columnWrapperStyle={{
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-gray-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && (!movies || movies.length === 0) ? (
            <View className="justify-center items-center">
              <Text className="text-gray-500">
                Saved movies will appear here
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default saved;
