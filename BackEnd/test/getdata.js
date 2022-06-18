const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBSUR1tYm5MgvoEr1H9IH6ZJJ4BDRI05ZJx-u55YH_iPop_0O5CeO38TedmKuHwCptZr76FW7ua7FQSQAiMA2yRbyigm6StflGGbFIK7iyNi2o90yMC10tBgl0lbjeCTNIKBN97v-EaCny6cApbeflxOLBE7CPjl3x4e4lUdT9WH6WulvqKT0yW4W5HyrH2Whyetb_7YAPs4OPL4H0dWkTxFD0Pq2BSt3ZoZXThGGtP3CLO_25hQzwa0XqaNz5U_Lh4YgMS4DKkoAtk3tLsatSYow99PMXlkrsO7J3_80eBXwYJ2A7uyD6mDmNHUABRfW_dmYD_JVfx73aJHQ";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

let file = new Object();
let f = JSON.parse(fs.readFileSync("data.json").toString());

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    file.UserID = me.body.id;
    
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
