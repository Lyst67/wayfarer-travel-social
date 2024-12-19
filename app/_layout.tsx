import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
    Times: require("../assets/fonts/TimesNewRoman.ttf"),
    Helvetica: require("../assets/fonts/Helvetica.ttf"),
    Roboto: require("../assets/fonts/Roboto.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{}} />
      </Stack>
    </GestureHandlerRootView>
  );
}
