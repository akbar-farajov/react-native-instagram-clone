import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import InstagramLogo from "./shared/InstagramLogo";

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
      <InstagramLogo />
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
