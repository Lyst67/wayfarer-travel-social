import { Route, router, useSegments } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { fetchPosts } from "@/features/posts/operations";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectUserPosts } from "@/features/posts/postsSelectors";
import { LatLng } from "react-native-maps";

import ImageViewer from "@/components/imageViwer";
import UserImage from "@/components/userImage";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function PostsScreen() {
  const dispatch = useAppDispatch();
  const segments = useSegments<Route>();
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState<boolean>(true);
  const selectedPosts = useAppSelector(selectUserPosts);
  const postsArray = Object.entries(selectedPosts);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    // console.log("User:", user);
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    dispatch(fetchPosts());
    return subscriber;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 500);
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

  const handleLinkToMapScreen = (location: LatLng, locationMark: string) => {
    router.push({
      pathname: "/mapScreen",
      params: {
        latitude: location?.latitude,
        longitude: location?.longitude,
        currentLocation: locationMark,
      },
    });
  };

  const handleLinkToComments = () => {
    router.push("/(tabs)/commentsScreen");
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.userPostContainer}>
        <View style={styles.userContainer}>
          <View style={styles.photoContainer}>
            {!item[1].userImage ? (
              <FontAwesome5 name="user" size={44} color="lightgrey" />
            ) : (
              <UserImage selectedImage={item[1].userImage} />
            )}
          </View>
          <View>
            <Text style={styles.textName}>{item[1].userName}</Text>
            <Text style={styles.textEmail}>{item[1].userEmail}</Text>
          </View>
        </View>
        <View style={styles.userPost}>
          <View style={styles.postImage}>
            <ImageViewer selectedImage={item[1].postImage} />
          </View>
          <Text style={styles.imageText}>{item[1].imageName}</Text>
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
                onPress={() => handleLinkToComments}
              />
              <Text style={[styles.imageText, { color: "#BDBDBD" }]}>0</Text>
            </View>
            <Pressable
              onPress={() =>
                handleLinkToMapScreen(
                  item[1].postLocation,
                  item[1].locationMark
                )
              }
              style={{
                gap: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text
                style={[styles.imageText, { textDecorationLine: "underline" }]}
              >
                {item[1].imageName}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postsArray}
        keyExtractor={(item) => item[0]}
        renderItem={renderItem}
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
