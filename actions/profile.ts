import { supabase } from "@/lib/supabase";
import { deleteFile, extractFilePathFromUrl, uploadAvatar } from "./storage";

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

export const updateAvatar = async (
  userId: string,
  avatarUri: string
): Promise<string> => {
  try {
    const currentProfile = await getProfile(userId);
    const oldAvatarUrl = currentProfile?.avatar_url;

    const { url: newAvatarUrl } = await uploadAvatar(avatarUri, userId);

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: newAvatarUrl })
      .eq("id", userId);

    if (error) throw error;

    if (oldAvatarUrl) {
      const oldFilePath = extractFilePathFromUrl(oldAvatarUrl);
      if (oldFilePath) {
        await deleteFile(oldFilePath);
      }
    }

    return newAvatarUrl;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update avatar."
    );
  }
};

export const removeAvatar = async (userId: string): Promise<void> => {
  try {
    const currentProfile = await getProfile(userId);
    const oldAvatarUrl = currentProfile?.avatar_url;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", userId);

    if (error) throw error;

    if (oldAvatarUrl) {
      const oldFilePath = extractFilePathFromUrl(oldAvatarUrl);
      if (oldFilePath) {
        await deleteFile(oldFilePath);
      }
    }
  } catch (error) {
    console.error("Error removing avatar:", error);
    throw new Error("Failed to remove avatar.");
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
      const avatarUrl = await updateAvatar(userId, avatarUri);
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
    throw new Error(
      error instanceof Error ? error.message : "Failed to update profile."
    );
  }
};

export const updateProfileInfo = async ({
  userId,
  username,
  fullName,
  bio,
}: Omit<UpdateProfilePayload, "avatarUri">) => {
  try {
    const updateData = {
      username,
      full_name: fullName,
      bio,
    };

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating profile info:", error);
    throw new Error("Failed to update profile information.");
  }
};
