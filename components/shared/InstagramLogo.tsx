import { cn } from "@/lib/utils";
import React from "react";
import { Image } from "react-native";

const InstagramLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      source={require("@/assets/images/instagram-text-icon.png")}
      className={cn("w-32 h-12", className)}
      resizeMode="cover"
    />
  );
};

export default InstagramLogo;
