import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        // initialRegion={region}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
        // {...rest}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          description="Hello"
        />
      </MapView> */}
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
