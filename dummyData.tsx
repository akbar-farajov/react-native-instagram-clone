import { Post, User } from "./types";

export const dummyUsers: User[] = [
  {
    id: 1,
    username: "leyla_aliyeva",
    full_name: "Leyla Aliyeva",
    profile_pic:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600",
  },
  {
    id: 2,
    username: "ahmad_m",
    full_name: "Ahmad Mammadov",
    profile_pic:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
  },
  {
    id: 3,
    username: "gunel_art",
    full_name: "Günel Hüseynova",
    profile_pic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
  {
    id: 4,
    username: "farid_photos",
    full_name: "Fərid İsmayılov",
    profile_pic:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
  },
  {
    id: 5,
    username: "dev_nargiz",
    full_name: "Nərgiz Quliyeva",
    profile_pic:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600",
  },
  {
    id: 6,
    username: "orxan_travels",
    full_name: "Orxan Abbasov",
    profile_pic:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600",
  },
  {
    id: 7,
    username: "aynur_books",
    full_name: "Aynurə Cəfərova",
    profile_pic:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600",
  },
  {
    id: 8,
    username: "rashad_fit",
    full_name: "Rəşad Həsənov",
    profile_pic:
      "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=600",
  },
  {
    id: 9,
    username: "sabina_foodie",
    full_name: "Səbinə Rəsulova",
    profile_pic:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
  },
  {
    id: 10,
    username: "elvin_music",
    full_name: "Elvin Bağırov",
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
    caption: "Bakının gözəl mənzərəsi. Hər kəsə xoş həftəsonu!",
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
      "Bu gün dostlarla nahar etdik. Dadı damağımda qaldı! #food #friends",
    likes_count: 88,
    comments_count: 5,
    created_at: "2025-07-26T10:15:10Z",
  },
  {
    id: 103,
    user_id: 3,
    image_url:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1080",
    caption: "Mənim sevimli dostumla gəzinti. 🐾 #dog #love",
    likes_count: 230,
    comments_count: 25,
    created_at: "2025-07-25T18:00:00Z",
  },
  {
    id: 104,
    user_id: 6,
    image_url:
      "https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=1080",
    caption: "Səyahətdən unudulmaz bir an. Bura möhtəşəmdir! #travel #beach",
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
      "React Native ilə yeni layihəyə başladıq! #reactnative #coding #supabase",
    likes_count: 150,
    comments_count: 32,
    created_at: "2025-07-24T22:05:00Z",
  },
  {
    id: 106,
    user_id: 4,
    image_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080",
    caption: "Dağların ətəyində sakit bir gün. #nature #mountains #photography",
    likes_count: 410,
    comments_count: 33,
    created_at: "2025-07-24T11:10:00Z",
  },
  {
    id: 107,
    user_id: 8,
    image_url:
      "https://images.unsplash.com/photo-1540496905036-5937c3334723?q=80&w=1080",
    caption: "Səhər məşqi tamamlandı! #fitness #motivation #gym",
    likes_count: 180,
    comments_count: 22,
    created_at: "2025-07-23T07:00:00Z",
  },
  {
    id: 108,
    user_id: 7,
    image_url:
      "https://images.unsplash.com/photo-1524995767968-9b24b8941a87?q=80&w=1080",
    caption: "Yeni bir hekayəyə başlamaq vaxtıdır. 📖 #booklover #reading",
    likes_count: 95,
    comments_count: 9,
    created_at: "2025-07-22T19:55:00Z",
  },
  {
    id: 109,
    user_id: 10,
    image_url:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1080",
    caption: "Yeni musiqi kəşfləri. Bu həftəsonu üçün tövsiyəniz var?",
    likes_count: 75,
    comments_count: 15,
    created_at: "2025-07-22T14:30:00Z",
  },
  {
    id: 110,
    user_id: 2,
    image_url:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1080",
    caption: "Meşədə gəzinti insanı ruhən dincəldir.",
    likes_count: 215,
    comments_count: 19,
    created_at: "2025-07-21T16:45:00Z",
  },
  {
    id: 111,
    user_id: 1,
    image_url:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1080",
    caption: "Dostlar var olsun!",
    likes_count: 350,
    comments_count: 41,
    created_at: "2025-07-21T13:00:00Z",
  },
  {
    id: 112,
    user_id: 6,
    image_url:
      "https://images.unsplash.com/photo-1533105079780-52b9be4ac204?q=80&w=1080",
    caption: "Növbəti səyahət planları qurulur... #traveling",
    likes_count: 620,
    comments_count: 55,
    created_at: "2025-07-20T20:20:20Z",
  },
];
