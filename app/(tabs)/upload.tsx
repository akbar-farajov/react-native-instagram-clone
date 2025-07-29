import { createPost } from "@/actions/post";
import {
  CaptionInput,
  ImageSelector,
  LoadingOverlay,
  UploadHeader,
} from "@/components/upload";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { startTransition, useState } from "react";
import { Alert, SafeAreaView } from "react-native";

export default function UploadScreen() {
  const { user } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos", "images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    if (!imageUri || !user) {
      Alert.alert(
        "Error",
        "Please select an image and ensure you are logged in."
      );
      return;
    }

    setLoading(true);
    try {
      await createPost({
        userId: user.id,
        imageUri,
        caption,
      });

      Alert.alert("Success", "Your post has been shared!");
      resetState();
      startTransition(() => {
        router.push("/(tabs)");
      });
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setImageUri(null);
    setCaption("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4 pt-12">
      <UploadHeader onShare={handleShare} loading={loading} />
      <ImageSelector imageUri={imageUri} onPickImage={pickImage} />
      <CaptionInput caption={caption} setCaption={setCaption} />
      <LoadingOverlay loading={loading} />
    </SafeAreaView>
  );
}
