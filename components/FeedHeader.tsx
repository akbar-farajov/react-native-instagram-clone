import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

export const FeedHeader = () => {
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
