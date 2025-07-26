// app/profile/[username].tsx

import { useLocalSearchParams } from "expo-router"; // Parametri götürmək üçün hook
import React from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostGridItem, ProfileHeader } from "@/components/profile";
import { dummyPosts, dummyUsers } from "@/dummyData";
import { Post, User } from "@/types";

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();

  const user: User | undefined = dummyUsers.find(
    (u) => u.username === username
  );
  const userPosts: Post[] = user
    ? dummyPosts.filter((p) => p.user_id === user.id)
    : [];

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white pb-16">
        <Text>User "{username}" not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pb-16">
      <FlatList
        data={userPosts}
        renderItem={({ item }) => <PostGridItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={
          <ProfileHeader user={user} postsCount={userPosts.length} />
        }
      />
    </SafeAreaView>
  );
}
