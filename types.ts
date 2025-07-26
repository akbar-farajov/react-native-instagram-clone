export type User = {
  id: number;
  username: string;
  full_name: string;
  profile_pic: string;
};

export type Post = {
  id: number;
  user_id: number;
  image_url: string;
  caption: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
};
