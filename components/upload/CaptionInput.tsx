import React from "react";
import { TextInput } from "react-native";

interface CaptionInputProps {
  caption: string;
  setCaption: (text: string) => void;
}

export const CaptionInput: React.FC<CaptionInputProps> = ({
  caption,
  setCaption,
}) => {
  return (
    <TextInput
      value={caption}
      onChangeText={setCaption}
      placeholder="Write a caption..."
      multiline
      className="text-base mt-4 p-2"
      style={{ textAlignVertical: "top" }}
    />
  );
};
