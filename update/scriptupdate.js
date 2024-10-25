console.log("welcome to spotify clone indexer");

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



//this is regarding the home and about button update.

let aboutBtn = document.querySelector(".about");
let homeBtn = document.querySelector(".home");
let main = document.querySelector("#MAIN")

// aboutBtn.addEventListener("click", function(){
//     main.classList.remove("container");
//     main.innerHTML = `<div class="modal-content">
//             <span class="close">&times;</span>
//             <h2>About Us</h2>
//             <p>Your content goes here...</p>
//         </div>`;
//    let modal = document.querySelector(".modal-content");
//    let closeBtn = document.querySelector(".close");
//   main.style.display= none; /* Hidden by default */
//   main.style.position: fixed; 
//   main.style.z-index: 1; 
//   main.style.left: 0;
//   main.style.top: 0;
//   main.style.width: 100%; 
//   main.style.min-height: 80vh; 
//   main.style.overflow: auto; 
//   main.style.background-color: black; 
//   main.style.background-color: rgba(0,0,0,0.4); 

//   modal.style.background-color= white;
//     modal.style.margin= 15% auto; 
//     modal.style.padding= 20px;
//     modal.style.border= 1px solid #888;
//     modal.style.width= 80%; 


//     closeBtn.style.color: #aaa;
//     closeBtn.style.float: right;
//     closeBtn.style.font-size: 28px;
//     closeBtn.style.font-weight: bold;
// })

aboutBtn.addEventListener("click", function() {
    main.classList.remove("container");
    main.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>About Us</h2>
            <p>Your content goes here...</p>
        </div>`;
    
    let modal = document.querySelector(".modal-content");
    let closeBtn = document.querySelector(".close");
    
    // Set styles for the main element
    main.style.display = "block"; // Changed from none to block to show it
    main.style.position = "fixed"; 
    main.style.zIndex = "1"; 
    main.style.left = "0";
    main.style.top = "0";
    main.style.width = "100%"; 
    main.style.minHeight = "80vh"; 
    main.style.overflow = "auto"; 
    main.style.backgroundColor = "rgba(0, 0, 0, 0.4)"; 

    // Set styles for the modal
    modal.style.backgroundColor = "white";
    modal.style.margin = "15% auto"; 
    modal.style.padding = "20px";
    modal.style.border = "1px solid #888";
    modal.style.width = "80%"; 

    // Set styles for the close button
    closeBtn.style.color = "#aaa";
    closeBtn.style.float = "right";
    closeBtn.style.fontSize = "28px";
    closeBtn.style.fontWeight = "bold";

    // Close the modal when the close button is clicked
    
});

closeBtn.addEventListener("click", function() {
    main.style.display = "none";
    main.classList.add("container"); // Optionally, add back the container class
});
























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
