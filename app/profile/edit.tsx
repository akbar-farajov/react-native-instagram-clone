import { getProfile, updateProfile } from "@/actions/profile";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const { user: authUser } = useAuth();
  const userId = authUser?.id;

  const router = useRouter();


  const { data: profile, loading: initialLoading } = useFetch(() => {
    if (!userId) return Promise.resolve(null);
    return getProfile(userId);
  });


  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to update your avatar."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);
    const success = await updateProfile({
      userId,
      username,
      fullName,
      bio,
      avatarUri,
    });
    setIsSaving(false);
    if (success) {
      Alert.alert("Success", "Profile updated successfully!");
      router.back(); 
    }
  };

  if (initialLoading) {
    return <ActivityIndicator className="flex-1" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Edit Profile</Text>

      <View className="items-center mb-6">
        <Image
          source={{
            uri: avatarUri || profile?.avatar_url || "https://placehold.co/200",
          }}
          className="w-32 h-32 rounded-full bg-gray-200"
        />
        <Pressable onPress={pickImage}>
          <Text className="text-blue-500 font-semibold mt-2">
            Change profile photo
          </Text>
        </Pressable>
      </View>

      <Text className="font-semibold text-gray-500">Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        className="bg-gray-100 p-3 rounded-lg mb-4"
      />

      <Text className="font-semibold text-gray-500">Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        className="bg-gray-100 p-3 rounded-lg mb-4"
      />

      <Text className="font-semibold text-gray-500">Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        multiline
        className="bg-gray-100 p-3 rounded-lg h-24"
        style={{ textAlignVertical: "top" }}
      />

      <Pressable
        onPress={handleSave}
        disabled={isSaving}
        className={`bg-blue-500 p-4 rounded-lg items-center mt-6 ${
          isSaving ? "opacity-50" : ""
        }`}
      >
        {isSaving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold">Save Changes</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}
