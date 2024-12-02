import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Prop = {
  onPress: () => void;
};

export default function AddUserButton({ onPress }: Prop) {
  return (
    <Pressable style={styles.circleButton} onPress={onPress}>
      <MaterialIcons name="add" size={12} color="#FF6C00" />
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
    borderColor: "#FF6C00",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 12,
    marginRight: -12,
  },
});
