import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
  label: string;
  onPress: () => void;
};

export default function SignButton({ label, onPress }: Props) {
  return (
    <>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 343,
    marginHorizontal: "auto",
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonLabel: {
    fontFamily: "Roboto",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
