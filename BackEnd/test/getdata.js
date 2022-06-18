const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCECtHH-Sn0mQHJRNAy082ugkZeu3G9vPxzEmtebhteNJV1cgB8CT_Wb5M-C5SsjRcYxHrfBPoaxH92RO1aua8_3vqnFCYY21DSktMcBkjsWUOSQ9e6kjisQ0IkoOibD35vcdUxXmoVo5pR4m37M81dYM3Ze_rh0furcZU-04z6eWClhcBZGc-IUXEeMq8jvTnqw2R_psEJqbxiQvYkZvbntJ_7g9dcr_LAUufvYkofPjU264uDXQdG_9Kq3CiNMMANWiDrrRWIrle3MwJzQ-vsmlVf7kFLNXeEFKjsx6aa7dwcOCX5AikNfNO3PabBYlsPTJueA6oYHXWgvzAmow";

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
    fs.writeFileSync("data.json",JSON.stringify(f))
}

getMyData();
