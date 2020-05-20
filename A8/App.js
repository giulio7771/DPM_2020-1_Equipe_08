import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

export default class App extends Component{
  state = {
    latitude: -26.905788,
    longitude: -49.079369,
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
      longitude: position.coords.longitude
    })
  }
  geoFailure = (err) => {
    console.log("geo failure");
  }
  render() {
    const { latitude, longitude } = this.state;
    return (
      <MapView 
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.0031  
        }}
        style={styles.mapView}
      >
        <MapView.Marker
          coordinate={{
            latitude,
            longitude
          }}
        ></MapView.Marker>
      </MapView>
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
});
