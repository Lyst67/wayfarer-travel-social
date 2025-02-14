import React from "react";
import { router, Tabs } from "expo-router";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/user/userSlice";
import { Alert } from "react-native";
import { logout } from "@/features/user/authOperations";
// import { getAuth, signOut } from '@react-native-firebase/auth';

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TabsCentreButton from "@/components/tabsCentreButton";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ScreensLayout() {
  const dispatch = useDispatch();
  // const auth = getAuth();

  const handleLogOut = async () => {  
    const { success, message } = await logout();  
  
    if (success) {  
      console.log(message);  
      dispatch(logOut()); 
    } else {  
      console.error("Error signing out: ", message);  
      Alert.alert("Logout Error", message);  
    }  
  };  

  // const handleLogOut = () => {
  //   signOut(auth)
  //     .then(() => console.log("User signed out!"))
  //     .catch((error: any) => console.error("Error signing out: ", error));
  //   dispatch(logOut());
  // };

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
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FFFFF",
          paddingTop: 9,
          paddingBottom: 9,
          height: 68,
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
        options={{
          headerShown: false,
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="registerScreen"
        options={{
          headerShown: false,
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="createPostsScreen"
        options={{
          title: "Створити публікацію",
          tabBarStyle: { display: "none" },
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
        options={{
          title: "Коментарі",
          tabBarStyle: { display: "none" },
          href: null,
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
        }}
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
        name="mapScreen"
        options={{
          headerShown: true,
          href: null,
          tabBarStyle: { display: "none" },
          headerLeft: () => {
            return (
              <MaterialIcons
                backBehavior="history"
                onPress={() => router.back()}
                name="keyboard-backspace"
                size={24}
                color="#212121CC"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  );
}
