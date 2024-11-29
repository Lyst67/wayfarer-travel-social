import { View, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";

export default function RegisterForm() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder={"Логін"} />
      <TextInput style={styles.input} placeholder="Адреса електронної пошти" />
      <View style={styles.passwordInput}>
        <TextInput
          style={[styles.input, { marginLeft: -16 }]}
          placeholder="Пароль"
        />
        <Pressable style={styles.passwordShow}>Показати</Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    marginBottom: 42,
    width: 342,
    marginHorizontal: "auto",
  },
  input: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 342,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordShow: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
    marginLeft: -88,
  },
});
