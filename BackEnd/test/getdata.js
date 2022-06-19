const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQD2z05TJD3zeqOH_-IgODaxu7wfiTF5Xme_Evku96JdcSbfxQKHo4hBdW5OWKVRtGm6wiwdRtdD5_iq-cBnjLwqH0OmbZ7U473EkOTi8fEsAImvsbJSZK1jbmvsWJZZP6dZMwzBZ_hd9jSEuMJUx7eyjCbVbp8UXlOLdK0OZypkOWJrwGOMo42QZnW_mSjb4gGn8dJs8fFZ9WeATum_MKug6zCp4EPO6A1c--KrXrgyBmDpmnKN1v-dEL52LMmI6_BrIDKQ0bxYgUehT5bN3WAkPahc0dfvqVdpHZl5A1uZJR-HPlKv9jHIiOPdKXHs4sxSmSq3vOzy3VqYvAGVKQ";
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
