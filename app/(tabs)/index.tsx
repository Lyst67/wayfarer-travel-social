import LoginScreen from "@/components/Screens/loginScreen";
import RegistrationScreen from "@/components/Screens/registrationScreen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgreen" hidden={false} />
      <ImageBackground
        source={require("../../assets/images/photo-bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        {/* <RegistrationScreen /> */}
        <LoginScreen />
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
});
