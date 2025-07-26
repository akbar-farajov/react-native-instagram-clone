import { PostItem } from "@/components/PostItem";
import { dummyPosts, dummyUsers } from "@/dummyData";
import { supabase } from "@/lib/supabase";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const postsWithUsers = dummyPosts.map((post) => {
  const user = dummyUsers.find((user) => user.id === post.user_id);
  return { ...post, user };
});

const FeedHeader = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error signing out", error.message);
    }
  };

  return (
    <View className="py-4 px-4 flex-row items-center justify-between">
      <Text className="text-3xl font-bold tracking-wider">Instagram</Text>
      <Pressable onPress={handleSignOut}>
        <Text
          className="font-semibold text-blue-500 text-base"
          onPress={handleSignOut}
        >
          Sign Out
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
