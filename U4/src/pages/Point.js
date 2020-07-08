import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export default class Point extends Component {
  state = {
    latitude: -26.905788,
    longitude: -49.079369,
    mapType: null,
    point: {},
    imageUrls: [],
  };

  async getImages(id) {
    var listRef = firebase
      .storage()
      .ref()
      .child(id.toString() + "/");
    // Find all the prefixes and items.
    let res = await listRef.listAll();

    let map = [];
    for (let index = 0; index < res.items.length; index++) {
      map.push(await res.items[index].getDownloadURL());
    }
    return map;
  }

  componentDidMount() {
    const point = this.props.navigation.getParam("point", {});
    const user = this.props.navigation.getParam("user", {});
    this.setState({
      ...this.state,
      point,
      user,
    });
    this.getImages(point.id)
      .then((imageUrls) => this.setState({ imageUrls }))
      .catch(console.log);
  }
  validaPonto = () => {
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
  };

  distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  geoSuccess = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    latitude = -26.905079;
    longitude = -49.078373;
    let distancia = this.distance(
      this.state.point.latitude,
      this.state.point.longitude,
      latitude,
      longitude
    );
    console.log("validando:" + distancia.toString());
    if (distancia < 0.05) {
      console.log(this.state.user.id.toString());

      firebase
        .firestore()
        .collection("users")
        .doc(this.state.user.id)
        .set({ pontos: [...this.state.user.pontos, this.state.point.id] })
        .then((value) => console.log(value));

      alert("Ponto validado");
    } else {
      alert("Fora de posição");
    }
  };

  isProximo = (n1, n2) => {
    if (n1 < 0) {
      n1 = n1 * -1;
    }
    if (n2 < 0) {
      n2 = n2 * -1;
    }
    let dif = n1 - n2;
    if (dif < 0) {
      dif = dif * -1;
    }
    const tolerancia = n1 * 0.000005;

    console.log("n1: " + n1);
    console.log("n2: " + n2);
    console.log("dif: " + dif);
    console.log("tol: " + tolerancia);
    if (dif < tolerancia) {
      return true;
    } else {
      return false;
    }
  };
  geoFailure = (err) => {
    console.log("geo failure");
    console.log(err);
  };

  render() {
    const { point } = this.state;
    return (
      <View style={styles.container}>
        <Image style={{ width: 400, height: 200 }} source={point.image} />
        <Text>{point.title}</Text>
        <Button onPress={this.validaPonto} title="Validar Ponto" />
        <Button
          onPress={() =>
            this.props.navigation.navigate("Camera", {
              id: point.id,
            })
          }
          title="Tirar foto"
        />
        <ScrollView>
          {this.state.imageUrls.map((url, index) => (
            <Image
              key={"im" + index}
              style={{ width: 100, height: 100 }}
              source={{ uri: url }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
