import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

export const uploadFile = async (
  bucketName: "uploads",
  fileUri: string,
  userId: string,
  fileName?: string
): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileExt = fileUri.split(".").pop()?.toLowerCase() ?? "jpeg";
    const finalFileName = fileName || `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${finalFileName}`;
    const contentType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, decode(base64), { contentType, upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return `${urlData.publicUrl}?t=${new Date().getTime()}`;
  } catch (error) {
    console.error(`File Upload Error (${bucketName}):`, error);
    throw new Error(`Failed to upload file to ${bucketName}.`);
  }
};

export const uploadAvatar = async (
  fileUri: string,
  userId: string
): Promise<{ url: string; filePath: string }> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileExt = fileUri.split(".").pop()?.toLowerCase() ?? "jpeg";

    const validExtensions = ["jpg", "jpeg", "png", "webp"];
    if (!validExtensions.includes(fileExt)) {
      throw new Error("Invalid image format. Please use JPG, PNG, or WebP.");
    }

    const fileName = `avatar_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/avatars/${fileName}`;
    const contentType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, decode(base64), { contentType, upsert: true });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    return {
      url: `${urlData.publicUrl}?t=${new Date().getTime()}`,
      filePath,
    };
  } catch (error) {
    console.error("Avatar Upload Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to upload avatar."
    );
  }
};

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage.from("uploads").remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error("File Delete Error:", error);
  }
};

export const extractFilePathFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const uploadsIndex = pathParts.indexOf("uploads");

    if (uploadsIndex === -1 || uploadsIndex === pathParts.length - 1) {
      return null;
    }

    return pathParts
      .slice(uploadsIndex + 1)
      .join("/")
      .split("?")[0];
  } catch (error) {
    console.error("Error extracting file path from URL:", error);
    return null;
  }
};
