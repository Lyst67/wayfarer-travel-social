import { StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import AddUserButton from "../addUserButton";
import RegisterForm from "../registerForm";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <AddUserButton />
      </View>
      <Text style={styles.text}>Реєстрація</Text>
      <RegisterForm />
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
});
