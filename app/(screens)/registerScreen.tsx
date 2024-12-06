import { View, ImageBackground, StyleSheet, Text } from "react-native";
import React from "react";
import RegisterComponent from "@/components/registerComponent";
import { router, useGlobalSearchParams } from "expo-router";

export default function RegisterScreen() {
  const { user } = useGlobalSearchParams();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/photo-bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        {/* <Text style={styles.text}>{user}</Text> */}
        <RegisterComponent />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    // opacity: 0.7,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 284,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
    zIndex: 10,
  },
});
