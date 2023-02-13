var country = "us"
var countrystring = "country=" + country + "&"
var searchinput = ""
var category = "general"

var read=document.querySelectorAll(".read-aloud");
var newsAudio =new Audio();
var audioUrl="";
var nxtAudioUrl="";
var currntAudioIndex=0;
var pausedAudioTime=0
var newsAudioEnd=0;
var newsCardsContainerDiv=document.querySelector('.newsCardsContainer');
var addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
setTimeout(() => {
  addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
  console.log(addToFavoriteBtns, "favorite dly");
}, 2000);
//The content of theis function except the time delay is copied from bulma css fream work to handle modal. This will be called every time page loads and every time page is updated up on new search . Time delay is needed to wait the all elements created and renderd before doing quiryslection.
function activateModal() {
  setTimeout(function() {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
    console.log('donloaded');
    function closeModal($el) {
      $el.classList.remove('is-active');
    }

    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

  

    console.log(document.querySelectorAll('.js-modal-trigger'));
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      console.log(modal)
      $trigger.addEventListener('click', () => {
        console.log("readmore1");
        openModal($target);
        console.log("readmore");
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
  },2000);    
}
//activate modal function called upon page loading
//document.addEventListener('DOMContentLoaded', () => {
 // activateModal();
//});
activateModal();
// ===========================Modal code end ==============================================================

//This function will recive news array object , create cards for each news nad render it
function renderNews(newsObjectArray) {
  newsCardsContainerDiv=document.querySelector('.newsCardsContainer');
  newsCardsContainerDiv.innerHTML="";
  for (let i = 0; i < newsObjectArray.length; i++) {

    var newsCardDiv=document.createElement('div'); //create card conainer for each news
    newsCardDiv.classList.add('card','m-3',"has-background-link-light")

    var newsCardHeader=document.createElement('header'); // first child of newsCardDiv
    newsCardHeader.classList.add("card-header");
    var newsCardHeaderTitle=document.createElement('p');
    newsCardHeaderTitle.textContent=newsObjectArray[i].title;
    newsCardHeaderTitle.classList.add('card-header-title');

    newsCardHeader.append(newsCardHeaderTitle); //title is apended to header
  
    // var newsCardBreak=document.createElement('br')//this element is here to help consistant location of news discription and content with the modal from the parent

    var newsCardDescriptionContainer=document.createElement('div');//newis discription container div
    newsCardDescriptionContainer.classList.add("card-content");
    var newsCardDescription=document.createElement('div');//News discription content
    newsCardDescription.classList.add("content","description");
    newsCardDescription.textContent=newsObjectArray[i].description;
    newsCardDescriptionContainer.append(newsCardDescription)

    var newsCardContentContainer=document.createElement('div');//newis discription container div
    newsCardContentContainer.classList.add("card-content","article","hide");
    var newsCardContent=document.createElement('div');//News content
    newsCardContent.classList.add("content","article","hide");
    newsCardContent.textContent=newsObjectArray[i].content;
    newsCardContentContainer.append(newsCardContent);

  //creating modal html==================================
    var modalContainerDiv=document.createElement('div');//this div contain everything in the modal
    modalContainerDiv.setAttribute('class','modal');
    modalContainerDiv.setAttribute('id','news-popup'+i);
    
    var modalCbackgroundDiv=document.createElement('div');
    modalCbackgroundDiv.classList.add('modal-background');
    var modalCard=document.createElement('div');
    modalCard.classList.add('modal-card');
      var modalHeader=document.createElement('header');
      modalHeader.classList.add('modal-card-head');
      var modalHeaderTitle=document.createElement('p');
      modalHeaderTitle.classList.add('modal-card-title','custum-modal-title');
      modalHeaderTitle.textContent=newsObjectArray[i].title
      var modalHeaderButton=document.createElement('button');
      modalHeaderButton.classList.add('delete');
      modalHeaderButton.setAttribute('aria-label','close');
      modalHeader.append(modalHeaderTitle,modalHeaderButton);

      var newsModalDescriptionContainer=document.createElement('div');//newis discription container div
      newsModalDescriptionContainer.classList.add("modal-card-body");
      var newsModalDescription=document.createElement('div');//News discription content
      newsModalDescription.classList.add("content","description");
      newsModalDescription.textContent=newsObjectArray[i].description;
      newsModalDescriptionContainer.append(newsModalDescription)

      var newsModalContentContainer=document.createElement('div');//newis discription container div
      newsModalContentContainer.classList.add("modal-card-body");
      var newsModalContent=document.createElement('div');//News content
      newsModalContent.classList.add("content","article");
      newsModalContent.textContent=newsObjectArray[i].content;
      newsModalContentContainer.append(newsModalContent);

      var modalFooter=document.createElement('footer');
      modalFooter.classList.add('modal-card-foot');
        var modalFooterPlayBtn=document.createElement('a');
        modalFooterPlayBtn.setAttribute('href','#');
        modalFooterPlayBtn.classList.add('card-footer-item','read-aloud');
        modalFooterPlayBtn.textContent="Play";
        var modalFooterLink=document.createElement('a');
        modalFooterLink.setAttribute('href',newsObjectArray[i].url);
        modalFooterLink.setAttribute('class','card-footer-item')
        modalFooterLink.textContent='Link';
        var modalFooterAddFavorite=document.createElement('a');
        modalFooterAddFavorite.setAttribute('href','#');
        modalFooterAddFavorite.classList.add('card-footer-item','addFavoriteBtn');
        modalFooterAddFavorite.textContent="Add To Favorite";
      modalFooter.append(modalFooterPlayBtn,modalFooterLink,modalFooterAddFavorite);
      modalCard.append(modalHeader,newsModalDescriptionContainer,newsModalContentContainer,modalFooter)
      modalContainerDiv.append(modalCbackgroundDiv,modalCard);
   //crating modal edns here========================================
   var newsCardFooter=document.createElement('footer');
   newsCardFooter.classList.add('card-footer');
        var newsCardFooterPlayBtn=document.createElement('a');
        //newsCardFooterPlayBtn.setAttribute('href','#');
        newsCardFooterPlayBtn.classList.add("card-footer-item",'read-aloud');
        newsCardFooterPlayBtn.textContent="Play";
        var newsCardFooterReadMor=document.createElement('a');
        //newsCardFooterReadMor.setAttribute('href','#');
        newsCardFooterReadMor.classList.add("card-footer-item","js-modal-trigger");
        newsCardFooterReadMor.setAttribute('data-target','news-popup'+i);
        newsCardFooterReadMor.textContent="ReadMore";

  newsCardFooter.append(newsCardFooterPlayBtn,newsCardFooterReadMor);


  newsCardDiv.append(newsCardHeader,newsCardDescriptionContainer,newsCardContentContainer,modalContainerDiv,newsCardFooter)
  newsCardsContainerDiv.append(newsCardDiv); 
  }
}
//=======================End of render function ===========================================================
//=======================get news functin==============================================================

function getNews(searchvar,categoryvar) {
  var searchstring = 'q=' + searchvar + '&'
  var categorystring = "category=" + categoryvar + "&"
  var topheadlinesurl = "https://newsapi.org/v2/top-headlines?" +
  countrystring +
  categorystring +
  searchstring +
  "pagesize=10&" +
  "apiKey=9db76ac16d454b918d7c994623816b9b"
  var req = new Request(topheadlinesurl);
  fetch(req)
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
      console.log(data.articles);
      renderNews(data.articles);
  });
}
getNews(searchinput,category);

//=========================================================end of get news function========================

//This function will read aloud the content of news cadrd where clicked button located . content element will be selected based on parent of button and the child of that parent. The code is written to avoide 
function readAloud() {
  
    console.log(read);
    //Code inside this time interval will scane if playing is ended and change butten lebel to play

    setInterval(function() {
      
      
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
          
        var newsDescription=read[i].parentElement.parentElement.children[1].children[0].textContent.trim()+"    ";
        var newsContent=read[i].parentElement.parentElement.children[2].children[0].textContent.trim();
        nxtAudioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+ newsDescription + newsContent;
        console.log(nxtAudioUrl, "next");
        console.log(audioUrl,"current");
        if (nxtAudioUrl===audioUrl||audioUrl==="") {
          console.log(newsAudio);
          if (newsAudio.paused) {
            audioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+newsDescription + newsContent;
            currntAudioIndex=i;
            newsAudio =new Audio(audioUrl);

            newsAudio.play();
            newsAudio.currentTime = pausedAudioTime;
            read[i].textContent = "Pouse";
          } else {
            newsAudio.pause();

            pausedAudioTime=newsAudio.currentTime;
        
            read[i].textContent="Play"
          }
        } else {
          newsAudio.pause();
          read[currntAudioIndex].textContent='Play'
          
          audioUrl="http://api.voicerss.org/?key=e25d609815964af58977c036e5460b2b&hl=en-us&c=MP3&f=16khz_16bit_stereo&src="+newsDescription + newsContent;
          currntAudioIndex=i;
          newsAudio =new Audio(audioUrl);

          newsAudio.play();

          read[i].textContent = "Pouse";
        }
      });

    }

}
//=================================end of read aloud function============================================================================
//=================================time delay to wait for element to render before selecting elements to listen to events===================================
setTimeout(function() {
  read=document.querySelectorAll(".read-aloud");
  console.log(read);
  readAloud();
 }, 2000)

//add event listener to searchBtn and runs function when clicked
document.getElementById("searchBtn").addEventListener("click", function () {
  console.log(document.getElementById("searchString").value);
  console.log(document.getElementById("selectCat").value);

  searchinput = document.getElementById("searchString").value
  category = document.getElementById("selectCat").value
  
  getNews(searchinput, category);
  setTimeout(function() {
    read=document.querySelectorAll(".read-aloud");
    console.log(read);
    readAloud();
   }, 2000)
  activateModal();
});

//this function will listen to all add to favorite buttons and save the news object from the card wher the button belongs to.
function addToforite () {
  setTimeout(() => {
  
 
    var savedFavorite=[];
     
    if (JSON.parse(localStorage.getItem('savedNews'))) {
      savedFavorite=JSON.parse(localStorage.getItem('savedNews'));
      console.log(savedFavorite,"1");
    }
    var newsObject={
      title:"",
      description:"",
      content:"",
      url:""
    }
    for (let i = 0; i < addToFavoriteBtns.length; i++) {
      addToFavoriteBtns[i].addEventListener('click', ()=>{
        newsObject.title=addToFavoriteBtns[i].parentElement.parentElement.children[0].children[0].textContent;
        newsObject.description=addToFavoriteBtns[i].parentElement.parentElement.children[1].children[0].textContent;
        newsObject.content=addToFavoriteBtns[i].parentElement.parentElement.children[2].children[0].textContent;
        newsObject.url=addToFavoriteBtns[i].parentElement.children[1].getAttribute('href');
        var newsIsInstorage=0;
        for (let j = 0; j < savedFavorite.length; j++) {
          if (JSON.stringify(savedFavorite[i])===JSON.stringify(newsObject)) {
            newsIsInstorage=1;
            console.log(newsIsInstorage,"instorage")
          }
        }
        if (newsIsInstorage===0) {
          //savedFavorite.push(newsObject);
          localStorage.setItem("savedNews",JSON.stringify(savedFavorite.push(newsObject)));
        console.log("news saved")
        }
        console.log(savedFavorite,"2");
      })
    }
    console.log("I am clicked)")
  }, 2000);
}
addToforite();


