import { PostWithUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface PostItemProps {
  post: PostWithUser;
}

export const PostItem = ({ post }: PostItemProps) => {
  if (!post.user) {
    return null;
  }

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between px-3 py-2">
        <Link href={`/profile/${post.user.username}`} asChild>
          <Pressable className="flex-row items-center gap-x-3">
            <Image
              source={{ uri: post.user.profile_pic }}
              className="w-9 h-9 rounded-full bg-gray-200"
            />
            <Text className="font-bold text-sm">{post.user.username}</Text>
          </Pressable>
        </Link>

        <Ionicons name="ellipsis-horizontal" size={20} color="black" />
      </View>

      <Image
        source={{ uri: post.image_url }}
        className="w-full aspect-square bg-gray-200"
      />

      <View className="flex-row items-center justify-between px-3 py-3">
        <View className="flex-row items-center gap-x-4">
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="heart-outline" size={28} color="black" />
            <Text className="font-bold">
              {post.likes_count.toLocaleString("en")}
            </Text>
          </View>
          <View className="flex-row items-center gap-x-1">
            <Ionicons name="chatbubble-outline" size={26} color="black" />
            <Text className="font-bold">
              {post.comments_count.toLocaleString("en")}
            </Text>
          </View>

          <Ionicons name="paper-plane-outline" size={26} color="black" />
        </View>
        <Ionicons name="bookmark-outline" size={26} color="black" />
      </View>

      <View className="px-3 flex-row flex-wrap">
        <Text className="font-bold">{post.user.username}</Text>
        <Text className="ml-1.5">{post.caption}</Text>
      </View>

      <View className="px-3 mt-1">
        <Text className="text-gray-400 text-xs">2 DAYS AGO</Text>
      </View>
    </View>
  );
};
