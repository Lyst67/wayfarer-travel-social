import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { login } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks";

import LoginForm from "./loginForm";
import LinkToSignButton from "./linkToSignButton";

type UserData = {
  username?: string;
  email?: string;
  password?: string;
};

export default function LoginComponent({ userEmail }: { userEmail: string }) {
  const [formData, setFormData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const navToRegister = () => {
    const email = formData?.email;
    router.push({
      pathname: "/registerScreen",
      params: { userEmail: email },
    });
  };

  const handleLogin = async (data: UserData | undefined) => {
    // setLoading(true);
    setFormData(data);
    const email = data?.email;
    const password = data?.password;
    if (email && password) {
      try {
        const responce = await auth().signInWithEmailAndPassword(
          email,
          password
        );
        const userName = responce.user.displayName;
        const userImage = responce.user.photoURL;
        const userId = responce.user.uid;
        dispatch(
          login({
            email: email,
            userName: userName,
            userImage: userImage,
            userId: userId,
          })
        );
        Alert.alert(`Hello! ${userName}`);
        router.replace("/");
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
      <Text style={styles.text}>Увійти</Text>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        userEmail={userEmail}
      />
      <LinkToSignButton
        text="Немає акаунту?"
        label="Зареєструватися"
        onPress={navToRegister}
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
    paddingBottom: 132,
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
