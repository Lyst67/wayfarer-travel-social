import { Text, Pressable, StyleSheet, View } from "react-native";
import React from "react";

type Props = {
  label: string;
  text: string;
  onPress: () => void;
};

export default function LinkToSignButton({ label, text, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
});
