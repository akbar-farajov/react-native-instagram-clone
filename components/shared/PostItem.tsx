import { PostWithDetails } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { LikeButton } from "./LikeButton"; // Import the new component

interface PostItemProps {
  post: PostWithDetails;
}

export const PostItem = ({ post }: PostItemProps) => {
  // console.log(post.is_liked);
  const initialCommentCount = post.comments[0]?.count ?? 0;

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between px-3 py-2">
        <Link href={`/profile/${post?.profiles?.username}`} asChild>
          <Pressable className="flex-row items-center gap-x-3">
            <Image
              source={{
                uri: post.profiles?.avatar_url || "https://placehold.co/100",
              }}
              className="w-9 h-9 rounded-full bg-gray-200"
            />
            <Text className="font-bold text-sm">
              {post?.profiles?.username}
            </Text>
          </Pressable>
        </Link>
        <Ionicons name="ellipsis-horizontal" size={20} color="black" />
      </View>

      {/* Image */}
      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-square bg-gray-200"
      />

      {/* Action Bar */}
      <View className="flex-row items-center justify-between px-3 py-3">
        <View className="flex-row items-center gap-x-4">
          {/* Use the new component here */}
          <LikeButton post={post} />

          <View className="flex-row items-center gap-x-1">
            <Ionicons name="chatbubble-outline" size={26} color="black" />
            <Text className="font-bold">
              {initialCommentCount.toLocaleString("en")}
            </Text>
          </View>
          <Ionicons name="paper-plane-outline" size={26} color="black" />
        </View>
        <Ionicons name="bookmark-outline" size={26} color="black" />
      </View>

      {/* Caption */}
      <View className="px-3 flex-row flex-wrap">
        <Text className="font-bold">{post?.profiles?.username}</Text>
        <Text className="ml-1.5">{post.caption}</Text>
      </View>

      {/* Timestamp */}
      <View className="px-3 mt-1">
        <Text className="text-gray-400 text-xs">2 DAYS AGO</Text>
      </View>
    </View>
  );
};
