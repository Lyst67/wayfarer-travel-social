import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import RegisterForm from "../registerForm";
import LinkToSignButton from "../linkToSignButton";
import UserImage from "../userImage";
import AddUserImageButton from "../addUserImageButton";
import DeleteImageButton from "../deleteImageButton";

export default function RegistrationScreen() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [addUserButton, setAddUserButton] = useState<boolean>(true);

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
  const navigateToLOgIn = () => {
    alert("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <UserImage selectedImage={userImage} />
        {addUserButton ? (
          <AddUserImageButton onPress={pickUserImageAsync} />
        ) : (
          <DeleteImageButton onPress={deleteUserImage} />
        )}
      </View>
      <Text style={styles.text}>Реєстрація</Text>
      <RegisterForm />
      <LinkToSignButton
        label="Вже є акаунт? Увійти"
        onPress={navigateToLOgIn}
      />
      <View style={styles.homeIndicator} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
  },
  photoContainer: {
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
    borderRadius: 16,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
    letterSpacing: 0.3,
    fontWeight: 500,
    marginVertical: 32,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    marginHorizontal: "auto",
    marginTop: 66,
    marginBottom: 8,
    backgroundColor: "#212121",
    borderRadius: 100,
  },
});
