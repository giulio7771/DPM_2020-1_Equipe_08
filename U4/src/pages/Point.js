import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Image, Button } from 'react-native';
import * as Location from 'expo-location';
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export default class Point extends Component {
  state = {
    latitude: -26.905788,
    longitude: -49.079369,
    mapType: null,
    point: {},
    imageUrls: []
  }

  async getImages(id) {
    var listRef = firebase
      .storage()
      .ref()
      .child(id.toString() + "/");
    // Find all the prefixes and items.
    let res = await listRef.listAll();
    
    let map = [];
    for (let index = 0; index < res.items.length; index++) {
      map.push(await res.items[index].getDownloadURL())
    }
    return map;  
  }


  componentDidMount() {
    const point = this.props.navigation.getParam('point', {});
    this.setState({
      ...this.state,
      point,
    })
    this.getImages(point.id).then((imageUrls) => this.setState({imageUrls}))
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
  }

  geoSuccess = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    latitude = -26.905079;
    longitude = -49.078373;
    console.log("validando");
    if (this.isProximo(this.state.point.latitude, latitude)
        && this.isProximo(this.state.point.longitude, longitude)) {
          alert("Ponto validado");
    } else {
      alert("Fora de posição");
    }
  };

  isProximo = (n1, n2) => {
    if(n1 < 0) {
      n1 = n1 * -1;
    }
    if (n2 < 0) {
      n2 = n2 * -1;
    }
    let dif = n1 - n2;
    if (dif < 0 ) {
      dif = dif * -1;
    }
    const tolerancia = n1 * 0.000005;
    
    console.log("n1: "+n1);
    console.log("n2: "+n2);
    console.log("dif: "+dif);
    console.log("tol: "+ tolerancia);
    if (dif < tolerancia){
      return true;
    } else {
      return false
    }

  }
  geoFailure = (err) => {
    console.log("geo failure");
    console.log(err);
  };

  render() {
    const { point } = this.state;
    return (
      <View style={styles.container}>
        <Image style={{width:400,height:200}} source={point.image}/>
        <Text>{point.title}</Text>
        <Button onPress={this.validaPonto} title="Validar Ponto" />
        {this.state.imageUrls.map((url, index) => <Image key={"im"+index} style={{width:400,height:100}} source={{uri: url}}/>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});