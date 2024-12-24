import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { captureRef } from "react-native-view-shot";

type Props = {
  cameraPhoto: React.Dispatch<React.SetStateAction<string>>;
};

export default function CameraComponent({ cameraPhoto }: Props) {
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const cameraRef1 = useRef<any>(null);
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
        // const result = await captureRef(cameraRef, {
        //   result: "tmpfile",
        //   quality: 1,
        //   format: "png",
        // });
        // const photo = await MediaLibrary.saveToLibraryAsync(uri);
        const image = await MediaLibrary.createAssetAsync(uri);
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
        <View style={styles.photoView}>
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
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    width: 343,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 1,
    alignItems: "center",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
