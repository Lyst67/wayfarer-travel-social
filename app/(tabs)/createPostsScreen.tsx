import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import ImagePlaceholder from "@/components/imagePlaceholder";
import SubmitButton from "@/components/submitButton";
import Feather from "@expo/vector-icons/Feather";
import TabsCentreButton from "@/components/tabsCentreButton";

export default function CreatePostsScreen() {
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
  const [isPostData, setIsPostData] = useState<boolean>(false);
  const [postName, setPostName] = useState("");
  const [place, setPlace] = useState("");

  const handlePost = () => {};

  const photo = require("../../assets/images/landScape1.png");

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.postImage}>
          <Image source={photo} style={styles.image} />
          <View style={styles.imagePlaceholder}>
            <ImagePlaceholder
              backgroundColor={!isImageUpload ? "#FFFFFF" : "#ffffff4d"}
              color={!isImageUpload ? "#BDBDBD" : "#FFFFFF"}
            />
          </View>
        </View>
        <Text style={styles.imageText}>
          {!isImageUpload ? "Завантажте фото" : "Редагувати фото"}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={postName}
          onChangeText={setPostName}
          placeholderTextColor="#BDBDBD"
          autoCapitalize="words"
        />
        <View style={styles.mapForm}>
          <Feather
            style={styles.mapImage}
            name="map-pin"
            size={24}
            color="#BDBDBD"
          />
          <TextInput
            style={[styles.input, { paddingLeft: 28 }]}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={place}
            onChangeText={setPlace}
            autoCapitalize="words"
          />
        </View>
      </View>
      <SubmitButton
        backgroundColor={!isPostData ? "#F6F6F6" : "#FF6C00"}
        color={!isPostData ? "#BDBDBD" : "#FFF"}
        label="Опубліковати"
        onPress={handlePost}
      />
      <View style={styles.trashContainer}>
        <TabsCentreButton
          backGroundColor="#F6F6F6"
          icon={<Feather name="trash-2" size={24} color="#BDBDBD" />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
    paddingBottom: 22,
    paddingHorizontal: 16,
    gap: 32,
    alignItems: "flex-start",
  },
  imageContainer: {
    gap: 8,
  },
  postImage: {
    width: 343,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
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
  imagePlaceholder: {
    position: "absolute",
  },
  mapForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapImage: {
    marginRight: -24,
  },
  imageText: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  formContainer: {
    gap: 16,
  },

  input: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    paddingVertical: 16,
    width: 343,
    height: 34,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  trashContainer: {
    marginTop: "auto",
    marginHorizontal: "auto",
  },
});
