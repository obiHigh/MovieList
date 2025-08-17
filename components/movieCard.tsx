import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: any) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placeholder.com/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-white text-sm mt-2 font-bold" numberOfLines={1}>
          {title ?? "N/A"}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />

          <Text className="text-white text-xs font-bold uppercase">
            {vote_average ? Math.round(vote_average / 2) : "N/A"}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-light-300 text-xs font-medium mt-1">
            {release_date?.split("-")[0] ?? "N/A"}
          </Text>

          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
