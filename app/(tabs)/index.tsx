import { router, Routes, useLocalSearchParams, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Button,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import db, {
  firebase,
  FirebaseDatabaseTypes,
} from "@react-native-firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectUserImage,
} from "../features/user/userSelectors";
import { refresh } from "../features/user/userSlice";

import ImageViewer from "@/components/imageViwer";
import UserImage from "@/components/userImage";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function PostsScreen() {
  const { latitude, longitude, place, currentLocation, postPhoto } =
    useLocalSearchParams<{
      latitude: string;
      longitude: string;
      place: string;
      currentLocation: string;
      postPhoto: string;
    }>();
  const dispatch = useDispatch();
  const userName = useSelector(selectName);
  const userEmail = useSelector(selectEmail);
  const userImage = useSelector(selectUserImage);
  const segments = useSegments<Routes>();
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState<boolean>(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    // console.log("User:", user);
    setUser(user);
    if ((user && !userName) || !userEmail) {
      dispatch(
        refresh({
          email: user?.email,
          userName: user?.displayName,
          userImage: user?.photoURL,
          userId: user?.uid,
        })
      );
    }
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    const currentSegment = segments[0] === "(tabs)";
    if (!user && currentSegment) {
      router.replace("/(tabs)/loginScreen");
    } else {
      return;
    }
  }, [user, hasMounted]);

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userPostContainer}>
        <View style={styles.userContainer}>
          <View style={styles.photoContainer}>
            {!userImage ? (
              <FontAwesome5 name="user" size={44} color="lightgrey" />
            ) : (
              <UserImage selectedImage={userImage} />
            )}
          </View>
          <View>
            <Text style={styles.textName}>{userName}</Text>
            <Text style={styles.textEmail}>{userEmail}</Text>
          </View>
        </View>
        <View style={styles.userPost}>
          <View style={styles.postImage}>
            <ImageViewer selectedImage={postPhoto} />
          </View>
          <Text style={styles.imageText}>{place}</Text>
          <View style={styles.imageDescr}>
            <View
              style={{
                flex: 1,
                gap: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <EvilIcons
                name="comment"
                size={32}
                color="#BDBDBD"
                onPress={() => router.push("/(tabs)/commentsScreen")}
              />
              <Text style={[styles.imageText, { color: "#BDBDBD" }]}>0</Text>
            </View>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/mapScreen",
                  params: {
                    latitude: latitude,
                    longitude: longitude,
                    currentLocation: currentLocation,
                  },
                })
              }
              style={{
                // flex: 1,
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text
                style={[styles.imageText, { textDecorationLine: "underline" }]}
              >
                {currentLocation}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Button
        title="Get users"
        onPress={async () => {
          db()
            .ref("/users")
            .once("value")
            .then((snapshot) => {
              console.log("User data: ", snapshot.val());
            });
        }}
      />
      <Button
        title="Get users"
        onPress={() => {
          db()
            .ref("users")
            .on("value", (snapshot) => {
              console.log("Users:", snapshot.val());
            });
        }}
      />
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
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "gray",
    overflow: "hidden",
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
