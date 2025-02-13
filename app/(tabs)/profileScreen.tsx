import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import ProfileComponent from "@/components/profileComponent";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/photo-bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
      <ProfileComponent/>
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
