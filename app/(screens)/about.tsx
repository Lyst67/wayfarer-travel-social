import { Text, View, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { FlatList } from "react-native";

const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "HTML",
  },
  {
    id: "4116-jfk5-43rh",
    title: "JavaScript",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "React",
  },
  {
    id: "LG16-ant5-0J25",
    title: "React Native",
  },
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={useCallback(
          ({ item }: { item: any }) => (
            <>
              <Text style={styles.text}>{item.title}</Text>
              <View style={{ height: 1, margin: 0 }} />
            </>
          ),
          []
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 284,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
});
