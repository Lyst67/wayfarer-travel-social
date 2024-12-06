import { Stack, Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not found." }} />
      <View style={styles.container}>
        <Link href={"/"} style={styles.text}>
          Go Back to Home screen!
        </Link>
      </View>
    </>
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
    fontSize: 20,
    lineHeight: 84,
    fontWeight: "bold",
    textDecorationLine: "underline",
    backgroundColor: "#000000c0",
  },
});
