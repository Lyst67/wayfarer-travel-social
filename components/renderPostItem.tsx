import { View, Text, Pressable } from "react-native";
import React, { useRef, useState } from "react";

export default function RenderPostItem({ item }: { item: any }) {
  const lastUserNameRef = useRef("");
  const currentUserName = item[1].userName;

  // Check if the userName is different from the last rendered userName
  const isDifferentUser = currentUserName !== lastUserNameRef.current;

  // Update the ref to the current userName after the check
  lastUserNameRef.current = currentUserName;

  return (
    <View>
      <Text>{currentUserName}</Text>
      {isDifferentUser ? <Text>Another</Text> : null}
    </View>
  );
}
