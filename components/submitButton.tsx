import { Text, View, Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
  label: string;
  backgroundColor: string;
  color: string;
  onPress?: () => void;
};

export default function SubmitButton({
  label,
  backgroundColor,
  color,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonLabel, { color: color }]}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 343,
    marginHorizontal: "auto",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
  },
  buttonLabel: {
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
  },
});
