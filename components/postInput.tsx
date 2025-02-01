import { StyleSheet, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
// import * as Location from "expo-location";

import Feather from "@expo/vector-icons/Feather";
// import SubmitButton from "./submitButton";
import { LatLng } from "react-native-maps";

type Props = {
  postName: (name: string | undefined) => void;
  postPlace: (place: string | undefined) => void;
  location: LatLng | null;
  text: string;
};

export default function PostInput({
  postName,
  postPlace,
  location,
  text,
}: Props) {
  const [name, setName] = useState<string | undefined>();
  const [place, setPlace] = useState<string | undefined>();

  useEffect(() => {
    if (!name && !place) {
      return;
    } else {
      postName(name);
      postPlace(place);
    }
  }, [name, place]);

  useEffect(() => {
    if (!location) {
      return;
    } else {
      setName("");
      setPlace("");
    }
  }, [location]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.mapForm}>
        <Feather
          onPress={() =>
            router.push({
              pathname: "/mapScreen",
              params: {
                latitude: location?.latitude,
                longitude: location?.longitude,
                currentLocation: text,
              },
            })
          }
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
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 16,
    marginHorizontal: "auto",
  },
  input: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    paddingVertical: 16,
    width: 343,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  mapForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapImage: {
    zIndex: 10,
    marginRight: -24,
  },
});
