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
    getSongs(second)
})

async function getData(url) {
    const response = await fetch(url)
    const songs = await response.json()
    return songs
}

async function getSongs(sec) {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    const lyrics = await getData(songs[0].lyricsSrc)
    for (let i = 0; i < lyrics.length; i++) {
        if (sec == lyrics[i].second) {
            document.getElementById("lyrics").innerText = lyrics[i].text
        }
    }
}

async function getAudio() {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    audio.setAttribute("src", songs[0].songSrc)
}

getAudio()
