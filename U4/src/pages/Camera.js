import React, { Component, Alert } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  PermissionsAndroid,
} from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import * as Permissions from "expo-permissions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#FFF",
    marginBottom: 15,
  },
  recording: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#900",
    marginBottom: 15,
  },
  photo: {
    width: 50,
    height: 50,
    left: 50,
    borderWidth: 5,
    borderColor: "#099",
    marginBottom: 15,
  },
  video: {
    width: 50,
    height: 50,
    left: 50,
    borderWidth: 5,
    borderColor: "#990",
    marginBottom: 15,
  },
  cancel: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "transparent",
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17,
  },
});

class CameraRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.navigation.state.params.id,
      path: null,
      recording: false,
      record: false,
      hasPermission: null,
    };

    if (!this.state.id) {
      this.state = { ...this.state, id: 0 };
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  }

  async takePicture(id) {
    try {
      let data = await this.camera.takePictureAsync({ base64: true });
      var storageRef = firebase.storage().ref();

      const response = await fetch(data.uri);

      const blob = await response.blob();
      var ref = storageRef
        .child(id.toString())
        .child(new Date().getTime().toString());

      console.log(await ref.put(blob));
      await FileSystem.moveAsync({
        from: data.uri,
        to: FileSystem.documentDirectory + id.toString(),
      });
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK", onPress: () => {} }], {
        cancelable: false,
      });
    }
  }

  renderCamera() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
        >
          <View style={{ flex: 1, position: "absolute", flexDirection: "row" }}>
            <TouchableHighlight
              style={this.state.recording ? styles.recording : styles.capture}
              onPress={() => this.takePicture(this.state.id).then(() => this.props.navigation.goBack(null))}
              underlayColor="rgba(255, 255, 255, 0.5)"
            >
              <View />
            </TouchableHighlight>
          </View>
        </Camera>
      );
    }
  }

  renderImage() {
    return (
      <View>
        <Image source={{ uri: this.state.path }} style={styles.preview} />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >
          Cancel
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

export default CameraRoute;
