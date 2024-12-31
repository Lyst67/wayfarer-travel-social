import { View, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  backgroundColor: string;
  color: string;
};

export default function CameraPlaceholder({ backgroundColor, color }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.placeholderContainer,
          { backgroundColor: backgroundColor },
        ]}
      >
        <MaterialIcons name="photo-camera" size={24} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
