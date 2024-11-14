import { StyleSheet, Image, type ImageURISource } from "react-native";
// import { Image, type ImageSource } from "expo-image";
import React from "react";

type Props = {
  imgUrlSource?: ImageURISource;
};

export default function ImageViewer({ imgUrlSource }: Props) {
  return <Image source={imgUrlSource} style={styles.image} />;
}
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
