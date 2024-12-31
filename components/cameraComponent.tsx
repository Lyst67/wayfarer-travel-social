import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraPlaceholder from "./cameraPlaceholder";

type Props = {
  cameraPhoto: (url: string) => void;
};

export default function CameraComponent({ cameraPhoto }: Props) {
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [type, setType] = useState<CameraType>("back");

  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={setHasPermission} title="Grant Permission" />
      </View>
    );
  }

  function handleCameraType() {
    setType((type) => (type === "back" ? "front" : "back"));
    console.log("Camera Changed!");
  }

  async function handleAsyncTakePicture() {
    if (cameraRef) {
      try {
        const camera = cameraRef.current;
        if (!camera) return;
        const { uri }: CameraCapturedPicture = await camera.takePictureAsync();
        const image: MediaLibrary.Asset = await MediaLibrary.createAssetAsync(
          uri
        );
        cameraPhoto(image.uri);
        console.log(`Result: ${image.uri}`);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={type} ref={cameraRef}>
        <View style={styles.cameraView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={handleCameraType}
          >
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 16,
                color: "white",
              }}
            >
              Flip Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleAsyncTakePicture();
            }}
          >
            <CameraPlaceholder color="#BDBDBD" backgroundColor="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    width: 343,
    height: 240,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  flipContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    position: "absolute",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
