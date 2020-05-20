import { registerRootComponent } from "expo";

import App from "./App";

import React, { Component } from "react";
import { View, AppRegistry, Dimensions, Text, StyleSheet } from "react-native";
import { Surface } from "gl-react-native";
import GL from "gl-react";
const window = Dimensions.get("window");
import Triangulo from "./triangulo";
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from "react-native-sensors";

export default class GLConteudo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      y: 0,
      x: 0,
      last_x: 0,
      last_y: 0,
    };
  }
  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
    subscription = accelerometer.subscribe((a) => {
      const a_x = a.x;
      const a_y = a.y;
      if ((this.state.last_x = 0)) {
        this.state.last_x = a_x;
      }
      if ((this.state.last_y = 0)) {
        this.state.last_y = a.y;
      }
      this.setState(
        (state) => ({
          x: a_x - this.state.last_x + this.state.x,
          y: a_y - this.state.last_y + this.state.y,
        }),
        () => {
          if (this.state.x < 0 || this.state.x > window.width) {
            this.setState({
              x: 0,
            });
          }
          if (this.state.y < 0 || this.state.y > window.height) {
            this.setState({
              y: 0,
            });
          }
        }
      );
    });
    this.state = { x: 0, y: 0, z: 0 };
  }

  render() {
    return (
      <View
        style={{
          left: this.state.x,
          top: this.state.y,
        }}
      >
        <Triangulo />
        <Text style={styles.text}>A10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlignVertical: "center",
    fontSize: window.height / 50,
    position: "absolute",
  },
});

AppRegistry.registerComponent("GLConteudo", () => GLConteudo);

registerRootComponent(GLConteudo);
