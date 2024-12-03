import { StyleSheet, View, Text } from "react-native";
import React from "react";
import LinkToSignButton from "../linkToSignButton";
import LoginForm from "../loginForm";

export default function LoginScreen() {
  const navigateToLOgIn = () => {
    alert("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Реєстрація</Text>
      <LoginForm />
      <LinkToSignButton
        label="Немає акаунту? Зареєструватися"
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
