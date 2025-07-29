import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

export const uploadFile = async (
  bucketName: "posts" | "avatars",
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
