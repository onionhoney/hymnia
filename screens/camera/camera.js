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
import Spinner from 'react-native-spinkit'

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
            </Camera>

            <TouchableOpacity style={{
              flex: 1, backgroundColor: '#d35400', alignItems: 'center'}}
              onPress={this.takePicture.bind(this)}>
              <Spinner style={{"margin-top":-20}}
                isVisible={true}
                size={150} type={'Pulse'} color={"#FFFFFF"} 
              />
            </TouchableOpacity>
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
  },
  preview: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    backgroundColor: '#d35400', 
    borderRadius: 40,
    padding: 15, 
    margin: 40
  }
});