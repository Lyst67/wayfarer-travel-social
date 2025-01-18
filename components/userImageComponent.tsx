import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import UserImage from "./userImage";
import AddUserImageButton from "./addUserImageButton";
import DeleteImageButton from "./deleteImageButton";

export default function UserImageComponent() {
  const [addUserButton, setAddUserButton] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<string | null>(null);

  const pickUserImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
      setAddUserButton(false);
    } else {
      alert("You did not select any image.");
    }
  };
  const deleteUserImage = () => {
    if (userImage !== null) {
      setUserImage(null);
    }
    setAddUserButton(true);
  };

  return (
    <View style={styles.photoContainer}>
      <UserImage selectedImage={userImage} />
      {addUserButton ? (
        <AddUserImageButton onPress={pickUserImageAsync} />
      ) : (
        <DeleteImageButton onPress={deleteUserImage} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  photoContainer: {
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
    borderRadius: 16,
  },
});
