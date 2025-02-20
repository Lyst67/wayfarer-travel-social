import { StyleSheet, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { register } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@react-native-firebase/auth';

import RegisterForm from "./registerForm";
import LinkToSignButton from "./linkToSignButton";
import UserImageComponent from "./userImageComponent";

type UserData = {
  userName: string;
  email: string;
  password: string;
};

export default function RegisterComponent({
  userEmail,
}: {
  userEmail: string;
}) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const navToLogin = () => {
    const email = formData?.email;
    router.push({
      pathname: "/loginScreen",
      params: { userEmail: email },
    });
  };

  const handleRegister = async (data: UserData | undefined) => {
    setLoading(true);
    setFormData(data);
    const email = data?.email;
    const password = data?.password;
    const userName = data?.userName;
    if (email && password) {
      try {
        const responce = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (responce.user) {
          console.log("New User:", responce.user)
          await updateProfile( responce.user, {
            displayName: `${userName}`,
            photoURL: `${userImage}`,
          });
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
