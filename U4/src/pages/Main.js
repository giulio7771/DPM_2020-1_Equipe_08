import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Image, Button } from 'react-native';
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";


export default class Main extends Component{
  static navigationOptions = {
    title: "Gincana Furb"
  };

  state = {
    name: "calouro(a)",
    onChangeText: () => console.log("asd"),
  };

  setName(name) {
    this.setState({
      ...this.state,
      name
    });
  }

   buttonPress() {
    const user = firebase.firestore().collection("users").doc();
    user.set({
      name: this.state.name,
      pontos: [],
    }).then(console.log);
    this.props.navigation.navigate('Adventure', {user_id: user.id});
  }

  render() {
    const { name } = this.state;
    
    return (
      <View style={styles.container}>
        <Image style={{width:150,height:150}} source={require('../logo/logotipofurb.jpg')}/>

        <Text>Bem vindo a Furb, {name}!</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome/apelido"
          onChangeText={(val) => this.setName(val)}
        />
        <Button style={styles.button} title="Go" onPress={() => this.buttonPress()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    width: 200,
    margin: 5,
  },
  button: {
    margin: 5,
    width: 200,
  }
});
