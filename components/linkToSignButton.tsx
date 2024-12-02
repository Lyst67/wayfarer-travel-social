import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { View } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

export default function LinkToSignButton({ label, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    marginBottom: 66,
    marginHorizontal: "auto",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
