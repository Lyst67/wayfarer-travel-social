import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";

type Props = {
  selectedImage?: string | null;
};

export default function UserImage({ selectedImage }: Props) {
  if (!selectedImage) {
    return null;
  }

  return <Image source={{ uri: selectedImage }} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});
