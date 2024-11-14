import { Text, View, StyleSheet } from "react-native";
import React from "react";
import ImageViewer from "@/components/imageViwer";
import Button from "@/components/button";

const PlaceholderImage = {
  uri: "https://docs.expo.dev/static/images/tutorial/background-image.png",
};

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgUrlSource={PlaceholderImage} />
      </View>
      <View>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 20,
  },
});
