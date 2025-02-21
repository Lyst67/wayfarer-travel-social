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
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageViewer from "@/components/imageViwer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createComment, fetchComments } from "@/features/comments/operations";
import { selectComments } from "@/features/comments/commentsSelector";
import { nanoid } from "@reduxjs/toolkit";
import { selectName, selectUserId, selectUserImage } from "@/features/user/userSelectors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import UserImage from "@/components/userImage";

export default function CommentsScreen() {
  const [commentText, setCommentText] = useState("");
  const { selectedPostId, postAuthorId, selectedImage } = useLocalSearchParams<{
    selectedPostId: string;
    postAuthorId: string;
    selectedImage: string;
  }>();
  const dispatch = useAppDispatch();
  const commentId = nanoid();
  const commentAuthorId = useAppSelector(selectUserId)
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
  const commentsArray = Object.entries(comments);
  const filteredComments = commentsArray.filter(item => item[1].commentedPostId === selectedPostId)

  const commentData = {
    commentId: commentId,
    commentedPostId: selectedPostId,
    commentedImage: selectedImage,
    commentedImageAuthorId: postAuthorId,
    commentAuthorId: commentAuthorId,
    commentText: commentText,
    authorName: authorName,
    authorImage: authorImage,
    commentTime: commentTime,
  };
// console.log(comments);

   useEffect(() => {
      dispatch(fetchComments());
    }, []);

    const handleAddComment = async () => {  
      try {  
        await dispatch(createComment({ commentData })).unwrap();  
        Alert.alert("Comment successfully created!");  
        setCommentText(""); 
        await dispatch(fetchComments());  
      } catch (error: any) {  
        Alert.alert("Error adding comment", error); 
        console.log(error);
         
      }  
    }; 

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={[
        styles.commentContainer,
        item[1].commentedImageAuthorId === item[1].commentAuthorId && {
          flexDirection: "row-reverse",
        },
      ]}
    >
      <View style={[styles.userPhotoContainer]}>
        {!item[1].authorImage ? (
          <FontAwesome5 name="user" size={24} color="lightgrey" />
        ) : (
          <UserImage selectedImage={item[1].authorImage} />
        )}
      </View>
      <View style={styles.commentTextContainer}>
        <Text style={styles.commentText}>{item[1].commentText}</Text>
        <Text
          style={[
            styles.commentTime,
            item[1].commentedImageAuthorId !== item[1].commentAuthorId && {
              textAlign: "right",
            },
          ]}
        >
          {item[1].commentTime}
        </Text>
      </View>
    </View>
  );

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.postImage}>
          <ImageViewer selectedImage={selectedImage} />
        </View>
        <View style={{ flex: 1 }}>
          {filteredComments.length ? (
            <FlatList
              data={filteredComments}
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
              maxLength={150}
              multiline={true}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={commentText}
              onChangeText={setCommentText}
              keyboardType="twitter"
              autoCapitalize="none"
            />
            <Pressable
              style={styles.commentButton}
              onPress={() => handleAddComment()}
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
      width: 343,
flex:1,
flexDirection: "row",
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
  commentTime:{
    color:"#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 10,
    fontWeight: 400,
  },
  inputContainer: {
      width: 343,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "#BDBDBD",
    fontFamily: "Inter-Black",
    fontSize: 16,
    fontWeight: 500,
    paddingLeft: 16,
    paddingRight: 46,
    paddingVertical: 16,
    width: "100%",
    borderRadius: 24,
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
