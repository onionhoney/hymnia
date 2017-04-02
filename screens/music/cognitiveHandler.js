import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TouchableOpacity,
  Image,
  NativeModules,
  DeviceEventEmitter
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
var RNUploader = NativeModules.RNUploader;

export default class cameraController {
    constructor(uploadURL) {
        this.url = uploadURL
        DeviceEventEmitter.addListener('RNUploaderProgress', (data) => {
            let bytesWritten = data.totalBytesWritten;
            let bytesTotal = data.totalBytesExpectedToWrite;
            let progress = data.progress;
            console.log({ uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten });
        });
    }

    uploadUri(uri, params, resolve, reject) {
        let file = {
            name: 'file', 
            filename: 'selfie.jpg', 
            filepath: uri, 
        }
        let opts = {
            url: encodeURI(this.url + '?username=' + 
                 params.userName + '&email=' + params.userPassword),
            files: [file], 
            method: 'POST', 
        //    headers: {'Accept': 'application/json'}, 
            params: params || {}
        }

        RNUploader.upload( opts, (err, response) => {
            if (err) {
                reject(err)
                return
            }
            let status = response.status
            let responseString = response.data
            let responseJSON = JSON.parse(responseString)
            resolve({status: status, data:responseJSON})
        })
    }

    upload(filePath, params) {
        let self = this
        return new Promise(function(resolve, reject){
            Image.getSize(filePath, (width, height) => {
                ImageResizer.createResizedImage(filePath, width * 0.2,
                    height * 0.2, "JPEG", 80)
                    .then((resizedUri) => {
                        self.uploadUri(resizedUri, params, resolve, reject);
                    }).catch((err) => {
                        console.log(err);
                    });
            })
        })

       
    }
}
