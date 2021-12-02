const audio = document.getElementById("audio")
audio.volume = 0.5

function start() {
    audio.play()
}

audio.addEventListener("timeupdate", (e) => {
    console.log(e.target.currentTime)
})

const asd = fetch("https://rolandhu.github.io/song_player/playlist/songList.json").then (response => response.json()).then (data => data)
console.log(asd)
