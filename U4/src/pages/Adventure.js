import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
// import { Button } from "react-native-elements";

import MapView, { Callout } from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

//pinColor para mudar a cor do marcador
export default class Adventure extends Component {
  state = {
    markers: [
      {
        title: "Praça de atendimento", //-26.906220, -49.078727
        latitude: -26.90622,
        longitude: -49.078727,
        image: require("../logo/blocoA.png"),
        id: 1,
      },
      {
        title: "Elevador", //-26.905893, -49.078522
        latitude: -26.905893,
        longitude: -49.078522,
        image: require("../logo/Bloco_f.png"),

        id: 2,
      },
      {
        title: "Biblioteca", //-26.905087, -49.078362
        latitude: -26.905087,
        longitude: -49.078362,
        image: require("../logo/biblioteca.jpg"),

        id: 3,
      },
      {
        title: "Bloco J", //-26.904424, -49.078070
        latitude: -26.904424,
        longitude: -49.07807,
        image: require("../logo/bloco j.jpg"),

        id: 4,
      },
      {
        title: "Bloco S", //-26.9060154,-49.0796871
        latitude: -26.9060154,
        longitude: -49.0796871,
        image: require("../logo/bloco s.jpg"),

        id: 5,
      },
      {
        title: "DCE", //-26.904734, -49.077544
        latitude: -26.904734,
        longitude: -49.077544,
        image: require("../logo/dce.jpg"),

        id: 6,
      },
      {
        title: "Campo", //-26.906298, -49.080794
        latitude: -26.906298,
        longitude: -49.080794,
        image: require("../logo/campo.jpeg"),

        id: 7,
      },
      {
        title: "Ginásio", //-26.906779, -49.081583
        latitude: -26.906779,
        longitude: -49.081583,
        image: require("../logo/ginasio.jpg"),

        id: 8,
      },
    ],
    latitude: -26.905788,
    longitude: -49.079369,
    mapType: null,
  };

  componentDidMount() {
    const user_id = this.props.navigation.getParam("user_id", "");

    firebase
      .firestore()
      .collection("users")
      .doc(user_id)
      .onSnapshot((value) =>
        this.setState({
          ...this.state,
          user: { ...value.data(), id: value.id },
        })
      );

    firebase
      .firestore()
      .collection("users")
      .doc(user_id)
      .get()
      .then((value) =>
        this.setState({
          ...this.state,
          user: { ...value.data(), id: value.id },
        })
      );

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
        onPress={() =>
          this.props.navigation.navigate("Point", { point: marker, user: this.state.user})
        }
        //description={marker.title.comments}
      >
        {this.state.user?.pontos.includes(marker.id) ? (
          <Image style={{ width: 0, height: 0 }} source={marker.image} />
        ) : (
          <Image style={{ width: 50, height: 50 }} source={marker.image} />
        )}
      </MapView.Marker>
    ));
  };

  getIdLocation = async () => {
    let id = 0;

    deg2Rad = (deg) => {
      return (deg * Math.PI) / 180;
    };

    pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
      lat1 = deg2Rad(lat1);
      lat2 = deg2Rad(lat2);
      lon1 = deg2Rad(lon1);
      lon2 = deg2Rad(lon2);
      const R = 6371;
      const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
      const y = lat2 - lat1;
      const d = Math.sqrt(x * x + y * y) * R;
      return d;
    };
    nearestPoint = ({ latitude, longitude }) => {
      let mindif = 99999;
      let closest;

      for (let index = 0; index < this.state.markers.length; ++index) {
        const dif = pythagorasEquirectangular(
          latitude,
          longitude,
          this.state.markers[index].latitude,
          this.state.markers[index].longitude
        );
        console.log(dif);
        if (dif < mindif) {
          closest = index;
          mindif = dif;
        }
      }
      return this.state.markers[closest].id;
    };

    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    this.props.navigation.navigate("Camera", {
      id: nearestPoint(location.coords),
    });
  };

  render() {
    const { latitude, longitude, mapType } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            height: "90%",
            backgroundColor: "powderblue",
          }}
        >
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
        <View
          style={{
            width: 50,
            height: "10%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.capture}
            underlayColor="rgba(255, 255, 100, 0.5)"
            onPress={() => this.getIdLocation()}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marcador: {
    width: 80,
    height: 80,
  },
  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  view: {
    flex: 1,
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
  capture: {
    height: 50,
    width: 50,
    borderRadius: 35,
    borderWidth: 5,
    color: "#000",
  },
});
