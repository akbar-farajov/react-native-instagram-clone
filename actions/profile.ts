import { supabase } from "@/lib/supabase";
import { uploadFile } from "./storage";

export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile.");
  }
};

interface UpdateProfilePayload {
  userId: string;
  username: string;
  fullName: string;
  bio: string;
  avatarUri?: string | null;
}

export const updateProfile = async ({
  userId,
  username,
  fullName,
  bio,
  avatarUri,
}: UpdateProfilePayload) => {
  try {
    let updateData: {
      username: string;
      full_name: string;
      bio: string;
      avatar_url?: string;
    } = {
      username,
      full_name: fullName,
      bio,
    };

    if (avatarUri) {
      const avatarUrl = await uploadFile(
        "avatars",
        avatarUri,
        userId,
        "avatar.jpg"
      );
      updateData.avatar_url = avatarUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile.");
  }
};
