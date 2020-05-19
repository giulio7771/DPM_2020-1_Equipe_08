import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  PermissionsAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  recording: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#900',
    marginBottom: 15,
  },
  photo: {
    width: 50,
    height: 50,
    left: 50,
    borderWidth: 5,
    borderColor: '#099',
    marginBottom: 15,
  },
  video: {
    width: 50,
    height: 50,
    left: 50,
    borderWidth: 5,
    borderColor: '#990',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
});

class CameraRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
      recording: false,
      record: false,
    };
  }

  takePicture() {
    if (this.state.record) {
      if (this.state.recording) {
        this.setState({recording: false});
        this.camera.stopRecording();
      } else {
        this.setState({recording: true});
        this.camera.recordAsync().then(async (data) => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CameraRoll.saveToCameraRoll(data.uri);
            console.log(data.uri);
          }
        });
      }
    } else {
      this.camera.takePictureAsync({base64: true}).then(async (data) => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CameraRoll.saveToCameraRoll(data.uri);
          console.log(data.uri);
        }
      });
    }
  }

  renderCamera() {
    return (
      <RNCamera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}>
        <View style={{flex: 1, position: 'absolute', flexDirection: 'row'}}>
          <TouchableHighlight
            style={this.state.recording ? styles.recording : styles.capture}
            onPress={this.takePicture.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.5)">
            <View />
          </TouchableHighlight>
          <TouchableHighlight
            style={this.state.record ? styles.video : styles.photo}
            onPress={() =>
              this.setState({recording: false, record: !this.state.record})
            }
            underlayColor="rgba(255, 255, 255, 0.5)">
            <View />
          </TouchableHighlight>
        </View>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image source={{uri: this.state.path}} style={styles.preview} />
        <Text style={styles.cancel} onPress={() => this.setState({path: null})}>
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
