import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';


import MapView from 'react-native-maps';

export default class App extends Component{
  state = {
    latitude: -26.905788,
    longitude: -49.079369,
    mapType: null
  };

  componentDidMount() {
    const geoOptions = {
      enableHightAccuracy: true,
      timeOut: 20000,
      maximumAge: 60*60*24
    };

    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, geoOptions);
  }
  geoSuccess = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      mapType: null
    })
  }
  geoFailure = (err) => {
    console.log("geo failure");
  }

  switchMapType() {
    this.setState({
      ...this.state,
      mapType: 'satelite'
    });
  }

  render() {
    const { latitude, longitude, mapType } = this.state;
    return (
      <View style={styles.view}>
        <MapView 
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0031  
          }}
          style={styles.mapView}
          mapType='satellite'
        >
          
       
          <MapView.Marker
            coordinate={{
              latitude,
              longitude
            }}
          ></MapView.Marker>
          
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  },
  view: {
    position: 'absolute',
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
    right: 0
  }
});
