import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Image, Button } from 'react-native';

export default class Point extends Component {
  render() {
    const point = this.props.navigation.getParam('point', {});

    return (
      <View style={styles.container}>
        <Image style={{width:400,height:200}} source={point.image}/>
        <Text>{point.title}</Text>
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