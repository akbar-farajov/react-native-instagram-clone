// app/profile.tsx

import { PostGridItem, ProfileHeader } from "@/components/profile";
import { dummyPosts, dummyUsers } from "@/dummyData";
import { Post, User } from "@/types";
import React from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const currentUserId = 1;
  const user: User | undefined = dummyUsers.find((u) => u.id === currentUserId);
  const userPosts: Post[] = dummyPosts.filter(
    (p) => p.user_id === currentUserId
  );

  if (!user) {
    return (
      <SafeAreaView>
        <Text>User not found!</Text>
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
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
