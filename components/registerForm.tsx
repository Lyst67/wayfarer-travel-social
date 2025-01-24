import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubmitButton from "./submitButton";

type Props = {
  onSubmit: (data: any) => void;
  loading: boolean;
  userEmail?: string;
};

export default function RegisterForm({ onSubmit, loading, userEmail }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!email && userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = () => {
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = { username, email, password };
    onSubmit(formData);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={"Логін"}
            placeholderTextColor="#BDBDBD"
            value={username}
            textContentType="name"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
            placeholderTextColor="#BDBDBD"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SafeAreaView style={styles.passwordInput}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              textContentType="password"
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
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
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <SubmitButton
            onPress={handleSubmit}
            backgroundColor="#FF6C00"
            color="#fff"
            label="Зареєструватись"
          />
        )}
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
    color: "#212121",
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
