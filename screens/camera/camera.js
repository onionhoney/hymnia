import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TouchableOpacity,
  Image
} from 'react-native'
import Camera from 'react-native-camera'
import { constants as CameraConstants } from 'react-native-camera'
import R from '../../constants'
import ImageResizer from 'react-native-image-resizer'

export default class CameraView extends Component {
  constructor(props) {
    super(props)
    this.photo = require('./ic_photo_camera_36pt.png');
  }
  render() {
    return (
        <View style={styles.container}>
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                type="front"
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill} >
              <TouchableOpacity
                style={styles.capture}
                onPress={this.takePicture.bind(this)} >
                <Image source={this.photo} />
              </TouchableOpacity>
            </Camera>
        </View>
    );
  }

  takePicture() {
      const self = this
      this.camera.capture()
      .then((data) => {
          console.log("Captured and about to save", data)
          this.props.goToMusic(data.path, this.props.userInfo)
      }).catch(function (err) {
          console.log(err)
      })
        
    ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff', 
    borderRadius: 40,
    padding: 15, 
    margin: 40
  }
});