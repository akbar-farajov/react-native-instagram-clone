import { User } from "@/types";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ProfileHeaderProps {
  profile: User;
  postsCount: number;
}

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <View className="items-center">
    <Text className="font-bold text-lg">{value}</Text>
    <Text className="text-gray-600">{label}</Text>
  </View>
);

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  postsCount,
}) => {
  return (
    <View className="p-4">
      <View className="flex-row items-center justify-between">
        <Image
          source={{ uri: profile.avatar_url || "https://placehold.co/400" }}
          className="w-24 h-24 rounded-full bg-gray-200"
          resizeMode="cover"
        />
        <View className="flex-row gap-x-6">
          <StatItem label="Posts" value={postsCount} />
          <StatItem label="Followers" value={1250} />
          <StatItem label="Following" value={340} />
        </View>
      </View>

      <View className="mt-4">
        <Text className="font-bold">
          {profile.full_name || profile.username}
        </Text>

        <Text className="text-gray-500">
          React Native & Supabase Developer ✨
        </Text>
      </View>

      <View className="flex-row mt-4 gap-x-2">
        <Pressable className="flex-1 bg-gray-200 p-2 rounded-lg items-center">
          <Text className="font-semibold">Edit Profile</Text>
        </Pressable>
        <Pressable className="flex-1 bg-gray-200 p-2 rounded-lg items-center">
          <Text className="font-semibold">Share Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};
