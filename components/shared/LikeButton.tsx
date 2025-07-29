import { likePost, unlikePost } from "@/actions/post";
import { useAuth } from "@/context/AuthContext";
import { PostWithDetails } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

interface LikeButtonProps {
  post: PostWithDetails;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ post }) => {
  const { user } = useAuth();

  const initialLikeCount = post.likes[0]?.count ?? 0;
  const [isLiked, setIsLiked] = useState(post.is_liked ?? false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to like a post.");
      return;
    }

    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikeCount(wasLiked ? likeCount - 1 : likeCount + 1);

    try {
      if (!wasLiked) {
        await likePost(post.id, user.id);
      } else {
        await unlikePost(post.id, user.id);
      }
    } catch (error: any) {
      Alert.alert("Failed to update like", error.message);
      setIsLiked(wasLiked);
      setLikeCount(initialLikeCount);
    }
  };

  return (
    <View className="flex-row items-center gap-x-1">
      <Pressable onPress={handleLike}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={28}
          color={isLiked ? "red" : "black"}
        />
      </Pressable>
      <Text className="font-bold">{likeCount.toLocaleString("en")}</Text>
    </View>
  );
};
