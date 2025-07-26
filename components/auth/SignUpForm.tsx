// app/(auth)/components/SignInForm.tsx

import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { Alert, TextInput, View } from "react-native";
import { AuthButton } from "./AuthButton";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <View className="w-full">
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
        keyboardType="default"
        className="bg-light-200 p-4 rounded-lg text-base mb-4 border border-gray-200"
      />
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
      <AuthButton
        onPress={handleSignUp}
        loading={loading}
        buttonText="SignUp"
      />
    </View>
  );
};
