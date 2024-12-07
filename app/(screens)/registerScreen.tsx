import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import RegisterComponent from "@/components/registerComponent";
// import { useGlobalSearchParams } from "expo-router";

export default function RegisterScreen() {
  // const { userEmail } = useGlobalSearchParams();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard?.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photo-bg.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <RegisterComponent />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});
