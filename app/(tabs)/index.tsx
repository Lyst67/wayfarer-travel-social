import RegistrationScreen from "@/components/Screens/registrationScreen";
import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/photo-bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <RegistrationScreen />
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

  // button: {
  //   textDecorationLine: "underline",
  //   fontSize: 22,
  //   textAlign: "center",
  // },
});
