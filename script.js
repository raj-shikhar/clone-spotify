console.log("welcome to spotify clone");

// initialize variables
let songIndex = 0;
let resumePoint = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songBut = document.getElementsByClassName("songItemPlay");

let songs = [
    {songName: "Chal mere Ghar - Yo Yo Honey Singh", fielPath : "./songs/1.mp3", cover: "./covers/Desi_Kalakaar.jpg"},
    {songName: "One Thousand Miles - Yo Yo Honey Singh", fielPath : "./songs/2.mp3", cover: "./covers/Desi_Kalakaar.jpg"},
    {songName: "Daftar Ki Girl - Yo Yo Honey Singh", fielPath : "./songs/3.mp3", cover: "./covers/Desi_Kalakaar.jpg"},
    {songName: "I'm Your Dj Tonight - Yo Yo Honey Singh", fielPath : "./songs/4.mp3", cover: "./covers/Desi_Kalakaar.jpg"},
    {songName: "Desi Kalakar - Yo Yo Honey Singh", fielPath : "./songs/5.mp3", cover: "./covers/Desi_Kalakaar.jpg"},
    {songName: "Love Dose - Yo Yo Honey Singh", fielPath : "./songs/6.mp3", cover: "./covers/Desi_Kalakaar.jpg"},

]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].cover; 
    element.getElementsByTagName("img")[0].style.width = "96px"; 
    element.getElementsByTagName("img")[0].style.borderRadius = "5px"; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("songName")[0].style.fontSize = "2vh"; 
    element.getElementsByClassName("songName")[0].style.fontFamily = "Varela-Round"; 
})

// audioElement.play();
// handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        songBut[songIndex].classList.remove("bi-play-circle");
        songBut[songIndex].classList.add("bi-pause-circle");
        masterPlay.classList.remove("bi-play-circle");
        masterPlay.classList.add("bi-pause-circle-fill");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        songBut[songIndex].classList.remove("bi-pause-circle");
        songBut[songIndex].classList.add("bi-play-circle");
        masterPlay.classList.remove("bi-pause-circle-fill");
        masterPlay.classList.add("bi-play-circle");
        gif.style.opacity = 0;
    }
})

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

// listen to events
audioElement.addEventListener("timeupdate", ()=>{
    progress  = parseFloat(audioElement.currentTime/audioElement.duration*100);
    progressBar.value = progress;
    document.getElementsByClassName("my")[0].textContent= formatTime(audioElement.duration-audioElement.currentTime);
})

progressBar.addEventListener("change", ()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration/100)    
})


//changing song card circles play pause

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('bi-pause-circle');
        element.classList.add('bi-play-circle');
    })
}

//playing funtion for card button

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused){
            makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bi-play-circle');
        e.target.classList.add('bi-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = resumePoint;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('bi-play-circle');
        masterPlay.classList.add('bi-pause-circle');
        }
        else{
            // songIndex = parseInt(e.target.id);
            // 
            // audioElement.src = `songs/${songIndex+1}.mp3`;
            // audioElement.currentTime = progress;
            resumePoint = audioElement.currentTime;
            audioElement.pause();
            gif.style.opacity = 0;
            e.target.classList.remove('bi-pause-circle');
            e.target.classList.add('bi-play-circle');
            masterPlay.classList.remove('bi-pause-circle');
            masterPlay.classList.add('bi-play-circle');
        }
    })
})

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
//     element.addEventListener('click', (e)=>{ 
//         if(audioElement.played || audioElement.currentTime>=0){
            
//         }
        
//     })
// })
//next button function
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    makeAllPlays();
    songBut[songIndex].classList.remove("bi-play-circle");
    songBut[songIndex].classList.add("bi-pause-circle");
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');

})

//previos button function 
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songBut[songIndex].classList.remove("bi-play-circle");
    songBut[songIndex].classList.add("bi-pause-circle");
    masterPlay.classList.remove('bi-play-circle');
    masterPlay.classList.add('bi-pause-circle');
})

//scroll with mouse scroll

const outerContainer = document.getElementById('MAIN');

outerContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  outerContainer.scrollLeft += event.deltaY;
});

