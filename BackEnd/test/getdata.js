const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDOKlLCcvYhGqtHm5MJ93LctA-O1qOdO0YsHr84P9CS0gR15a3C9n8gaM-uriHVHxiLbhggUq_TtRGWOvQPLAriLbFDlA7pouqfSY4mmkU7VDIYm9ytUdF5fPfdjEMjNYrO4Q5orGSacKn5ws9b0LMLeBEJL2X8bJRkWJFaZI64P8K9k490Lv3AONC6WH6e3oNC2o1bg1wh44Bsb6Eehz-tk5AQXg_uJYRsIwIee7p7wj71vhAV5toJdwldsM1Erj-bT7zmNg5W1ZOv_zAi-wPUE3WqA56Elm2kFsK8fwveVbRbGecBhunn4_ngN_r1f95UxtMKt3fhWWac4g";
//app.set('view engine', 'pug')
//app.set('views', './views')

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

let file = new Object();
let f = JSON.parse(fs.readFileSync("data.json").toString());

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    file.UserID = me.body.id;
    file.name = me.body.name;
    file.UserImg = me.body.images[0].url;
    GetTop10Artists(me.body.id);
    MyTopTracks(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

async function GetTop10Artists(userName) {
    const data = await spotifyApi.getMyTopArtists({
        limit:10
    })
    let artists = []

    for (let artist of data.body.items) {
        artists.push(artist.name)
    }
    file.Artists = artists
}

async function MyTopTracks(userName) {
    const data = await spotifyApi.getMyTopTracks({
        limit:5
    })
    let songs = []

    for (let song of data.body.items) {
      songs.push({"name":song.name, "img":song.album.images[0].url})
    }

    file.Songs = songs
    f.USERS.push(file)
    await waitforme(2000)
    fs.writeFileSync("data.json",JSON.stringify(f))
}

function waitforme(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}

getMyData();
