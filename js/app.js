let trackBox = document.getElementById("trackBox");
let artistBox = document.getElementById("artistBox");
let searchButton = document.getElementById("searchButton");
let trackInfo = document.getElementById("trackInfo");
let trackDiv = document.getElementById("trackDiv");
let artist = document.getElementById("artist");
let albumArtDiv = document.getElementById("albumArtDiv");
let moreInfo = document.getElementById("moreInfo");
let albumSec = document.getElementById("albumSec");
let trackList = document.getElementById("trackList");
let artistNameDiv = document.getElementById("artistNameDiv");
// f86b06c5332c847e2a02380f28826dc2  <--- This is the API key for last.fm

// cliet id for spotify 0acbd973e6f3487d9515f8dcd7eb117d

fetch(
  `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f86b06c5332c847e2a02380f28826dc2&format=json`
)
  .then((reply) => reply.json())
  .then((topTracks) => {
    console.log(topTracks);
    let topTrackList = topTracks.tracks.track.map((track) => {
      return `<li class="list-group-item>${track.name}- ${track.artist.name}</li>`;
    });
    trackList.innerHTML = topTrackList.join("");
  });

fetch(
  `http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=f86b06c5332c847e2a02380f28826dc2&format=json`
)
  .then((response1) => response1.json())
  .then((album) => {
    let output = album.albums.album.slice(0, 24).map((info) => {
      return `<li><figure><img src='${info.image[2]["#text"]}' class="main-section__albumArt"></li>`;
    });
    albumSec.innerHTML = output.join("");
  });

const searchQuery = () => {
  let trackName = trackBox.value;
  let artistName = artistBox.value;

  fetch(
    `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=f86b06c5332c847e2a02380f28826dc2&artist=${artistName}&track=${trackName}&format=json`
  )
    .then((r) => r.json())
    .then((trackAbout) => {
      if (trackAbout.error) {
        return console.log("error");
      } else {
        let head = `<h2>${trackAbout.track.name} </h2>`;
        let artistNameValue = `<h2>${trackAbout.track.artist.name}</h.`;

        trackDiv.innerHTML = head;
        artistNameDiv.innerHTMl = artistNameValue;
        return fetch(
          `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f86b06c5332c847e2a02380f28826dc2&artist=${artistName}&album=${trackAbout.track.album.title}&format=json`
        );
      }
    })
    .then((x) => x.json())
    .then((albumInfo) => {
      songList = albumInfo.album.tracks.track;
      let liItem = songList.map((object) => {
        return `<li>${object.name}</li>`;
      });

      let z = `<h2 class="column2">${albumInfo.album.name}</h2>
                        <div id="songList">
                        <ul class="column2" style="list-style-type:decimal">
                        ${liItem.join("")}
                        </ul></div>`;

      let y = `<img class= "column" src = "${albumInfo.album.image[4]["#text"]}">`;

      let x = `<a href="${albumInfo.album.url}" id="moreInfoLink" target="_blank"><p>Click for more info</p></a>`;
      moreInfo.innerHTML = x;
      albumArtDiv.innerHTML = y;
      artist.innerHTML = z;
    });

  fetch(`https://api.audd.io/findLyrics/?q=${artistName}${trackName}`)
    .then((response) => response.json())
    .then((song) => {
      console.log(song);
      let item = `<p class="inner">${song.result[0].lyrics}</p>`;
      trackInfo.innerHTML = item;
    });
};

trackBox.focus();
searchButton.addEventListener("click", searchQuery);
artistBox.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode == 13) {
    searchButton.click();
  }
});
