import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen({}) {
  const { latitude, longitude, currentLocation } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
    currentLocation: string;
  }>();
  const [location, setLocation] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // console.log(longitude, latitude, currentLocation);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }
    const lat = parseFloat(latitude?.trim());
    const long = parseFloat(longitude?.trim());
    setLocation({ latitude: lat, longitude: long });
    setAddress(currentLocation);
  }, [latitude, longitude, currentLocation]);

  // useEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     let address = await Location.reverseGeocodeAsync(location.coords);

  //     const coords = {
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     };
  //     setAddress(address);
  //     setLocation(coords);
  //   }
  //   getCurrentLocation();
  // }, []);

  // let text = "Waiting...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (address) {
  //   text = JSON.stringify([address[0].region, address[0].country].join(","));
  // }
  const mapRegion: Region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : initialRegion;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={initialRegion}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        region={mapRegion}
        showsUserLocation={true}
        mapType="standard"
        onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        {location && (
          <Marker
            title="It's here"
            coordinate={location}
            description={address}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
