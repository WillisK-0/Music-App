let trackBox = document.getElementById("trackBox")
let artistBox = document.getElementById("artistBox")
let searchButton = document.getElementById("searchButton")
let trackInfo = document.getElementById("trackInfo")
let trackDiv = document.getElementById("trackDiv")
let artist = document.getElementById("artist")
// f86b06c5332c847e2a02380f28826dc2  <--- This is the API key for last.fm

const searchQuery = () =>{

searchButton.addEventListener("click", function () {
    let trackName = trackBox.value
    let artistName = artistBox.value

    fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=f86b06c5332c847e2a02380f28826dc2&artist=${artistName}&track=${trackName}&format=json`)
        .then(r => r.json())
        .then(trackAbout => {
            console.log(trackAbout)
            let head = `<h2 style="text-align: center;">${trackAbout.track.name} - <a href="${trackAbout.track.artist.url}">${trackAbout.track.artist.name}</a></h2>`
            trackDiv.innerHTML = head
            return fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=f86b06c5332c847e2a02380f28826dc2&artist=${artistName}&album=${trackAbout.track.album.title}&format=json`)

        })
        .then(x => x.json())
        .then(albumInfo => {
            console.log(albumInfo)
            songList = albumInfo.album.tracks.track
            console.log(songList)
            let liItem = songList.map((object) => {
                return `<li>${object.name}</li>`

            })

            let z = `
                    <img class= "column" src = "${albumInfo.album.image[2]["#text"]}">

                    <h2 class="column2">${albumInfo.album.name}</h2>
                    <div id="songList"> 
                     <ul class="column2" style="list-style-type:decimal">
                    ${liItem.join('')}
                     </ul></div>`
            artist.innerHTML = z

        })


    fetch(`https://api.lyrics.ovh/v1/${artistName}/${trackName}`)
        .then(response => response.json())
        .then(song => {
            let item = `<p class="inner">${song.lyrics}</p>`
            trackInfo.innerHTML = item
        })






})
}
trackBox.focus();
searchButton.addEventListener("click", searchQuery)
artistBox.addEventListener("keyup", function (e) {
    e.preventDefault()
    if (e.keyCode == 13) {
        searchButton.click()
    }
})