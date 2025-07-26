// app/(auth)/components/SignInForm.tsx

import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthButton } from "./AuthButton";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View className="w-full">
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        autoCapitalize="none"
        keyboardType="email-address"
        className="bg-light-200 p-4 rounded-lg text-base mb-4 border border-gray-200"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="bg-light-200 p-4 rounded-lg text-base mb-4 border border-gray-200"
      />
      <Link href="/(auth)/login" asChild>
        <TouchableOpacity className="flex-row justify-end mb-6">
          <Text className="text-primary font-medium text-base">
            Forgot Password
          </Text>
        </TouchableOpacity>
      </Link>
      <AuthButton onPress={handleLogin} loading={loading} buttonText="Login" />
    </View>
  );
};
