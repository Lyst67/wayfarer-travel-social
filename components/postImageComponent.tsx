import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import CameraComponent from "./cameraComponent";
import CameraPlaceholder from "./cameraPlaceholder";
import ImageViewer from "./imageViwer";

type Props = {
  postPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function PostImageComponent({ postPhoto }: Props) {
  const [cameraPhoto, setCameraPhoto] = useState<string>();

  const handleCameraPhoto = (url: string) => {
    setCameraPhoto(url);
    postPhoto(url);
  };
  const handleClear = () => {
    setCameraPhoto("");
  };

  const photo = require("../assets/images/landScape1.png");

  return (
    <View style={styles.imageContainer}>
      <View style={styles.postImage}>
        {cameraPhoto ? (
          <ImageViewer selectedImage={cameraPhoto} />
        ) : (
          <CameraComponent cameraPhoto={handleCameraPhoto} />
        )}
        {/* <Image source={photo} style={styles.image} /> */}
        {cameraPhoto && (
          <Pressable style={styles.cameraPlaceholder} onPress={handleClear}>
            <CameraPlaceholder backgroundColor="#ffffff4d" color="#FFFFFF" />
          </Pressable>
        )}
      </View>
      <View style={{ marginHorizontal: "auto", width: 343 }}>
        <Text style={styles.imageText}>
          {!cameraPhoto ? "Завантажте фото" : "Редагувати фото"}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    marginHorizontal: "auto",
    gap: 8,
  },
  postImage: {
    width: 343,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cameraPlaceholder: {
    position: "absolute",
  },
  imageText: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
  },
});
