import { Text, View, StyleSheet } from "react-native";
import React from "react";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, Sicker Smash!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
});
