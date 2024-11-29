import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLloaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
    Times: require("../assets/fonts/TimesNewRoman.ttf"),
    Helvetica: require("../assets/fonts/Helvetica.ttf"),
    Roboto: require("../assets/fonts/Roboto.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);

  if (!fontsLloaded) {
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
