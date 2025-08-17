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

  return (
    <View className="bg-black flex-1 px-5">
      <View className="justify-center items-center w-full mt-10">
        <Image source={icons.logo} className="w-20 h-28 mb-1 mx-auto" />
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
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
