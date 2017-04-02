const emotion = {
    "anger": {
        // "min_loudness":-25.0,
        // "max_valence":0.35,
        // "min_tempo":110.0,
        // "min_daceability":0.50,
        // "min_energy":0.70,
        // "min_popularity":40
        "target_valence":0.2,
        "target_tempo":110.0,
        "target_danceability":0.35,
        "target_energy":0.50,
        "target_mode":0
    },
    "contempt": {
        // "max_valence":0.79,
        // "min_valence":0.40,
        // "max_valence":0.79,
        // "max_tempo":95.0,
        // "min_tempo":75.0,
        // "max_danceability":0.69,
        // "min_daceability":0.35,
        // "max_energy":0.7,
        // "min_energy":0.45,
        // "min_popularity":40
        "target_valence":0.2,
        "target_tempo":95.0,
        "target_danceability":0.35,
        "target_energy":0.30,
        "target_mode":0
    },
    "disgust": {
        // "max_valence":0.79,
        // "min_valence":0.40,
        // "max_valence":0.79,
        // "max_tempo":95.0,
        // "min_tempo":75.0,
        // "max_danceability":0.69,
        // "min_daceability":0.35,
        // "max_energy":0.7,
        // "min_energy":0.45,
        // "min_popularity":40
        "target_valence":0.2,
        "target_tempo":95.0,
        "target_danceability":0.35,
        "target_energy":0.30,
        "target_mode":0
    },
    "fear": {
        // "max_valence":0.39,
        // "max_tempo":95.0,
        // "max_danceability":0.35,
        // "max_energy":0.40,
        // "min_popularity":20,
        // "min_instrumentalness":0.6,
        // "max_mode":0
        "target_valence":0.2,
        "target_tempo":95.0,
        "target_danceability":0.35,
        "target_energy":0.30,
        "target_mode":0

    },
    "happiness": {
        //
        // "min_valence":0.80,
        // "min_tempo":95.0,
        // "min_danceability":0.7,
        // "min_energy":0.7,
        // "min_mode":1,
        // "min_popularity":75,
        "target_valence":1.0,
        "target_tempo":135.0,
        "target_danceability":1.0,
        "target_energy":0.95,
        "min_mode":1,
        "target_popularity":100


    },
    "neutral": {

        // "max_valence":0.79,
        // "min_valence":0.40,
        // "max_tempo":95.0,
        // "min_tempo":75.0,
        // "max_danceability":0.69,
        // "min_daceability":0.35,
        // "max_energy":0.7,
        // "min_energy":0.45,
        // "min_popularity":40
        "target_valence":0.70,
        "target_tempo":90.0,
        "target_danceability":0.60,
        "target_energy":0.6,
        "target_popularity":60

    },
    "sadness": {

        // "max_valence":0.39,
        // "max_tempo":95.0,
        // "max_danceability":0.35,
        // "max_energy":0.40,
        // "min_popularity":20,
        // "min_instrumentalness":0.6,
        // "max_mode":0

        "target_valence":0.3,
        "target_mode":0,
        "target_instrumentalness":0.8,
        "target_mode":1,
        "target_energy":0.3,
        "target_tempo":0.2

    },
    "surprise": {

        // "min_valence":0.80,
        // "min_tempo":95.0,
        // "min_danceability":0.7,
        // "min_energy":0.7,
        // "min_mode":1,
        // "min_popularity":75

        "target_valence":0.2,
        "target_tempo":95.0,
        "target_danceability":0.35,
        "target_energy":0.30,
        "target_mode":0

    }
}

var client_id = '8d2ded45568440c8b4e4660c226d922e';
var client_secret = '251d40faafd24da3976fe03a14b478d8';

var href = "";
var playListID = "";
var trackID = "";
var artistID = "";
var song = {};
var songName = "";
var artist = "";
var albumnName = "";
var imgURL = "";

var base64 = require("base-64")

function randomNum(max) {
  min = 0;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getFeaturedListURL(mood, resolve, reject){
    // your application requests authorization

    let formData = new FormData()
    formData.append("grant_type", "client_credentials")

    const DEBUG = false
    let fetchURL = DEBUG ? 'http://169.232.94.222:8080' : 'https://accounts.spotify.com/api/token'
    fetch(fetchURL, {
        method: "POST",

        headers: {
         'Content-Type': "application/x-www-form-urlencoded",
         'Accept': "application/json",
         'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
        },
        body: "grant_type=client_credentials",
    }).then((res) => res.json())
    .then((data) => {
        var token = data.access_token
        console.log(data)
        resolve(token)
    })

    //request.post(authOptions, function(error, response, body) {
    //  if (!error && response.statusCode === 200) {

    //    // use the access token to access the Spotify Web API
    //    var token = body.access_token;
    //    var recommend_url  = "https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=50";

    //    var options = {
    //      url: recommend_url,
    //      headers: {
    //        'Authorization': 'Bearer ' + token
    //      },
    //      json: true
    //    };
    //    request.get(options, function(error, response, body) {
    //      var rand = randomNum(body["playlists"]["items"].length)
    //      href = body["playlists"]["items"][rand]["href"];
    //      temp = href.split("/");
    //      playListID = temp[temp.length-1];

    //      getTrackAndArtistID(href,mood, resolve, reject);
    //    });
    //  }
    //});
}


function getTrackAndArtistID(href,mood, resolve, reject){
    // your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var recommend_url  = href;

        var options = {
          url: recommend_url,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };

        request.get(options, function(error, response, body) {
          var rand1 = randomNum(body["tracks"]["items"].length);
          var rand2 = randomNum(body["tracks"]["items"][rand1]["track"]["artists"].length);
          artistID = body["tracks"]["items"][rand1]["track"]["artists"][rand2]["id"];
          temp = body["tracks"]["items"][rand1]["track"]["uri"].split(":");
          trackID = (temp[temp.length-1]);

          getSongs(mood, resolve, reject);
        });
      }
    });
}


function getSongs(mood, resolve, reject){
    // your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var recommend_url  = "https://api.spotify.com/v1/recommendations?seed_artists="+artistID+"&seed_tracks="+trackID+"&";

        for(var attr in emotion[mood]){
            recommend_url += (attr+"="+emotion[mood][attr] +"&");
        }

        recommend_url += "market=US";
        // console.log(recommend_url);
        // console.log(body.access_token);

        var options = {
          url: recommend_url,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          try {
            songName = body["tracks"][0]["name"];
            artist = body["tracks"][0]["album"]["artists"][0]["name"];
            albumnName = body["tracks"][0]["album"]["name"];
            imgURL = body["tracks"][0]["album"]["images"][0]["url"];

            console.log(songName);
            console.log(artist);

            // ALL DONE
            resolve({
                songName: songName,
                artist: artist,
                albumnName: albumnName,
                albumImgURL: imgURL
            });
          } catch(e){
            reject("spotify error");
          }
        });
      }
    });
}

//先get featured-playlists; then,用api.href(e.g: https://api.spotify.com/v1/users/spotify/playlists/6ftJBzU2LLQcaKefMi7ee7);然后，在"tracks"
//里找artist id(如果有track number的话)
//getSongs("neutral");
//BQDvv0aaqK-KqK_HzVUR1Kzmxu3dZk-F2FJYIQBzCAeqN3Fc5SqHSMm3v8Npg1bGRpfj5EI57DSgNMA69cdq4g


function querySong(mood) {
    return new Promise( function(resolve, reject){
        getFeaturedListURL(mood, resolve, reject); 
    });
}

module.exports = {
  querySong: querySong
}