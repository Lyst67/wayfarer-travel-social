import { View, StyleSheet, Pressable } from "react-native";
import React from "react";

type Props = {
  icon: React.ReactNode;
  backGroundColor: string;
};

export default function TabsCentreButton({ icon, backGroundColor }: Props) {
  return (
    <View style={styles.centreButtonContainer}>
      <View style={[styles.centreButton, { backgroundColor: backGroundColor }]}>
        {icon}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centreButtonContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  centreButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
