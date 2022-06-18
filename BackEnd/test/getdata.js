const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQA4bW0GUeyvkFMcu-do123XzCTpru5gTrntqXadw2PsbwjnJXxONwEJRkzMITZ3mppzNwq-qrC1-N4mVkAov1RsOj7dH6arHYXzrcPAMXN-DZVpZWTC8vBFCAmC4MWTZSpWRLHIk-9JMosL59BdqjDFEP6U03aiy2OXqi1PQiSbW-LBGRR2xn3wrC4HYhr39jhJRPrT8M7IsvYIWveAaoRRqAJt2wKa0mrvZdHFwBm4PFi50YOxSi0FhZ8yBaPJtSY-gy6syJD8oOTY3lXCA90KEbM17lOjJKLgc9L3XhENze7bGpAu-mq4WnKu57q2p-MDKtid-nlcrVz79IyU7A";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

let file = new Object();
let f = JSON.parse(fs.readFileSync("data.json").toString());

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    file.UserID = me.body.id;
    GetTop10Artists(me.body.id);
    MyTopTracks(me.body.id);
    //console.log(file)
  })().catch(e => {
    console.error(e);
  });
}

async function GetTop10Artists(userName) {
    const data = await spotifyApi.getMyTopArtists({
        limit:10
    })
    //console.log("---------------+++++++++++++++++++++++++")
    let artists = []

    for (let artist of data.body.items) {
        artists.push(artist.name)
    }
    file.Artists = artists
    //console.log(file)
}

async function MyTopTracks(userName) {
    const data = await spotifyApi.getMyTopTracks({
        limit:5
    })
    //console.log("---------------+++++++++++++++++++++++++")
    let songs = []

    for (let song of data.body.items) {
      songs.push({"name":song.name, "img":song.album.images[0].url})
    }

    file.Songs = songs
    //console.log(file)
    f.USERS.push(file)
    console.log(f)
    fs.writeFileSync("data.json",JSON.stringify(f))
    //console.log(f.USERS.Songs)
}

async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
    fs.appendFileSync("data.json", )
  }
}

getMyData();
