import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-native";
import { Platform, StyleSheet, Text, View } from "react-native";

const shaders = Shaders.create({
  trianguloGL: {
    // (GLSL code gets compiled and run on the GPU)
    frag: GLSL`
    precision highp float; // Precisa definir a precisao do float
    varying vec2 uv; // vetor com a posicao do pixel do loop principal
    const float PI = 3.1415;
    bool equal(float a, float b) {
      return abs(a - b) < 0.001;
    }
    float angle(vec2 a, vec2 b) {
      return acos(dot(normalize(a), normalize(b)));
    }
    bool pixelInteriorTriangulo(vec2 uv) {
      // Pontos a, b, c do triangulo
      vec2 a = vec2(0.0, 0.0) - uv;
      vec2 b = vec2(0.5, 1.0) - uv;
      vec2 c = vec2(1.0, 0.0) - uv;
      
      return equal(angle(a, b) + angle(b, c) + angle(a, c), PI * 2.0);
    }
    void main() {
      float blue = uv.y;
      float red = (1.0 - uv.x) * (1.0 - uv.y);
      float green = uv.x * (1.0 - uv.y);
      
      gl_FragColor = pixelInteriorTriangulo(uv) ? vec4(red, green, blue, 1.0) : vec4(1.0);
    }
`,
  },
});

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "40%",
  },
});

export default class Triangulo extends Component {
  render() {
    return (
      <Surface style={styles.container}>
        <Node shader={shaders.trianguloGL} />
      </Surface>
    );
  }
}
