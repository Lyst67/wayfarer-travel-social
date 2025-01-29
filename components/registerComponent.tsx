import { StyleSheet, View, Text, Alert, Button } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { useDispatch } from "react-redux";
import { register } from "@/app/features/user/userSlice";

import RegisterForm from "./registerForm";
import LinkToSignButton from "./linkToSignButton";
import UserImageComponent from "./userImageComponent";

type UserData = {
  username?: string;
  email?: string;
  password?: string;
};

export default function RegisterComponent({
  userEmail,
}: {
  userEmail: string;
}) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const navToLogin = () => {
    const email = formData?.email;
    router.push({
      pathname: "/loginScreen",
      params: { userEmail: email },
    });
  };

  // const createProfile = async (
  //   responce: FirebaseAuthTypes.UserCredential,
  //   userName: string | undefined
  // ) => {
  //   await db().ref(`/users/${responce.user.uid}`).set({ name: userName });
  // };

  const handleRegister = async (data: UserData | undefined) => {
    setLoading(true);
    setFormData(data);
    const email = data?.email;
    const password = data?.password;
    const userName = data?.username;
    if (email && password) {
      try {
        const responce = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        if (responce.user) {
          await auth().currentUser?.updateProfile({
            displayName: `${userName}`,
            photoURL: `${userImage}`,
          });
          // await createProfile(responce, userName);
          const userId = responce.user.uid;
          dispatch(
            register({
              email: email,
              userName: userName,
              userImage: userImage,
              userId: userId,
            })
          );
          Alert.alert(`Hello! ${userName}`);
          router.replace("/");
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
      <UserImageComponent currentUserImage={setUserImage} />
      <Text style={styles.text}>Реєстрація</Text>
      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
        userEmail={userEmail}
      />
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
