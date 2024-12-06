import React from "react";
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Medium",
          fontSize: 17,
        },
        headerShadowVisible: true,
        // tabBarActiveTintColor: "orange",
        // tabBarStyle: {
        //   backgroundColor: "lightgray",
        // },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home Page",
          //   tabBarIcon: ({ focused, color }) => (
          //     <Ionicons
          //       name={focused ? "home-sharp" : "home-outline"}
          //       color={color}
          //       size={24}
          //     />
          //   ),
        }}
      />
      <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="registerScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="createPostsScreen"
        options={{
          title: "Створити публікацію",
        }}
      />
      <Stack.Screen name="postsScreen" options={{ title: "Публікації" }} />
      <Stack.Screen name="commentsScreen" options={{ title: "Коментарі" }} />
      <Stack.Screen name="profileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="gallery" options={{ headerShown: false }} />

      <Stack.Screen
        name="about"
        options={{
          title: "About",

          // tabBarIcon: ({ focused, color }) => (
          //   <Ionicons
          //     name={
          //       focused ? "information-circle" : "information-circle-outline"
          //     }
          //     color={color}
          //     size={24}
          //   />
          // ),
        }}
      />
    </Stack>
  );
}
