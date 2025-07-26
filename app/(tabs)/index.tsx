import { PostItem } from "@/components/PostItem";
import { dummyPosts, dummyUsers } from "@/dummyData";
import { FlatList, Text, View } from "react-native";

const postsWithUsers = dummyPosts.map((post) => {
  const user = dummyUsers.find((user) => user.id === post.user_id);
  return { ...post, user };
});

const FeedHeader = () => (
  <View className="pt-12 pb-4 px-2.5">
    <Text className="text-3xl font-bold tracking-wider">Instagram</Text>
  </View>
);

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={postsWithUsers}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<FeedHeader />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
