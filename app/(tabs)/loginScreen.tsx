import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  Pressable,
} from "react-native";
import React from "react";
import LoginComponent from "@/components/loginComponent";
// import { useGlobalSearchParams } from "expo-router";

export default function LoginScreen() {
  // const { userName, userEmail } = useGlobalSearchParams();

  return (
    <Pressable onPress={() => Keyboard?.dismiss} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photo-bg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <LoginComponent />
        </ImageBackground>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
