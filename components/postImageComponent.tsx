import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import CameraComponent from "./cameraComponent";
import CameraPlaceholder from "./cameraPlaceholder";
import ImageViewer from "./imageViwer";

type Props = {
  setPostImage: React.Dispatch<React.SetStateAction<string | null | undefined>>;
};

export default function PostImageComponent({ setPostImage }: Props) {
  const [postImagePhoto, setPostImagePhoto] = useState<string>();
  const [startCamera, setStartCamera] = useState<boolean>(false);

  const handleCameraPhoto = (url: string) => {
    setStartCamera(false);
    setPostImagePhoto(url);
    setPostImage(url);
  };

  const handleUploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPostImagePhoto(result.assets[0].uri);
      setPostImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleClear = () => {
    setStartCamera(false);
    setPostImagePhoto("");
  };

  return (
    <View style={styles.imageContainer}>
      <View style={styles.postImage}>
        {startCamera && !postImagePhoto ? (
          <CameraComponent cameraPhoto={handleCameraPhoto} />
        ) : !startCamera && postImagePhoto ? (
          <ImageViewer selectedImage={postImagePhoto} />
        ) : null}

        {!startCamera && !postImagePhoto ? (
          <Pressable
            style={styles.cameraPlaceholder}
            onPress={() => setStartCamera(true)}
          >
            <CameraPlaceholder backgroundColor="#FFF" color="#BDBDBD" />
          </Pressable>
        ) : !startCamera && postImagePhoto ? (
          <Pressable style={styles.cameraPlaceholder} onPress={handleClear}>
            <CameraPlaceholder backgroundColor="#ffffff4d" color="#FFFFFF" />
          </Pressable>
        ) : null}
      </View>
      <View style={{ marginHorizontal: "auto", width: 343 }}>
        {!postImagePhoto ? (
          <Pressable onPress={handleUploadPhoto}>
            <Text style={styles.imageText}>Завантажте фото</Text>
          </Pressable>
        ) : (
          <Text style={styles.imageText}>Редагувати фото</Text>
        )}
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
