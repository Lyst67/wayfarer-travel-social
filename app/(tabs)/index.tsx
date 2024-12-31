import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import ImageViewer from "@/components/imageViwer";
import UserImage from "@/components/userImage";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";

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
      <View style={styles.userPostContainer}>
        <View style={styles.userContainer}>
          <View style={styles.photoContainer}>
            <UserImage selectedImage={userImage} />
            <Image source={photo} style={styles.userImage} />
          </View>
          <View>
            <Text style={styles.textName}>{userName}</Text>
            <Text style={styles.textEmail}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.userPost}>
          <View style={styles.postImage}>
            <ImageViewer selectedImage={""} />

            {/* <Image source={photo} style={styles.image} /> */}
          </View>
          <Text style={styles.imageText}>Ліс</Text>
          <View style={styles.imageDescr}>
            <View
              style={{
                flex: 1,
                gap: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <EvilIcons name="comment" size={32} color="#BDBDBD" />
              <Text style={[styles.imageText, { color: "#BDBDBD" }]}>0</Text>
            </View>
            <View
              style={{
                // flex: 1,
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather
                onPress={() => router.push("/mapScreen")}
                name="map-pin"
                size={24}
                color="#BDBDBD"
              />
              <Text
                style={[styles.imageText, { textDecorationLine: "underline" }]}
              >
                Ukraine
              </Text>
            </View>
          </View>
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
    gap: 34,
    backgroundColor: "#FFFFF",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  userPostContainer: {
    flex: 1,
    gap: 32,
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
  },
  userImage: {
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
  userPost: {
    flex: 1,
    gap: 8,
    marginHorizontal: "auto",
  },
  postImage: {
    width: 343,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  imageDescr: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
