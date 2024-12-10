import React from "react";
import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";
import TabsCentreButton from "@/components/tabsCentreButton";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function ScreensLayout() {
  const handleLogOut = () => {};

  return (
    <Tabs
      screenOptions={{
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerRightContainerStyle: { paddingRight: 16 },
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
        tabBarActiveTintColor: "#FF6C00",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "auto",
          backgroundColor: "#FFF",
          paddingTop: 9,
          paddingBottom: 9,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Публікації",
          headerRight: () => {
            return (
              <MaterialIcons
                onPress={handleLogOut}
                name="logout"
                size={24}
                color="#BDBDBD"
              />
            );
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={24}
              name={focused ? "grid" : "grid-outline"}
              color={color}
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
          headerLeft: () => {
            return (
              <MaterialIcons
                onPress={() => router.navigate("./")}
                name="keyboard-backspace"
                size={24}
                color="#212121CC"
              />
            );
          },
          tabBarIcon: ({ focused, color }) => (
            <TabsCentreButton
              backGroundColor="#FF6C00"
              icon={<MaterialIcons name="add" size={20} color="#FFF" />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="commentsScreen"
        options={{ title: "Коментарі", href: null }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{ headerShown: false, href: null }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          href: null,
        }}
      />
    </Tabs>
  );
}
