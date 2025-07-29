import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface UploadHeaderProps {
  onShare: () => void;
  loading: boolean;
}

export const UploadHeader: React.FC<UploadHeaderProps> = ({
  onShare,
  loading,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons name="close" size={30} color="black" />
      </Pressable>
      <Text className="text-xl font-bold">Create a new post</Text>
      <Pressable onPress={onShare} disabled={loading}>
        <Text
          className={`text-lg font-bold text-blue-500 ${
            loading ? "opacity-50" : ""
          }`}
        >
          Share
        </Text>
      </Pressable>
    </View>
  );
};
