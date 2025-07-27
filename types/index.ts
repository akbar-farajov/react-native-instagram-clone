import { Database } from "./database";

export interface User {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export interface Post {
  id: number;
  user_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface PostWithDetails extends Post {
  profiles: Database["public"]["Tables"]["profiles"]["Row"] | null;
  likes: Database["public"]["Tables"]["likes"]["Row"][];
  comments: Database["public"]["Tables"]["comments"]["Row"][];
  is_liked?: boolean;
}
