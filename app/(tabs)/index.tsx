import { router, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  FlatList,
  Alert,
  Button,
} from "react-native";
import {
  decrementPostLike,
  fetchPosts,
  incrementPostLike,
} from "@/features/posts/operations";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectUserPosts } from "@/features/posts/postsSelectors";
import { LatLng } from "react-native-maps";
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import { selectComments } from "@/features/comments/commentsSelector";

import ImageViewer from "@/components/imageViwer";
import UserImage from "@/components/userImage";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { routeToScreen } from "expo-router/build/useScreens";

export default function PostsScreen() {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const segments = useSegments();
  const auth = getAuth();
  const selectedPosts = useAppSelector(selectUserPosts);
  const selectedComments = useAppSelector(selectComments);
  const postsArray = Object.entries(selectedPosts);

  const commentsCount = (postId: string) => {
    return (
      Object.values(selectedComments).filter(
        (comment) => comment.commentedPostId === postId
      ).length || 0
    );
  };

  const currentUser = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    console.log("User:", user?.displayName);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, currentUser);
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

  const handleLinkToComments = (
    postId: string,
    authorId: string,
    postImage: string
  ) => {
    router.push({
      pathname: "/(tabs)/commentsScreen",
      params: {
        selectedPostId: postId,
        postAuthorId: authorId,
        selectedImage: postImage,
      },
    });
  };
 
  const handleToggleLike = (postId: string, postData: any) => {
    const liked = () => {return !user || postData[1] && !postData[1].likes || !postData.likes[user.uid] ? false : postData.likes[user.uid].liked}  
    console.log(liked());
    console.log(user?.uid);
    try {
      if (!liked() && user?.uid) {
        dispatch(incrementPostLike({ postId, uid: user.uid }));
        Alert.alert("Like successfully created!");
        dispatch(fetchPosts());
      } else if (liked() && user?.uid) {
        dispatch(decrementPostLike({ postId, uid: user.uid }));
        Alert.alert("Like successfully deleted!");
        dispatch(fetchPosts());
      } else {
        return;
      }
    } catch (error) {
      console.error("Like failed:", error);
      Alert.alert("Failed to create like.");
    }
  };

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
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
          <View style={{ flex: 1, flexDirection: "row", gap: 24 }}>
            <Pressable
              style={styles.descrItem}
              onPress={() =>
                handleLinkToComments(item[0], item[1].userId, item[1].postImage)
              }
            >
              {commentsCount(item[0]) === 0 ? (
                <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
              ) : (
                <FontAwesome name="comment" size={24} color="#FF6C00" />
              )}
              <Text style={[styles.imageText, { color: "#BDBDBD" }]}>
                {commentsCount(item[0])}
              </Text>
            </Pressable>
            <Pressable
              style={styles.descrItem}
              onPress={() => handleToggleLike(item[0], item[1])}     
            >
              {user && item[1].likes && item[1].likes[user.uid] && !item[1].likes[user.uid].liked ? (
                <AntDesign name="like2" size={24} color="#FF6C00" />
              ) : (
                <AntDesign name="like1" size={24} color="#FF6C00" />
              )}
              <Text style={[styles.imageText, { color: "#BDBDBD" }]}>
              {item[1].likesCount ? item[1].likesCount : 0}
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() =>
              handleLinkToMapScreen(item[1].postLocation, item[1].locationMark)
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
              {item[1].locationMark ? item[1].locationMark.split(",").slice(1) : "Place"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Gallery" onPress={()=> router.replace("/gallery")}/>
      {postsArray.length ? (
        <FlatList
          data={postsArray}
          keyExtractor={(item) => item[0]}
          renderItem={renderItem}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>There are no posts yet.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  userPostContainer: {
    flex: 1,
    gap: 32,
    marginBottom: 32,
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
  descrItem: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
});
