import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ScreensLayout() {
  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="loginScreen"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="registerScreen"
        options={{ headerShown: false, href: null }}
      />
      <Tabs.Screen
        name="createPostsScreen"
        options={{
          title: "Створити публікацію",
        }}
      />
      <Tabs.Screen
        name="commentsScreen"
        options={{ title: "Коментарі", href: null }}
      />
      <Tabs.Screen name="profileScreen" options={{ headerShown: false }} />
      <Tabs.Screen
        name="gallery"
        options={{ headerShown: false, href: null }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          href: null,
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
    </Tabs>
  );
}
