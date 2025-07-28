import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ImageSelectorProps {
  imageUri: string | null;
  onPickImage: () => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  imageUri,
  onPickImage,
}) => {
  return (
    <View className="items-center">
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="w-full aspect-square rounded-lg bg-gray-200"
        />
      ) : (
        <Pressable
          onPress={onPickImage}
          className="w-full aspect-square rounded-lg bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300"
        >
          <Ionicons name="image-outline" size={60} color="gray" />
          <Text className="text-gray-500 mt-2">Tap to select an image</Text>
        </Pressable>
      )}
    </View>
  );
};
