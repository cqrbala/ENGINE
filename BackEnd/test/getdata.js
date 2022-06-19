const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQC7VLycVpiQxp6vGIVz_NeutZTM3vXhTGcMuo4HdHigcOLSeCau1fFjatCFkwnZq2BQSbcFxAjc7HB-4AdFPnauTLNV7FF3TW1_pF1jh4-OL_K2eU01VQ8zCZmYwdXiIANReDMonDBxfMwYWZfDycRzsXvY-ot9f_b6QxB499liJBbrXyDP3rsudH5ml0QAQ7U2k4qi8rVYq1k_iMHGL1v1k71IqUVyx6J_230D7jiwNTgMbRXQV9wSp7qYg_EX_eMt8eYdBYT202IUDh5EsK5PEIWYxlP--vRc96ttgh6D1MwID28TgL04r45h1sOvp4eysHEuxMx60FRVtA";
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
