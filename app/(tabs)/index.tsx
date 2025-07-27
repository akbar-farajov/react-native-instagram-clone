import { getPosts } from "@/actions/feed";
import { FeedHeader } from "@/components/FeedHeader";
import { PostItem } from "@/components/PostItem";
import { useFetch } from "@/hooks/useFetch";
import { PostWithDetails } from "@/types";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { data: posts, loading, error, refetch } = useFetch(() => getPosts());

  const renderContent = () => {
    if (loading && !posts) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (error) {
      return (
        <Text className="text-center mt-10 text-red-500">{error.message}</Text>
      );
    }

    return (
      <FlatList
        data={posts as unknown as PostWithDetails[]}
        renderItem={({ item }) => <PostItem post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<FeedHeader />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white pb-16">
      {renderContent()}
    </SafeAreaView>
  );
}
