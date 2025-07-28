import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingOverlayProps {
  loading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <View className="absolute inset-0 bg-black/40 justify-center items-center">
      <ActivityIndicator size="large" color="white" />
      <Text className="text-white mt-2">Uploading...</Text>
    </View>
  );
};
