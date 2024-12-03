import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import React, { useState } from "react";
import SignButton from "./signButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    console.log(`Username: ${username}  Email: ${email}`);
    alert("Registration Successful");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder={"Логін"}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <SafeAreaView style={styles.passwordInput}>
              <TextInput
                style={styles.input}
                secureTextEntry={!showPassword}
                textContentType="password"
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                style={styles.passwordShow}
                onPress={toggleShowPassword}
              >
                <Text style={styles.passwordShowText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
          <SignButton onPress={handleSubmit} label="Увійти" />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
    marginBottom: 42,
    width: 343,
    marginHorizontal: "auto",
  },
  input: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 343,
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
    marginLeft: -88,
  },
  passwordShowText: {
    width: 88,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
});
