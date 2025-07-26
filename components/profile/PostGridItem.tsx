import { Post } from "@/types";
import React from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width / 3 - 2;

interface PostGridItemProps {
  post: Post;
}

export const PostGridItem: React.FC<PostGridItemProps> = ({ post }) => {
  return (
    <TouchableOpacity className="p-0.5">
      <Image
        source={{ uri: post.image_url }}
        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
        className="bg-gray-200"
      />
    </TouchableOpacity>
  );
};
