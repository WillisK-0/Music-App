let trackBox = document.getElementById("trackBox")
let artistBox = document.getElementById("artistBox")
let searchButton = document.getElementById("searchButton")


searchButton.addEventListener("click", function () {
    let trackName = trackBox.value
    let artistName = artistBox.value


    fetch(`https://api.lyrics.ovh/v1/${artistName}/${trackName}`)
        .then(response => response.json())
        .then(song => {
            console.log(song.lyrics)
        })
})