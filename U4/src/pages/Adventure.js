import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Button } from "react-native-elements";

import MapView from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";

//pinColor para mudar a cor do marcador
export default class Adventure extends Component {
  state = {
    markers: [
      {
        title: "Praça de atendimento", //-26.906220, -49.078727
        latitude: -26.90622,
        longitude: -49.078727,
        id: 1,
      },
      {
        title: "Elevador", //-26.905893, -49.078522
        latitude: -26.905893,
        longitude: -49.078522,
        id: 2,
      },
      {
        title: "Biblioteca", //-26.905087, -49.078362
        latitude: -26.905087,
        longitude: -49.078362,
        id: 3,
      },
      {
        title: "Bloco J", //-26.904424, -49.078070
        latitude: -26.904424,
        longitude: -49.07807,
        id: 4,
      },
      {
        title: "Bloco S", //-26.9060154,-49.0796871
        latitude: -26.9060154,
        longitude: -49.0796871,
        id: 5,
      },
      {
        title: "DCE", //-26.904734, -49.077544
        latitude: -26.904734,
        longitude: -49.077544,
        id: 6,
      },
      {
        title: "Campo", //-26.906298, -49.080794
        latitude: -26.906298,
        longitude: -49.080794,
        id: 7,
      },
      {
        title: "Ginásio", //-26.906779, -49.081583
        latitude: -26.906779,
        longitude: -49.081583,
        id: 8,
      },
    ],
    latitude: -26.905788,
    longitude: -49.079369,
    mapType: null,
  };

  componentDidMount() {
    const geoOptions = {
      enableHightAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };

    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      mapType: null,
    });
  };
  geoFailure = (err) => {
    console.log("geo failure");
  };

  switchMapType() {
    this.setState({
      ...this.state,
      //mapType: "satelite",
    });
  }

  mapMarkers = () => {
    return this.state.markers.map((marker) => (
      <MapView.Marker
        key={marker.id}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        title={marker.title}
        pinColor={"red"}
        //description={marker.title.comments}
      ></MapView.Marker>
    ));
  };

  render() {
    const { latitude, longitude, mapType } = this.state;
    return (
      <View style={styles.view}>
        <MapView
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0031,
          }}
          style={styles.mapView}
        >
          <MapView.Marker
            pinColor={"blue"}
            coordinate={{
              latitude,
              longitude,
            }}
          ></MapView.Marker>
          {this.mapMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  view: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    opacity: 100,
    bottom: 3,
    top: 300,
    left: 0,
    right: 0,
  },
});
