const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDr06vkl1sm0-0hAkozyrkfy4JELQpkQf00u36Pkjvd8AhpxEBYZJ0BbgvVTFkzqMlRb1uZVv5WFm8mgrhpwhA_662mFs0hZtBDA2iuKHbt4q3o8Xg0khVch8pTcAxUf9lukIwyeUC9b9-0ixRX2Pv6AuAkiaBP2gp5_j683LZWzQpsATu8xUJs-LJmO_l3NULtIM1txHA1w5UhZ_vNh_a2JDWTj_D6cCDsT6xTSlbw_6iY1COke6ugRHs-8SxiIpihg-RZC2ryowARTW_unAurXG34azaeM5EoUaZHKM6S1IL5O17_ElsP8KEZg8DXqYJ3lGvqn3RDtHWx0A";

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
