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
        <View>
          <Text style={styles.text}>Hello, Expo!</Text>
        </View>
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
    lineHeight: 84,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
  button: {
    textDecorationLine: "underline",
    fontSize: 22,
    textAlign: "center",
  },
});
