import {
  View,
  StyleSheet,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectEmail,
  selectName,
  selectUserId,
  selectUserImage,
} from "@/features/user/userSelectors";
import { nanoid } from "@reduxjs/toolkit";
import db from "@react-native-firebase/database";

import Feather from "@expo/vector-icons/Feather";
import TabsCentreButton from "@/components/tabsCentreButton";
import PostImageComponent from "@/components/postImageComponent";
import PostInput from "@/components/postInput";
import SubmitButton from "@/components/submitButton";

export default function CreatePostsScreen() {
  const dispatch = useAppDispatch();
  const [postImage, setPostImage] = useState<string | null>();
  const [location, setLocation] = useState<LatLng | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [postName, setPostName] = useState<string | null>();
  const [postPlace, setPostPlace] = useState<string | null>();
  const [address, setAddress] = useState<
    Location.LocationGeocodedAddress[] | null
  >();
  const userId = useAppSelector(selectUserId);
  const userName = useAppSelector(selectName);
  const userEmail = useAppSelector(selectEmail);
  const userImage = useAppSelector(selectUserImage);
  const postId = nanoid();

  const postData = {
    userId: userId,
    userName: userName,
    userEmail: userEmail,
    userImage: userImage,
    postImage: postImage,
    imageName: postName,
    postLocation: location,
    locationMark: postPlace,
  };

  useEffect(() => {
    if (location) {
      console.log(location)
      db().ref(`/posts/${postId}`)
     .set({
      userId: postData.userId,
      userName: postData.userName,
      userEmail: postData.userEmail,
      userImage: postData.userImage,
      postImage: postData.postImage,
      imageName: postData.imageName,
      postLocation: postData.postLocation,
      locationMark: postData.locationMark, 
    });
      // dispatch(createPost({ postId, postData }));
      router.navigate("/");
      // setLocation(null);
    } else {
      setPostImage("");
      setPostName("");
      setPostPlace("");
    }
  }, [location]);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    try {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const address = await Location.reverseGeocodeAsync(location.coords);
        console.log("Address from reverse geocode:", address);
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
        if (address.length > 0) {
          setAddress(address);
        } else {
          console.log("No address found for this location");
        }
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      setErrorMsg("Error getting current location");
    }
  }

  const handleSubmitPost = async () => {
    if (!postName || !postPlace) {
      alert("Please fill in all posts fields.");
      return;
    }
    await getCurrentLocation();
  };

  const handleCleanPost = () => {
    setLocation(null);
  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = JSON.stringify([address[0].region, address[0].country].join(","));
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.contentContainer}>
          <PostImageComponent setPostImage={setPostImage} />

          <PostInput
            postPlace={setPostPlace}
            postName={setPostName}
            location={location}
            text={text}
          />
          <View style={{ flex: 1, marginBottom: "auto" }}>
            <SubmitButton
              backgroundColor={!postName || !postPlace ? "#F6F6F6" : "#FF6C00"}
              color={!postName || !postPlace ? "#BDBDBD" : "#FFF"}
              label="Опубліковати"
              onPress={handleSubmitPost}
            />
          </View>
        </View>
        <View style={styles.trashContainer}>
          <Pressable onPress={() => handleCleanPost()}>
            <TabsCentreButton
              backGroundColor="#F6F6F6"
              icon={<Feather name="trash-2" size={24} color="#BDBDBD" />}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
    paddingBottom: 22,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  trashContainer: {
    marginHorizontal: "auto",
  },
});
