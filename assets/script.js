// ============modal code start =======================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});
// ===========================Modal code end ==============================================================

var searchinput = "covid"
var searchstring = 'q=' + searchinput + '&'

var today = dayjs().format("YYYY-MM-DD")
var datestring = "from=" + today + "&"


// possible country codes 
// ae, ar, at, au, be, bg, br, ca, ch, cn, co, cu, cz, de, eg, fr, gb, gr, hk, hu, id, ie, il, in, it, jp, kr, lt, lv, ma, mx, my, ng, nl, no, nz, ph, pl, pt, ro, rs, ru, sa, se, sg, si, sk, th, tr, tw, ua, us, ve, za
var country = "us"
var countrystring = "country=" + country + "&"

// possible categories
//business, entertainment, general, health, science, sports, technology
var category = "health"
var categorystring = "category=" + category + "&"

// url to show top headlines in specific categories
var topheadlinesurl = "https://newsapi.org/v2/top-headlines?" +
          countrystring +
          categorystring +
          searchstring +
          "pagesize=10&" +
          "apiKey=9db76ac16d454b918d7c994623816b9b"

var req = new Request(topheadlinesurl);

// grab the API url and manipulates the data 
fetch(req)
    .then(function(response) {
        return response.json();
    })

    .then(function (data) {
       console.log(data);

        for (var i=0; i<data.articles.length; i++) {

            var title = data.articles[i].title
            var author = data.articles[i].author
            var content = data.articles[i].content
            var url=data.articles[i].url;
            console.log(title,author,content,url)
        }
      });


//This is function to read news everytime a read button is clicked more coments will be addid ========= Getnet's code starts here=============




var read=document.querySelectorAll(".read-aloud");
var newsAudio =new Audio();
var audioUrl="";
var nxtAudioUrl="";
var currntAudioIndex=0;
var pausedAudioTime=0
var newsAudioEnd=0;
//This function will read aloud the content of news cadrd where clicked button located . content element will be selected based on parent of button and the child of that parent. The code is written to avoide 
function readAloud() {
  //Code inside this time interval will scane if playing is ended and change butten lebel to play
  setInterval(function() {
    console.log(newsAudioEnd);
    if (newsAudio.currentTime>1 && newsAudio.currentTime==newsAudioEnd) {
      newsAudio.pause();
      read[currntAudioIndex].textContent='Play'
    }else{
      newsAudioEnd=newsAudio.currentTime;
     
      console.log(newsAudio);
    }
  }, 1000)
  
  //listen to click event of all read aloud (play buttons and read dicreption and content of the news located in the parent-parent canrd of the cleckd buttons. Buttons are porgrammend to be used as togle switchs play/pouse.
  for (let i = 0; i < read.length; i++) {
     
    read[i].addEventListener("click", ()=>{
     
       var newsDiscription=read[i].parentElement.parentElement.children[2].children[0].textContent.trim()+"    ";
       var newsContent=read[i].parentElement.parentElement.children[2].children[0].textContent.trim();
       nxtAudioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+ newsDiscription + newsContent;
       console.log(nxtAudioUrl, "next");
       console.log(audioUrl,"current");
      if (nxtAudioUrl===audioUrl||audioUrl==="") {
        console.log(newsAudio);
        if (newsAudio.paused) {
          audioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+newsDiscription + newsContent;
          currntAudioIndex=i;
          newsAudio =new Audio(audioUrl);
          newsAudio.play();
          newsAudio.currentTime=pausedAudioTime;
          read[i].textContent="Pouse";
        } else {
          newsAudio.pause();
          pausedAudioTime=newsAudio.currentTime;
      
          read[i].textContent="Play"
        }
      } else {
        newsAudio.pause();
        read[currntAudioIndex].textContent='Play'
         
        audioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+newsDiscription + newsContent;
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

