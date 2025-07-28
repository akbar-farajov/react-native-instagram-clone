import {
  CaptionInput,
  ImageSelector,
  LoadingOverlay,
  UploadHeader,
} from "@/components/upload";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
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
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleShare = async () => {
    if (!imageUri || !user) {
      Alert.alert(
        "Error",
        "Please select an image and make sure you are logged in."
      );
      return;
    }

    setLoading(true);

    try {
      // 1. Create a unique file path for the image
      const fileExt = imageUri.split(".").pop()?.toLowerCase() ?? "jpeg";
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 2. Create FormData to handle the file upload robustly
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: fileName,
        type: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`,
      } as any);

      // 3. Upload the image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("posts") // The bucket name
        .upload(filePath, formData, {
          // The content type is now set within the FormData
        });

      if (uploadError) throw uploadError;

      // 4. Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from("posts")
        .getPublicUrl(uploadData.path);

      const publicUrl = urlData.publicUrl;

      // 5. Insert the post details into the 'posts' database table
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: user.id,
        image_url: publicUrl,
        caption: caption,
      });

      if (insertError) throw insertError;

      // 6. If successful, reset the state and navigate to the feed
      Alert.alert("Success", "Your post has been shared!");
      resetState();
      router.push("/(tabs)");
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
