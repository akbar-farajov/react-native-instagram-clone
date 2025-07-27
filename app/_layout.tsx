// app/_layout.tsx

import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/global.css";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const RootLayoutNav = () => {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (session) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
