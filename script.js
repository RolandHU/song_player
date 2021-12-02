const audio = document.getElementById("audio")
audio.volume = 0.5

function start() {
    document.getElementById("btn").style.display = "none"
    setTimeout(() => {
        audio.play()
    }, 2000)
}

audio.addEventListener("timeupdate", (e) => {
    const second = String(e.target.currentTime).split(".")[0]
    console.log(second)
})

fetch("https://rolandhu.github.io/song_player/playlist/songList.json")
    .then (response => response.json())
    .then (data => audio.setAttribute("src", data[0].songSrc))
