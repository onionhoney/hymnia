import React, { Component } from 'react'
import CameraView from './screens/camera/camera'
import MusicPlayerView from './screens/music/music'
import {SignUpView, LoginView} from './screens/signup/index'
import R from './constants'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {"where":"Login", userInfo: {}, query:""}
        this.ip = R.serverURL + "/login"
        this.goToCamera = this.goToCamera.bind(this)
    }

    // User log in via goToCamera. Returns True if authorization is successful
    goToCamera(name, email, password) {
        this.setState ({
            userInfo: {
                userName: name,
                userEmail: email,
                userPassword: password,
                musicInfo: {}
            }
        });
        fetch(this.ip, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.userInfo.userName,
                email: this.state.userInfo.userEmail,
                userPassword: this.state.userInfo.userPassword
            })
        })
        .then( (data) => { this.setState({ where: "Camera" }) })
        .catch( (reason) => {console.log("Login failed", reason) } );
    }

    goRetake() {
        this.setState({
            where: "Camera"
        })
    }

    goToMusic(path, userInfo) {
        this.setState({
            where: "Music",
            filePath: path, 
            userInfo: userInfo,
        })
    }

    render() {
        if (this.state.where == "SignUp") {
            return (
                <SignUpView goToLogin={() => { this.setState({ where: "Login" })}}> </SignUpView>
            )
        } else if (this.state.where == "Login") {
            return (
                <LoginView 
                    goToCamera={this.goToCamera.bind(this)} 
                    goToSignUp={() => { this.setState({ where : "SignUp" }) }} > 
                </LoginView>
            )
        } else if (this.state.where == "Camera") {
            return (
                <CameraView 
                    goToMusic={this.goToMusic.bind(this) } 
                    userInfo={this.state.userInfo}
                    >
                </CameraView>
            )
        } else if (this.state.where == "Music") {
            return (
                <MusicPlayerView filePath={this.state.filePath} userInfo={this.state.userInfo} goRetake={this.goRetake.bind(this)} >
                </MusicPlayerView>
            )
        }
    }
}