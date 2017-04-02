"use strict";
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TouchableOpacity,
  Image,
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

import Spinner from 'react-native-spinkit'
import CognitiveHandler from './cognitiveHandler'
import {querySong} from './spotifyHandler'
import R from '../../constants'

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videoID: "",
      waitingFeedbacks: 2, // Microsoft Cognitive API and Spotify API
      song: {
        album: "",
        name: "",
        artist: "",
        albumCover: ""
      }
    }

    // Get Cognitive result 
    this.initUpload(this.props.filePath, this.props.userInfo)
  }

  initUpload(filePath, userInfo) {
    let url = R.serverURL + '/upload'
    this.cognitive = new CognitiveHandler(url)

    this.cognitive
      .upload(filePath, userInfo)
      .then((res) => {
        console.log("Filepath && userInfo", filePath, userInfo)
        console.log("returns status", res.status)
        if (res.status < 200 ||  res.status >= 300) {
          // status code is wrong
          throw Error("Cognitive API returns invalid status " + res.status + ".")
        }
        this.setState({ waitingFeedbacks: this.state.waitingFeedbacks - 1 })
        let mood = "";

        for (let key in res.data) {
          if (res.data.hasOwnProperty(key) && key != 'image_id') {
            mood = key;
          }
        }

        //let mood = Object.keys(res.data) //.filter( (x) => x != "image_id")
        console.log("Received Cognitive analysis", res.data, "mood is ", mood);
        console.log("QuerySong = ", querySong)
        return querySong(mood);
      })
      .then((result) => {
        console.log("Received Spotify recommendation", result)
      })
      .catch((err) => { 
        console.log(err) 
        this.props.goRetake()
      })
  }

  getFirstVideoID(query) {
    let queryString = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
      + query + '&key=AIzaSyD5Z4VAS7LM4zoQ9kRY88X06gid0_x9Pk8'
    queryString = encodeURI(queryString)
    console.log(queryString)
    fetch(queryString)
      .then((res) => { return res.json() })
      .then((data) => {
        let result = data.items[0].id.videoId
        console.log(result)
        //  this.setState({ videoID: result })
      })
      .catch((err) => {
        return console.log(err)
      })
  }

  render() {
    let recommendation = this.state.waitingFeedbacks > 0 ? "Loading... " :
      this.state.song.name + " by " + this.state.song.artist;

    return (
      <View style={styles.container}>
        <Spinner
          style={styles.spinner}
          isVisible={true}
          size={200} type={'Pulse'} color={"#FFFFFF"} />
        <Text>
          {recommendation}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={this.props.goRetake}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: true
    }
  }


  next() {
    if (this.state.index++ >= this.state.types.length)
      this.setState({ index: 0 })
    else
      this.setState({ index: this.state.index++ })
  }

  increaseSize() {
    this.setState({ size: this.state.size + 10 });
  }

  changeColor() {
    this.setState({ color: '#' + Math.floor(Math.random() * 16777215).toString(16) });
  }

  changeVisibility() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    var type = this.state.types[this.state.index];

    return (
      <View style={styles.container}>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color} />

        <Text style={styles.text}>Type: {type}</Text>

        <TouchableOpacity style={styles.btn} onPress={this.next.bind(this)}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.increaseSize.bind(this)}>
          <Text style={styles.text}>Increase size</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.changeColor.bind(this)}>
          <Text style={styles.text}>Change color</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={this.changeVisibility.bind(this)}>
          <Text style={styles.text}>Change visibility</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  spinner: {
    marginBottom: 50
  },

  btn: {
    marginTop: 20
  },

  text: {
    color: "white"
  }
});