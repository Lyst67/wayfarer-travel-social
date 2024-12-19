import UserImage from "@/components/userImage";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function PostsScreen() {
  const [mounted, setMounted] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>("Pavlo Lyst");
  const [userEmail, setUserEmail] = useState<string | null>("p_listopad@net");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setMounted(true);
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     router.navigate("/loginScreen");
  //   }
  // }, [mounted]);
  const photo = require("../../assets/images/userimage.png");

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.photoContainer}>
          <UserImage selectedImage={userImage} />
          <Image source={photo} style={styles.image} />
        </View>
        <View>
          <Text style={styles.textName}>{userName}</Text>
          <Text style={styles.textEmail}>{userEmail}</Text>
        </View>
      </View>

      <Link
        href={"/(tabs)/loginScreen"}
        style={[
          styles.textEmail,
          {
            textDecorationLine: "underline",
            backgroundColor: "darkseagreen",
            fontSize: 24,
            textAlign: "center",
            marginTop: "auto",
          },
        ]}
      >
        To Login
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    paddingTop: 32,
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  textName: {
    fontFamily: "Roboto",
    color: "#212121",
    fontSize: 13,
    fontWeight: 700,
  },
  textEmail: {
    fontFamily: "Roboto",
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },
});
