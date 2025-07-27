import { supabase } from "@/lib/supabase";

export const getProfile = async (userId: string) => {
  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};
