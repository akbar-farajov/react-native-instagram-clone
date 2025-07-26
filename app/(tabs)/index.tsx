import { PostItem } from "@/components/PostItem";
import { dummyPosts, dummyUsers } from "@/dummyData";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const postsWithUsers = dummyPosts.map((post) => {
  const user = dummyUsers.find((user) => user.id === post.user_id);
  return { ...post, user };
});

const FeedHeader = () => {
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error signing out", error.message);
    }
    setLoading(false);
  };

  return (
    <View className="py-4 px-4 flex-row items-center justify-between">
      <Image
        source={require("@/assets/images/instagram-text-icon.png")}
        className="w-40 h-12"
      />
      <Pressable onPress={handleSignOut}>
        <Text
          className="font-semibold text-blue-500 text-base"
          onPress={handleSignOut}
        >
          {loading ? "Signing out..." : "Sign out"}
        </Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white pb-16">
      <FlatList
        data={postsWithUsers}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<FeedHeader />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
