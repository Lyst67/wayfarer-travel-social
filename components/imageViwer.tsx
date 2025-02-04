import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";
import React from "react";

type Props = {
  imgSource?: ImageSource;
  selectedImage?: string | null;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : imgSource}
      style={styles.image}
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
