import { Post, User } from "./types";

export const dummyUsers: User[] = [
  {
    id: 1,
    username: "emma_watson",
    full_name: "Emma Watson",
    profile_pic:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600",
  },
  {
    id: 2,
    username: "michael_james",
    full_name: "Michael James",
    profile_pic:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
  },
  {
    id: 3,
    username: "olivia_art",
    full_name: "Olivia Parker",
    profile_pic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
  {
    id: 4,
    username: "daniel_snap",
    full_name: "Daniel Smith",
    profile_pic:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
  },
  {
    id: 5,
    username: "nora_dev",
    full_name: "Nora Johnson",
    profile_pic:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
  },
  {
    id: 6,
    username: "alex_travels",
    full_name: "Alex Cooper",
    profile_pic:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600",
  },
  {
    id: 7,
    username: "grace_reads",
    full_name: "Grace Miller",
    profile_pic:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600",
  },
  {
    id: 8,
    username: "ryan_fit",
    full_name: "Ryan Walker",
    profile_pic:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=600",
  },
  {
    id: 9,
    username: "chloe_foodie",
    full_name: "Chloe Anderson",
    profile_pic:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  },
  {
    id: 10,
    username: "liam_music",
    full_name: "Liam Thompson",
    profile_pic:
      "https://images.unsplash.com/photo-1520155799379-b8833c843a05?q=80&w=600",
  },
];

export const dummyPosts: Post[] = [
  {
    id: 101,
    user_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1577896851231-701450385c96?q=80&w=1080",
    caption: "Beautiful view of the city. Wishing everyone a great weekend!",
    likes_count: 125,
    comments_count: 12,
    created_at: "2025-07-26T12:30:00Z",
  },
  {
    id: 102,
    user_id: 9,
    image_url:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1080",
    caption:
      "Lunch with friends today. Still thinking about the taste! #food #friends",
    likes_count: 88,
    comments_count: 5,
    created_at: "2025-07-26T10:15:10Z",
  },
  {
    id: 103,
    user_id: 3,
    image_url:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1080",
    caption: "A walk with my favorite buddy. 🐾 #dog #love",
    likes_count: 230,
    comments_count: 25,
    created_at: "2025-07-25T18:00:00Z",
  },
  {
    id: 104,
    user_id: 6,
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=1080",
    caption:
      "An unforgettable moment from my trip. This place is amazing! #travel #beach",
    likes_count: 540,
    comments_count: 45,
    created_at: "2025-07-25T09:15:20Z",
  },
  {
    id: 105,
    user_id: 5,
    image_url:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080",
    caption:
      "Started a new project with React Native! #reactnative #coding #supabase",
    likes_count: 150,
    comments_count: 32,
    created_at: "2025-07-24T22:05:00Z",
  },
  {
    id: 106,
    user_id: 4,
    image_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080",
    caption: "A peaceful day in the mountains. #nature #photography",
    likes_count: 410,
    comments_count: 33,
    created_at: "2025-07-24T11:10:00Z",
  },
  {
    id: 107,
    user_id: 8,
    image_url:
      "https://images.unsplash.com/photo-1540496905036-5937c3334723?q=80&w=1080",
    caption: "Morning workout done! #fitness #motivation #gym",
    likes_count: 180,
    comments_count: 22,
    created_at: "2025-07-23T07:00:00Z",
  },
  {
    id: 108,
    user_id: 7,
    image_url:
      "https://images.unsplash.com/photo-1524995767968-9b24b8941a87?q=80&w=1080",
    caption: "Time to begin a new story. 📖 #booklover #reading",
    likes_count: 95,
    comments_count: 9,
    created_at: "2025-07-22T19:55:00Z",
  },
  {
    id: 109,
    user_id: 10,
    image_url:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1080",
    caption: "Exploring new music. Any recommendations for the weekend?",
    likes_count: 75,
    comments_count: 15,
    created_at: "2025-07-22T14:30:00Z",
  },
  {
    id: 110,
    user_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1080",
    caption: "Walking through the forest brings peace to the soul.",
    likes_count: 215,
    comments_count: 19,
    created_at: "2025-07-21T16:45:00Z",
  },
  {
    id: 111,
    user_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1080",
    caption: "Friends are a blessing!",
    likes_count: 350,
    comments_count: 41,
    created_at: "2025-07-21T13:00:00Z",
  },
  {
    id: 112,
    user_id: 6,
    image_url:
      "https://images.unsplash.com/photo-1533105079780-52b9be4ac204?q=80&w=1080",
    caption: "Planning the next adventure... #traveling",
    likes_count: 620,
    comments_count: 55,
    created_at: "2025-07-20T20:20:20Z",
  },
];
