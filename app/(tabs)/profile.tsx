// app/profile.tsx

import { getPosts } from "@/actions/feed";
import { getProfile } from "@/actions/profile";
import { PostGridItem, ProfileHeader } from "@/components/profile";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import { PostWithDetails, User } from "@/types";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useFetch(() => {
    if (!userId) return Promise.resolve(null);
    return getProfile(userId);
  });

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useFetch(() => {
    if (!userId) return Promise.resolve(null);
    return getPosts(userId);
  });

  const onRefresh = () => {
    refetchProfile();
    refetchPosts();
  };

  const isLoading = profileLoading || postsLoading;
  const combinedError = profileError || postsError;

  if (!session) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>User not found. Please log in again.</Text>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    if (isLoading && !profile && !posts) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (combinedError) {
      return (
        <Text className="text-center mt-10 text-red-500">
          {combinedError.message}
        </Text>
      );
    }

    return (
      <FlatList
        data={posts as unknown as PostWithDetails[]}
        renderItem={({ item }) => <PostGridItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={
          <ProfileHeader
            profile={profile as User}
            postsCount={Array.isArray(posts) ? posts.length : 0}
          />
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">{renderContent()}</SafeAreaView>
  );
}
