import {
  View,
  Text,
  Pressable,
  Keyboard,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewer from "@/components/imageViwer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchComments } from "@/features/comments/operations";
import { selectComments } from "@/features/comments/commentsSelector";

export default function CommentsScreen() {
  const [commentText, setCommentText] = useState("");
  const { selectedImage } = useLocalSearchParams<{ selectedImage: string }>();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.postImage}>
          <ImageViewer selectedImage={selectedImage} />
        </View>
        <View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => <Text>{item.authorName}</Text>}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={commentText}
            onChangeText={setCommentText}
            keyboardType="twitter"
            autoCapitalize="none"
          />
          <Pressable style={styles.commentButton} onPress={() => {}}>
            <Ionicons name="arrow-up" size={24} />
          </Pressable>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "#BDBDBD",
    fontFamily: "Inter-Black",
    fontSize: 16,
    fontWeight: 500,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 343,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  commentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 17,
    color: "#FFFFFF",
    backgroundColor: "#FF6C00",
    marginLeft: -44,
  },
});
