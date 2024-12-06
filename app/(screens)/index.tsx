import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     router.navigate("/loginScreen");
  //   }
  // }, [mounted]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
      <Link
        href={"/(screens)/loginScreen"}
        style={[
          styles.text,
          { textDecorationLine: "underline", backgroundColor: "darkseagreen" },
        ]}
      >
        To Login
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 42,
    lineHeight: 200,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
});
