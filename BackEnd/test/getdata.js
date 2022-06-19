const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDeXZ1nW_ReTwohQp76cpdj2i2pbwyRRapCYN5I4s-gPe0JKkRANHs35s8g6eieCNk0uEoMxKoRnjF1Qz9n5fYNILmlbGwuAkqeQQ0bMTiMLci-Y5vqA9i1EPTlKkwIDhU6_BmVNhGCQeDM6rqrKlUSuoDnk-iLT4hRvpGpzJWyjEQu1YfMQQWphbocBg1ZbUp2EoDBWOQVgiA8yRtX-DgmmRqLEif7XxHqujZFGW-1B7Tafc8RDB9xS3ArCzRYPylYzs0X0JPV0z-gxnA8kXYFNAhpOyjxRalkpDeCbkLSXKPkot8Yl5I2ucENDMvhcEW1V0ZUa-1KTwy5gQ";
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
