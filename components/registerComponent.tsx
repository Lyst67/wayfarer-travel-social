import { StyleSheet, View, Text, Alert, Button } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

import RegisterForm from "./registerForm";
import LinkToSignButton from "./linkToSignButton";
import UserImageComponent from "./userImageComponent";

type UserData = {
  username?: string;
  email?: string;
  password?: string;
};

export default function RegisterComponent() {
  const [formData, setFormData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const navToLogin = () => {
    const email = formData?.email;
    const name = formData?.username;
    router.push({
      pathname: "/loginScreen",
      params: { userEmail: email, userName: name },
    });
  };

  const createProfile = async (responce: FirebaseAuthTypes.UserCredential) => {
    console.log(formData?.username);
    await db()
      .ref(`/users${responce.user.uid}`)
      .set({ name: formData?.username });
  };

  const handleRegister = async (data: UserData | undefined) => {
    setLoading(true);
    setFormData(data);
    // console.log("Received form data:", data);
    const email = data?.email;
    const password = data?.password;
    if (email && password) {
      try {
        const responce = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        // console.log(responce);
        console.log(responce.user.email, responce.user.uid);
        if (responce.user) {
          await createProfile(responce);
          // router.navigate("/");
        }
      } catch (err: any) {
        console.log(err.message);
        Alert.alert("Error:" + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <UserImageComponent />
      <Text style={styles.text}>Реєстрація</Text>
      <RegisterForm onSubmit={handleRegister} loading={loading} />
      <LinkToSignButton
        text="Вже є акаунт?"
        label="Увійти"
        onPress={navToLogin}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    paddingBottom: 66,
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
});
