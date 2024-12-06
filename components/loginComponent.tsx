import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import LoginForm from "./loginForm";
import LinkToSignButton from "./linkToSignButton";

export default function LoginComponent() {
  const navToRegister = () => {
    router.push({ pathname: "/registerScreen", params: { user: "pavlo" } });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.text}>Увійти</Text>
        <LoginForm />
        <LinkToSignButton
          text="Немає акаунту?"
          label="Зареєструватися"
          onPress={navToRegister}
        />
        <View style={styles.homeIndicator} />
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: 132,
    marginBottom: 8,
    backgroundColor: "#212121",
    borderRadius: 100,
  },
});
