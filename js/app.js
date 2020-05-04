let trackBox = document.getElementById("trackBox")
let artistBox = document.getElementById("artistBox")
let searchButton = document.getElementById("searchButton")

// f86b06c5332c847e2a02380f28826dc2  <--- This is the API key for last.fm


searchButton.addEventListener("click", function () {
    let trackName = trackBox.value
    let artistName = artistBox.value


    fetch(`https://api.lyrics.ovh/v1/${artistName}/${trackName}`)
        .then(response => response.json())
        .then(song => {
            console.log(song.lyrics)
        })

    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=f86b06c5332c847e2a02380f28826dc2&format=json`)
    .then(results => results.json())
    .then(artistInfo => {
        console.log(artistInfo)
    })
})