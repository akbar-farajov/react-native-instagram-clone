import { supabase } from "@/lib/supabase";
import { PostWithDetails } from "@/types";

/**

 * @param currentUserId The ID of the currently logged-in user, required to check the 'is_liked' status.
 * @param profileId Optional. If provided, fetches posts only for this specific user profile.
 */
export const getPosts = async (
  currentUserId: string,
  profileId?: string
): Promise<PostWithDetails[] | null> => {
  try {
    let query = supabase.from("posts").select(
      `*,
        profiles!posts_user_id_fkey(*),
        likes(count),
        comments(count)
      `
    );

    if (profileId) {
      query = query.eq("user_id", profileId);
    }

    const { data: postsData, error: postsError } = await query
      .limit(10)
      .order("created_at", { ascending: false });

    if (postsError) throw postsError;
    if (!postsData) return [];

    const { data: likedPosts, error: likesError } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", currentUserId);

    if (likesError) throw likesError;

    const likedPostIds = new Set(likedPosts.map((like) => like.post_id));

    const finalPosts = postsData
      .filter((post) => post.created_at)
      .map((post) => ({
        ...post,
        created_at: post.created_at as string,
        is_liked: likedPostIds.has(post.id),
      }));

    return finalPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const likePost = async (postId: number, userId: string) => {
  try {
    const { error } = await supabase
      .from("likes")
      .insert({ post_id: postId, user_id: userId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const unlikePost = async (postId: number, userId: string) => {
  try {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ post_id: postId, user_id: userId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error unliking post:", error);
    throw error;
  }
};
