async function getSongs(){

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            let url = element.href;
            let part1 = url.split("/songs/")[1];
            let part2 = part1.split("_64")[0];
            songs.push(`<li>${part2}</li>`)
        }
        
    }
    return songs
    
}
// songs()
async function main() {
    // getting the list of all the songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (let song of songs){
        song =song.replaceAll("%20"," ")
        songUL.innerHTML = songUL.innerHTML + `<li>
        <div class="songPlay">
                                <img src="svgs/music.svg">
                                <div class="info">
                                    <div>hello</div>
                                    <div>singer name</div> 
                                    <div class="playNow">
                                    <h6>Play Now</h6>
                                <img src="svgs/play.svg">
                                ${song}
                                </div> 
                                    <div>hii</div>
                                    
                                </div>
                               
                            </div>
        
        
        
        </li>`;

    } 
    {
        // songUL.innerHTML = songUL.innerHTML +<li> ${ song.replaceAll("%20"," ")} </li>;
        
    }
    // play the first song
    var audio = new Audio (songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", () => {
        // let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });
    // function playAudio() {
    audio.play();
    // }

    // function pauseAudio() {
    // audio.pause();
    // }

}
main()