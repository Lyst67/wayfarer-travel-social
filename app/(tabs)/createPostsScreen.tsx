import { View, StyleSheet, Keyboard, Pressable } from "react-native";
import React, { useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import TabsCentreButton from "@/components/tabsCentreButton";
import PostImageComponent from "@/components/postImageComponent";
import PostInput from "@/components/postInput";

export default function CreatePostsScreen() {
  const [postPhoto, setPostPhoto] = useState<string | undefined>();

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <PostImageComponent postPhoto={setPostPhoto} />
          <PostInput postPhoto={postPhoto} />
        </View>

        <View style={styles.trashContainer}>
          <TabsCentreButton
            backGroundColor="#F6F6F6"
            icon={<Feather name="trash-2" size={24} color="#BDBDBD" />}
          />
        </View>
      </View>
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
    gap: 32,
  },
  trashContainer: {
    marginHorizontal: "auto",
  },
});
