const audio = document.getElementById("audio")
audio.volume = 0.5

function start() {
    audio.play()
}

audio.addEventListener("timeupdate", (e) => {
    console.log(e.target.currentTime)
})

const songList = fetch("https://rolandhu.github.io/song_player/playlist/songList.json").then (response => response.json()).then (data => data)
audio.setAttributes("src", songList[0].songSrc)
