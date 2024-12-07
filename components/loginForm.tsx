import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SignButton from "./signButton";

type Props = {
  onSubmit: (data: any) => void;
};

export default function LoginForm({ onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = { email, password };
    onSubmit(formData);
    alert("Login Successful");
    setPassword(""); // очищуємо поля форми
    setEmail("");
  };
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
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
            <Pressable style={styles.passwordShow} onPress={toggleShowPassword}>
              <Text style={styles.passwordShowText}>
                {showPassword ? "Сховати" : "Показати"}
              </Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>
        <SignButton onPress={handleSubmit} label="Увійти" />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
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
