import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import * as Location from "expo-location";

import Feather from "@expo/vector-icons/Feather";
import SubmitButton from "./submitButton";
import { LatLng } from "react-native-maps";

type Props = {
  postPhoto: string | undefined;
};

export default function PostInput({ postPhoto }: Props) {
  const [postName, setPostName] = useState<string>();
  const [place, setPlace] = useState<string>();
  const [isPostData, setIsPostData] = useState<boolean>(false);
  const [location, setLocation] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<
    Location.LocationGeocodedAddress[] | null
  >();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (postName && place) {
      setIsPostData(true);
    } else {
      setIsPostData(false);
    }
  }, [postName, place]);

  useEffect(() => {
    if (location) {
      router.navigate({
        pathname: "/",
        params: {
          latitude: location?.latitude,
          longitude: location?.longitude,
          place: postName,
          currentLocation: text,
          postPhoto: postPhoto,
        },
      });
      setPostName("");
      setPlace("");
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
        // console.log("Location obtained:", location);
        const address = await Location.reverseGeocodeAsync(location.coords);
        // console.log("Address from reverse geocode:", address);
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

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = JSON.stringify([address[0].region, address[0].country].join(","));
  }
  const handlePost = async () => {
    if (!postName || !place) {
      alert("Please fill in all posts fields.");
      return;
    }
    // alert(`Postname: ${postName} and Place: ${place} are created!`);
    await getCurrentLocation();
    // if (location) {
    //   router.navigate({
    //     pathname: "/",
    //     params: {
    //       latitude: location?.latitude,
    //       longitude: location?.longitude,
    //       place: postName,
    //       currentLocation: text,
    //       postPhoto: postPhoto,
    //     },
    //   });
    //   setPostName("");
    //   setPlace("");
    // }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.formContainer}
    >
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        value={postName}
        onChangeText={setPostName}
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
      <View style={{ marginTop: 32 }}>
        <SubmitButton
          backgroundColor={!isPostData ? "#F6F6F6" : "#FF6C00"}
          color={!isPostData ? "#BDBDBD" : "#FFF"}
          label="Опубліковати"
          onPress={handlePost}
        />
      </View>
    </KeyboardAvoidingView>
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
