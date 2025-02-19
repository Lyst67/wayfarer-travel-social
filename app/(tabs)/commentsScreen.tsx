import {
  View,
  Text,
  Pressable,
  Keyboard,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewer from "@/components/imageViwer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createComment, fetchComments } from "@/features/comments/operations";
import { selectComments } from "@/features/comments/commentsSelector";
import { nanoid } from "@reduxjs/toolkit";
import { selectName, selectUserImage } from "@/features/user/userSelectors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import UserImage from "@/components/userImage";

export default function CommentsScreen() {
  const [commentText, setCommentText] = useState("");
  const { selectedPostId, selectedImage } = useLocalSearchParams<{
    selectedPostId: string;
    selectedImage: string;
  }>();
  const dispatch = useAppDispatch();
  const commentId = nanoid();
  const authorName = useAppSelector(selectName);
  const authorImage = useAppSelector(selectUserImage);
  const formatData = new Date()
    .toUTCString()
    .split(" ")
    .slice(1, 5)
    .reduce<{ date: string[]; clock: string }>(
      (acc, timeData, index) => {
        if (index < 3) acc.date.push(timeData); // Ддень, місяць, рік
        if (index === 3) acc.clock = timeData.split(":").slice(0, 2).join(":"); // Час
        return acc;
      },
      { date: [], clock: "" }
    );
  const commentTime = `${formatData.date.join(" ")} | ${formatData.clock}`;
  const comments = useAppSelector(selectComments);
  const commentsArray = Object.entries(comments)
  const commentData = {
    commentedPostId: selectedPostId,
    commentedImage: selectedImage,
    commentId: commentId,
    commentText: commentText,
    authorName: authorName,
    authorImage: authorImage,
    commentTime: commentTime,
  };

  const renderItem = ({ item }: { item: any }) => (<View style={styles.commentContainer}>
      <View style={styles.userPhotoContainer}>{!item[1].userImage ? (
            <FontAwesome5 name="user" size={44} color="lightgrey" />
          ) : (
            <UserImage selectedImage={item[1].authorImage} />
          )}</View>
    <View style={styles.commentTextContainer}>
      <Text style={styles.commentText}>{item[1].commentText}</Text>
    <Text style={styles.commantTime}>{item[1].commentTime}</Text>
    </View>
    </View>)
    

  

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const handleAddComment = () => {
    dispatch(createComment({ commentData }));
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.postImage}>
          <ImageViewer selectedImage={selectedImage} />
        </View>
        <View style={{ flex: 1 }}>
          {comments.length > 0 ? (
            <FlatList
              data={commentsArray}
              keyExtractor={(item) => item[0]}
              renderItem={renderItem}
            />
           ) : (
            <Text style={{textAlign: "center"}}>There are no comments yet.</Text>
          )} 
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={commentText}
              onChangeText={setCommentText}
              keyboardType="twitter"
              autoCapitalize="none"
            />
            <Pressable
              style={styles.commentButton}
              onPress={() => {
                handleAddComment;
              }}
            >
              <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
            </Pressable>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
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
  commentContainer: {
flex:1,
gap:16,
marginBottom: 24,
  },
  userPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "gray",
    overflow: "hidden",
  },
  commentTextContainer: {
    flex:1,
    gap: 8,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    overflow: "hidden",
  },
  commentText:{
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 18,
  },
  commantTime:{
    color:"#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 10,
    fontWeight: 400,
    textAlign: "right",
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  commentButton: {
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
