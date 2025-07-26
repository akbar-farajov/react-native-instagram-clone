import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type AuthButtonProps = {
  onPress: () => void;
  loading: boolean;
  buttonText: string;
};
export const AuthButton = ({
  onPress,
  loading,
  buttonText,
}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`bg-primary p-4 rounded-lg items-center focus:opacity-80${
        loading ? "opacity-80" : ""
      }`}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold text-base">{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};
