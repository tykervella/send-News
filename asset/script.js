

















































































































































































































//This is function to read news everytime a read button is clicked more coments will be addid ========= Getnet's code starts here=============
var read=document.querySelectorAll(".read");
var newsAudio =new Audio();
var audioUrl="";
var nxtAudioUrl="";
var currntAudioIndex=0;
var pausedAudioTime=0
var newsAudioEnd=0;
//This function will read aloud the content of news cadrd where clicked button located . content element will be selected based on parent of button and the child of that parent
function readAloud() {
  setInterval(function() {
    console.log(newsAudioEnd);
    if (newsAudio.currentTime==newsAudioEnd) {
      newsAudio.pause();
      read[currntAudioIndex].textContent='read'
    }else{
      newsAudioEnd=newsAudio.currentTime;
     
      console.log(newsAudio);
    }
  }, 1000)
  
  for (let i = 0; i < read.length; i++) {
     
    read[i].addEventListener("click", ()=>{
       nxtAudioUrl="./file_example_MP3_1MG"+ read[i].parentElement.children[0].textContent+ ".mp3";
      if (nxtAudioUrl===audioUrl||audioUrl==="") {
        console.log(newsAudio);
        if (newsAudio.paused) {
          audioUrl="./file_example_MP3_1MG"+ read[i].parentElement.children[0].textContent+ ".mp3";
          currntAudioIndex=i;
          newsAudio =new Audio(audioUrl);
          newsAudio.play();
          newsAudio.currentTime=pausedAudioTime;
          read[i].textContent="Pouse";
        } else {
          newsAudio.pause();
          pausedAudioTime=newsAudio.currentTime;
      
          read[i].textContent="read"
        }
      } else {
        newsAudio.pause();
        read[currntAudioIndex].textContent='read'
         
        audioUrl="./file_example_MP3_1MG"+ read[i].parentElement.children[0].textContent+ ".mp3";
        currntAudioIndex=i;
        newsAudio =new Audio(audioUrl);
        newsAudio.play();
        
        read[i].textContent="Pouse";
      }
    });
    
  }
}
readAloud();
//============================Getenet's code ends here===================================================