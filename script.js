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

var lastSec = 0
async function getSongs(sec) {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    const lyrics = await getData(songs[0].lyricsSrc)
    const lines = document.querySelectorAll(".line")
    
    var pos = 0
    for (let i = 0; i < lyrics.length; i++) {
        if (sec == lyrics[i].second && sec != lastSec) {
            document.getElementById("lyrics").style.top = `${Math.ceil(Number(window.getComputedStyle(document.getElementById("lyrics")).top.replace("px", ""))) - lines[pos].offsetHeight}px`
            lines.forEach((elem, index) => {
                if (index == i) {
                    elem.style.fontSize = "min(70px, 15vw)"
                    elem.style.color = "white"
                } else {
                    elem.style.fontSize = "min(60px, 10vw)"
                    elem.style.color = "rgba(255, 255, 255, 0.3)"
                }
            })
            lastSec = sec
            pos += 1
        }
    }
}

async function getAudio() {
    const songs = await getData("https://rolandhu.github.io/song_player/playlist/songList.json")
    audio.setAttribute("src", songs[0].songSrc)
}

getAudio()
