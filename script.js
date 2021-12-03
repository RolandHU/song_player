const audio = document.getElementById("audio")
audio.volume = 0.5
const display = document.querySelector(".display")
loadLyrics()

function start() {
    document.getElementById("btn").style.display = "none"
    setTimeout(() => {
        audio.play()
        display.style.display = "block"
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

async function loadLyrics() {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    const lyrics = await getData(songs[0].lyricsSrc)
    for (let i = 0; i < lyrics.length; i++) {
        document.getElementById("lyrics").innerHTML += `<p class="line"> ${lyrics[i].text} </p>`
    }
}

async function getSongs(sec) {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    const lyrics = await getData(songs[0].lyricsSrc)
    const lines = document.querySelectorAll(".line")
    
    pos = 0
    for (let i = 0; i < lyrics.length; i++) {
        if (sec == lyrics[i].second) {
            document.getElementById("lyrics").style.top = `${Math.ceil(Number(window.getComputedStyle(document.getElementById("lyrics")).top.replace("px", ""))) - lines[pos].offsetHeight}px`
            pos += 1
        }
    }
}

async function getAudio() {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    audio.setAttribute("src", songs[0].songSrc)
}

getAudio()
