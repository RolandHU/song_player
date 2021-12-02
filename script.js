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
    console.log(returnLyrics(second))
})

function returnLyrics(second) {
    fetch("https://rolandhu.github.io/song_player/playlist/songList.json")
    .then (response => response.json())
    .then ((data) => {
        fetch(data[0].lyricsSrc)
            .then (response => response.json())
            .then ((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].second == second) {
                        return data[i]
                    }
                }
            })
    })
}

fetch("https://rolandhu.github.io/song_player/playlist/songList.json")
    .then (response => response.json())
    .then ((data) => {
        audio.setAttribute("src", data[0].songSrc)
        fetch(data[0].lyricsSrc)
            .then (response => response.json())
            .then (data => console.log(data))
    })
