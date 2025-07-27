import { supabase } from "@/lib/supabase";

export const getPosts = async (userId?: string) => {
  try {
    let query = supabase.from("posts").select(
      `*,
        profiles!posts_user_id_fkey(*),
        likes(count),
        comments(count)`
    );

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error, status } = await query
      .limit(10)
      .order("created_at", { ascending: false });

    if (error && status !== 406) {
      return error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return error;
  }
};
