import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Prop = {
  onPress: () => void;
};

export default function DeleteImageButton({ onPress }: Prop) {
  return (
    <Pressable style={styles.circleButton} onPress={onPress}>
      <Ionicons name="close-outline" size={22} color="#BDBDBD" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  circleButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
    right: -12,
    bottom: 12,
    zIndex: 10,
  },
});
