import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


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

  buttonPress = () => {
    this.props.navigation.navigate('Adventure');
  }

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <Text>Bem vindo a Furb, {name}!</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome/apelido"
          onChangeText={(val) => this.setName(val)}
        />
        <Button style={styles.button} title="Go" onPress={this.buttonPress} />
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
