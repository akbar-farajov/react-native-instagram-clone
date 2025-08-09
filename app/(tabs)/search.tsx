import { getPosts } from "@/actions/post";
import { PostGridItem } from "@/components/profile/PostGridItem";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { PostWithDetails } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

// A simple header component containing the search bar
const SearchHeader = () => (
  <View className="p-4 bg-white">
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput placeholder="Search" className="flex-1 ml-2 text-base" />
    </View>
  </View>
);

export default function SearchScreen() {
  const { user } = useAuth();

  // Fetch all posts by calling getPosts without a profileId
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch<PostWithDetails[] | null>(() => {
    if (!user) return Promise.resolve(null);
    return getPosts(user.id);
  });

  if (loading && !posts) {
    return <ActivityIndicator className="flex-1" />;
  }

  if (error) {
    return (
      <Text className="text-center mt-10 text-red-500">{error.message}</Text>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostGridItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={<SearchHeader />}
        onRefresh={refetch}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
