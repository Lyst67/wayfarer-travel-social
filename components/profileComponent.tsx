import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import UserImage from "./userImage";
import ImageViewer from "./imageViwer";
import { router } from "expo-router";
import { LatLng } from "react-native-maps";
import Feather from "@expo/vector-icons/Feather";
import { useAppSelector } from "@/hooks";
import { selectName, selectUserImage } from "@/features/user/userSelectors";
import { selectUserPosts } from "@/features/posts/postsSelectors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ProfileComponent() {
  const userImage = useAppSelector(selectUserImage);
  const userName = useAppSelector(selectName);
  const selectedPosts = useAppSelector(selectUserPosts);
  const postsArray = Object.entries(selectedPosts);
  //   const filteredComments = useAppSelector(selectFilteredComments(postId));

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

  const handleLinkToComments = (postId: string, postImage: string) => {
    router.push({
      pathname: "/(tabs)/commentsScreen",
      params: {
        selectedPostId: postId,
        selectedImage: postImage,
      },
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.userPostContainer}>
      <View style={styles.userPost}>
        <View style={styles.postImage}>
          <ImageViewer selectedImage={item[1].postImage} />
        </View>
        <Text style={styles.imageText}>{item[1].imageName}</Text>
        <View style={styles.imageDescr}>
          <View style={{flex:1, flexDirection: "row", gap: 24}}>
              <View style={styles.descrItem}>
                <FontAwesome
                   name="comment"
                   size={24}
                   color="#FF6C00"
                   onPress={() => handleLinkToComments(item[0], item[1].postImage)}
                  />
                  <Text style={[styles.imageText, { color: "#BDBDBD" }]}>0</Text>
              </View>
              <View style={styles.descrItem}>  
                  <AntDesign name="like2" size={24} color="#FF6C00" />
                  <Text style={[styles.imageText, { color: "#BDBDBD" }]}>10</Text>
              </View>  
          </View>
          <Pressable
            onPress={() =>
              handleLinkToMapScreen(item[1].postLocation, item[1].locationMark)
            }
            style={[styles.descrItem, {gap: 4}]}
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <UserImage selectedImage={userImage} />
      </View>
      <Text style={styles.text}>{userName}</Text>
    
        <FlatList 
          data={postsArray}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
          onEndReachedThreshold={0.5}
        />
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#fff",
    // position: "absolute",
    top: 147,
  },
  photoContainer: {
    width: 120,
    height: 120,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
    borderRadius: 16,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
    letterSpacing: 0.3,
    fontWeight: 500,
    marginVertical: 32,
  },
  userPostContainer: {
    flex: 1,
    gap: 32,
    marginBottom: 32,
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
  imageText: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  imageDescr: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descrItem: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  }
});
