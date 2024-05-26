let currentSong = new Audio();
let songs;
// let songHeading = [];

function formatTime(seconds) {
    if (isNaN(seconds)|| seconds < 0){
        return "00:00";
    }
    // Calculate the minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =  Math.floor(seconds % 60);
    
    // Format the remaining seconds to always have two digits
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Combine minutes and formatted seconds
    return `${minutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let url = element.href;
            let part1 = url.split("/songs/")[1];
            // let part2 = part1.split("_64")[0];
            songs.push(part1);
            // songHeading.push(part2); 
        }
    }
    return songs;
    // return songHeading;
}
const playMusic = (track, pause=false)=>{
    currentSong.src = "/songs/" + track
    if(!pause){
        currentSong.play()
        play.src = "svgs/pause.svg"
    }
    // let audio = new Audio("/songs/" + track)
    currentSong.play()
    document.querySelector(".songinfo").innerHTML =decodeURI(track) 
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

    
}

async function main() {
    
    // Getting the list of all the songs
    songs = await getSongs();
    console.log(songs);
    playMusic(songs[0],true)

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    let songHTML = "";
    for (const song of songs) {
        songUL.innerHTML += `<li>
            <div class="songPlay">
            <img src="svgs/music.svg">
                 <div class="info">
                
                <div>${song.replaceAll("%20", " ")}</div>
                    
                </div>
                    <div class="playNow">
                        <h6>Play Now</h6>
                        <img src="svgs/play-grey.svg">
                       
                    </div>
            </div>
        </li>`;
    }
    // for (const iterator of songs) {
    //     songUL.innerHTML += `
    //     <div class="heelo">
    //     <div> ${iterator}</div>
    //     </div>`
        
    // }
    // console.log("HELLLLLLLLLLLOOOOOOOOOOOO")

    
    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            // console.log(e.querySelector(".heelo").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            // playMusic(e.querySelector(".heelo").firstElementChild.innerHTML.trim())
            

        })
    })
    // Attach an event listener to prev, play & next
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "svgs/pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "svgs/play.svg"
            
        }
    })
    // Event listener for prev 
    prev.addEventListener("click", ()=>{
        console.log("play prev")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index-1)>= 0){
            playMusic(songs[index-1])
        }
    })

    // Event listener for next
    next.addEventListener("click", ()=>{
        // currentSong.pause()
        console.log("Next playing")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if((index+1) <songs.length){
            playMusic(songs[index+1])
        }
        // console.log()[0]
    })
    // Time updation as the song plays
    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/
        ${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        // document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    // Active Seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)* 100;
        document.querySelector(".circle").style.left = percent + "%";
currentSong.currentTime = ((currentSong.duration) * percent)/100;
})
    // Event Listener for HAMBURGER
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0"
    })
    // Event listener for CLOSE
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left= "-100%"
    })
}
// Run the main function to execute the code
main();
