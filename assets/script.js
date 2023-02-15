var country = "us"
var countrystring = "country=" + country + "&"
var searchinput = ""
//var category = "general"
var category="top";
var delaytime=2000;

var read=document.querySelectorAll(".read-aloud");
var newsAudio =new Audio();
var audioUrl="";
var nxtAudioUrl="";
var currntAudioIndex=0;
var pausedAudioTime=0
var newsAudioEnd=0;
var newsCardsContainerDiv=document.querySelector('.newsCardsContainer');
var addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
// setTimeout(() => {
//   addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
//   console.log(addToFavoriteBtns, "favorite dly");
// }, delaytime);
//The content of theis function except the time delay is copied from bulma css fream work to handle modal. This will be called every time page loads and every time page is updated up on new search . Time delay is needed to wait the all elements created and renderd before doing quiryslection.
function activateModal() {
  // setTimeout(function() {
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
  // },delaytime);    
}
//activate modal function called upon page loading
//document.addEventListener('DOMContentLoaded', () => {
 // activateModal();
//});
// activateModal();
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
        modalFooterLink.setAttribute('href',newsObjectArray[i].link);
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

// function getNews(searchvar,categoryvar) {
//   var searchstring = 'q=' + searchvar;
//   var categorystring = "category=" + categoryvar + "&"
//   // var topheadlinesurl = "https://newsdata.io/api/1/news?apikey=pub_1711050ac401fa9680409c60adde4a8fbebd3&country=us&language=en&" +
//   var topheadlinesurl = "https://newsdata.io/api/1/news?apikey=pub_1711050ac401fa9680409c60adde4a8fbebd3&country=us&language=en&" +
//   categorystring +
//   searchstring ;
//   var req = new Request(topheadlinesurl);
//   fetch(req)
//   .then(function (response) {
//     return response.json();
//   })
//     .then(function (data) {
//       console.log(data.results);
//       renderNews(data.results);
//       activateModal();
//       read=document.querySelectorAll(".read-aloud");
//       addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
//       readAloud();
//       addTofavorite();
//   });
// }
function getNews(searchvar,categoryvar) {
  var savedNews2=localStorage.getItem("backupnews");
  const testValue=[{"title":"Rocket Companies CEO Jay Farner to retire June 1","description":"Jay Farner will be replaced on an interim basis by former Rocket Mortgage CEO William Emerson.       ","content":"Rocket Companies CEO Jay Farner will retire June 1 and be replaced on an interim basis by the mortgage lender's former chief executive, William Emerson, the publicly traded company announced Monday. Rocket's board of directors has begun a search for Farner's permanent replacement. Farner, 49, has worked at the Detroit-based mortgage company since 1996, and been CEO of Rocket Mortgage (then known as Quicken Loans) since 2017. He has been the CEO of Rocket Companies since it went public in August 2020. Rocket Companies is an umbrella for several Gilbert companies, the biggest being Rocket Mortgage. Farner's retirement comes during a downcycle in the U.S. mortgage business that has seen Rocket and other mortgage lenders and banks reduce headcount and book lower profits. Rocket Companies has yet to report its year-end earnings for 2022. For the third quarter of 2022, Rocket Companies lost bragging rights for being the top-producing mortgage company in the nation, based on origination volume, to Pontiac-based United Wholesale Mortgage. A Rocket Companies news release said Farner notified the board last Wednesday of his retirement plans and that he would immediately leave his position as vice chairman of Rocket's board. More: Flagstar Bank confirms layoffs, big restructuring in wake of merger More: Mat Ishbia on overtaking loan giant Rocket: 'I was confident this day would come' “For nearly three decades Jay has poured everything he has into making our organization successful,” Dan Gilbert, founder and chairman of Rocket Companies, said in a news release. “Jay has overseen the most rapid period of growth and profitability in our 37-year history.\" Emerson, 60, was CEO of Rocket Mortgage from 2002 until February 2017, when Farner took over. He currently is vice chairman of Rock Holdings, the company’s majority stockholder, and vice chairman of Gilbert's privately held real estate firm Bedrock. “We are fortunate to have someone of Bill’s caliber and experience to serve as Interim CEO while the Board conducts a search for a permanent successor,\" Gilbert said in a statement. “For a decade and a half, Bill served at the helm of our mortgage business — driving impressive results and setting the tone for our culture.\" In a statement, Farner called his time with the company one of the most rewarding experiences of his life. \"More than 27 years ago, fresh out of college, I decided to join a small mortgage company led by Dan Gilbert,\" Farner said. \"I never could have predicted the amazing journey that one decision would have taken me on, and I want to thank Dan for his mentorship, guidance and friendship over the years. Rocket Companies is full of incredible people — passionate about serving our clients, the community and each other. While the time is right for me to focus on my family, I will certainly miss working with some of the brightest minds in the fintech industry.” The CEO job has been financially been lucrative for Farner — especially in 2020. According to Rocket Companies corporate filings, he received $11.7 million in total compensation in 2019, $51.7 million in total compensation in 2020 (which included a $30.5 million cash bonus, plus over $15 million in stock options) and $1.6 million in total compensation in 2021. Rocket Companies shares closed up 6 cents Monday to $8.87. Contact JC Reindl: 313-222-6631 or jcreindl@freepress.com . Follow him on Twitter @ jcreindl .","link":"http://rssfeeds.freep.com/~/727238507/0/freep/home~Rocket-Companies-CEO-Jay-Farner-to-retire-June/"},{"title":"Whitmer celebrates new Ford battery plant in Michigan backed by state support valued over $1B","description":"Gov. Whitmer touted the announcement from Ford as a boon to help establish Michigan as a leader in electric vehicle manufacturing.       ","content":"ROMULUS − Democratic Gov. Gretchen Whitmer celebrated Monday Ford Motor Co.'s decision to create a new electric vehicle battery plant in Marshall expected to create 2,500 jobs after Michigan economic development officials approved an investment with an estimated value over $1 billion to land the facility. \"It's thrilling, it's thrilling,\" Whitmer told reporters following a Ford event at the Ford Ion Park. \"I can't imagine if this announcement was happening in another state how we’d all be feeling right now.\" While Ford considered locations around the world for the plant, one potential competitor for the deal took itself out of the running. Virginia GOP Gov. Glenn Youngkin rejected the potential deal , suggesting that it could pose a security threat because of the involvement of a Chinese company, Contemporary Amperex Technology Co. Ltd (CATL). Ford president and CEO Jim Farley said the company was teaming up with CATL — the world's largest battery maker — to quickly scale up its electric vehicle production. Ford executive chairman Bill Ford said that the company will \"help us get up to speed so that we can build these batteries ourselves.\" State investments in the project include a $210 million grant from the state's Strategic Outreach and Attractive Reserve fund to Ford. The SOAR fund has its origins in a major blow to Michigan's efforts to lead the transition to electric vehicles two years ago when Ford passed over Michigan to build new electric vehicle and battery plants in Kentucky and Tennessee . The fund has since doled out hundreds of millions in taxpayer-funded economic incentives to lure companies that vow to create jobs in Michigan. More: Ford reveals key details of 950-acre battery plant deal in Marshall More: GM tops the winners of the Super Bowl ads among automakers Economic development officials also approved a 15-year tax abatement for Ford with an estimated value of $772 million along with a $36 million loan for the Marshall Area Economic Development Alliance to be repaid using SOAR funds. CATL is not a government-owned enterprise, but some GOP lawmakers have expressed concerns about the use of taxpayer-funded incentives for the Marshall battery plant because of Ford's collaboration with a Chinese-owned company. State Rep. Andrew Fink, R-Hillsdale, raised such concerns, questioning the company's independence from the Chinese government. \"The Chinese government is not an entity that Americans can trust,\" he said. \"It's categorically different than other types of potential partnerships.\" Quentin Messer Jr., who heads the state's economic development agency, rejected the criticism. \"Any incentive dollar will be going to a 100% wholly-owned Ford subsidiary. Not a dime will go to a Chinese entity,\" he said. \"By this licensing of technology that Ford is doing, we are bringing this capability to the U.S.\" In addition to her efforts to land investments in Michigan's electric vehicle industry, Whitmer also wants to incentivize Michigan drivers to go electric. In her state budget recommendations she recently unveiled for the next fiscal year, Whitmer proposed a temporary sales tax cut for electric vehicle purchases. Under the proposal, those buying electric vehicles would see a tax cut on the first $40,000 of the purchase, saving up to $2,400 in taxes, according to the governor’s budget presentation . Clara Hendrickson fact-checks Michigan issues and politics as a corps member with Report for America, an initiative of The GroundTruth Project. Make a tax-deductible contribution to support her work at bit.ly/freepRFA . Contact her at chendrickson@freepress.com or 313-296-5743. Follow her on Twitter @clarajanehen .","link":"http://rssfeeds.freep.com/~/727261511/0/freep/home~Whitmer-celebrates-new-Ford-battery-plant-in-Michigan-backed-by-state-support-valued-over-B/"},{"title":"Former Michigan State basketball star Keith Appling pleads guilty to murder of relative","description":"Former Michigan State basketball player Keith Appling pleaded guilty to second-degree murder Monday in connection with a fatal shooting.       ","content":"Former Michigan State basketball player Keith Appling pleaded guilty to second-degree murder Monday, in connection with a fatal shooting that resulted in the death of his relative. Appling also pleaded guilty to a felony firearm charge in connection to the shooting and death of Clyde Edmonds, 66, in 2021 . As part of his plea deal, Appling agreed to a prison sentence of 18 to 40 years for the murder charge and another two consecutive years for the firearm charge. The other two counts of felony firearm that were brought against him are set to be dismissed during his sentence hearing on March 3. Appling, 31, was charged in June 2021 for the fatal shooting of Edmonds, whose wife is Appling's mother's first cousin, in May of that year. Appling's girlfriend, Natalie Bannister, was also charged as an accessory to the shooting and for lying to officers; she pleaded guilty to the lying charge in July 2022 and received 1.5 years of probation, and the accessory charge was dismissed. Attempts by the Free Press to reach Appling's attorney Monday afternoon were unsuccessful. More: Keith Appling's descent from NBA to murder suspect started with return to Detroit More: Mady Sissoko might be Michigan State's most important player. Look beyond the box score On May 22, 2021, Detroit police were dispatched to a home on Whitcomb Street at approximately 7:10 p.m. in response to a reported shooting, according to the Wayne County Prosecutor's Office. Officers found Edmonds on the front lawn of the home with multiple gunshot wounds, medics transported him to the hospital where he was pronounced dead. Authorities believe Appling and Edmonds had an argument that escalated to violence and Appling fired multiple times before fleeing the scene, it is also alleged that Bannister, 30, of Jackson, drove him away from the home and lied to officers investigating the shooting. At the time of Appling's charging in June 2021, Wayne County Prosecutor Kym Worthy said Appling had clearly been \"spiraling downward for some time.\" \"Many of those that tried to intervene with this defendant were hoping that he would get on the right track and stay there,\" she said in a statement. \"It is always tragic when one with so much promise, talent, and possibility is alleged to have committed the most serious of crimes.” Appling had all the markings of a star before his fall from grace. As a junior at MSU, Appling was the team's leading scorer but his college career ended on a sour note with a wrist injury that disrupted his professional prospects. He later played in the NBA G League, spent time with the Orlando Magic in 2016 and played professionally in Italy in 2019. In recent years, Appling's name has appeared in headlines less for his skills on the court and more for his run-ins with the law. Contact Miriam Marini: mmarini@freepress.com","link":"http://rssfeeds.freep.com/~/727255832/0/freep/home~Former-Michigan-State-basketball-star-Keith-Appling-pleads-guilty-to-murder-of-relative/"},{"title":"Richard Burton","description":"It is with great sadness that the family of Richard (Rick) Spencer Burton, announces his passing on Saturday, February 4, 2023. Rick was surrounded by his loving family, as they comforted him on his final journey.","content":"It is with great sadness that the family of Richard (Rick) Spencer Burton, announces his passing on Saturday, February 4, 2023. Rick was surrounded by his loving family, as they comforted him on his final journey. Rick was born in Calgary, Alberta, to his parents, Gerald and Shirley (nee Spencer) Burton. Shortly afterward, the family relocated to Marathon, Ontario, where he was raised, achieved his high-school education, and excelled in downhill skiing and swimming. Rick also enjoyed being in nature, while fishing and hunting with our family’s little chihuahua, Jumbo. He is remembered for his work in Policing, initially with the OPP and then Thunder Bay Police. He was an active member of the community, serving as a Board Trustee for the Lakehead District School Board and volunteering in his church. Rick was admired for his entertainment talent, where he used his ability to imitate (in conversation, mannerisms, and singing) a variety of well-known public figures, while he performed as Master of Ceremonies for many local events. His engaging personality and ready sense of humour allowed Rick to connect easily with everyone. He valued being a Dad, Grandparent, Brother and Uncle. Rick is forever cherished by his precious family: daughters, Jillian and Ashlee; granddaughter, Madison; grandson, Ethan; as well as sisters, Barbara, Beverlee, Bonnie, and their families. He was predeceased by his devoted parents. Rick will be missed by his Dad’s second wife, Erica, and treasured by his dear friends Jean Stillwell and Michael McNeil. The family is grateful to Pastor Al Piper, of Westfort Baptist Church, for his ongoing visits and calls with Rick over time, and prayers with the family on his final day. Rick’s Christian faith gave him real hope as he navigated some difficult times. Many thanks also to the Medical Staff who have cared for Rick over the span of his illness, at TBRHSC, Hogarth and St. Joe’s. A celebration of Richard’s life and burial service, will be announced at a future date. Donations in his honour, may be made to: First Response Mental Health, an organization providing digital mental health programs and resources for First Responders – info@firstresponsemh.ca Condolences may be submitted here: https://www.everestofthunderbay.com/book-of-memories/5137573/Burton-Mr-Richard/index.php Funeral arrangements assisted by Simpler Times Cremation Centre, 575 Central Avenue, Thunder Bay.","link":"https://www.tbnewswatch.com/obituaries/richard-burton-6536300"},{"title":"Michigan State releases description of suspect in reported shootings","description":"MSU police in a social media post about 10 p.m. said they are seeking a short male with a mask in connection with the reported shootings on campus.       ","content":"UPDATED 10:55 P.M. - One person is dead and five people have been transported to Sparrow Health System after a shooting at Michigan State University, the State Journal has confirmed. MSU spokeswoman Emily Guerrant told WILX TV-10 that one person was killed in the incident. Sparrow Health System spokesman John Foren confirmed that five people were transported to the hospital but conditions were not released. MSU police at 10:54 p.m. said there were still searching for a suspect and the shooting scene was active. Michigan State releases description of suspect in reported shootings UPDATED: 10:15 P.M. — MSU police in a social media post about 10 p.m. said they are seeking a short male with a mask in connection with the reported shootings on campus Monday night. The department added it was \"still receiving multiple calls of an active shooter on campus and that of 10:04 p.m. \"a person is actively shooting at the East Lansing campus.\" One body bag could be seen on the ground outside of the north side of MSU union on Grand River. Ben Finkelstein, a senior, said he was sheltering in place in his room at at 1855 Place. \"I don't think I've ever been this scared,\" he said. \"I've been listening to the police scanner for an hour.\" Finkelstein said he was hiding under a pile of dirty laundry in his first floor room. He closed all of his blinds and turned off his lights. \"It's far too late for this to be called a wake up call,\" he said. \"The sad truth is I doubt we're going to be the last. Other than that, I'm praying for everybody.\" A line of 10 ambulances was waiting outside the Broad Art Museum. Victims are currently being transported to Sparrow Hospital, university police said. They added that Brody Snyder/Phillips, Mason, Abbot, Landon and Berkey halls as well as the MSU Union have all been cleared or secured. East Lansing Public Schools canceled classes Tuesday. A group of people, including a State Journal reporter who had been attending a Board of Education meeting in the high school auditorium were ordered by East Lansing police to shelter inside the high school auditorium. UPDATED POST 9:40 P.M. - Michigan State University police said a second reported shooting occurred shortly after 9:25 p.m. at IM East in the 800 block of E. Shaw Lake on campus, about 50 minutes after a reported shooting took place at Berkey Hall in the 500 block of E. Circle Drive. The department said a lone shooting suspect is believed to be on the loose on campus; students and staff should continue to shelter in place. MSU’s campus was eerily quiet, the loudest sounds being the beeping of crosswalk sensors, a bell toning and the occasional siren as dozens of officers patrolled carrying long guns and red and blue lights lit up the area around MSU Union building at Abbot Road in East Lansing. MSU police order students, staff to shelter in place for shots fired report ORIGINAL POST 8:35 P.M. -- EAST LANSING — A suspect in a reported shooting on Michigan State University's campus is \"believed to be on foot right now,\" according to a post on social media about 9:16 p.m. by university police. In an alert sent shortly after 8:30 p.m., the university's police department alerts by text, email and phone that read\" \"MSU Police report shots fired incident occurring on or near the East Lansing campus. Secure-in-Place immediately. Run, Hide, Fight. In the most recent alert, police said students and staff should continue to shelter in place and that police are continuing to respond. \"Run means evacuate away from danger if you can do so safely, Hide means to secure-in-place, and Fight means protect yourself if no other option. Monitor alert.msu.edu for information.\" East Lansing and MSU police could not be immediately reached for comment. The city of East Lansing on Twitter posts that \"Shots have been fired on the MSU campus. The shooter is still at large. Police are active on the scene. Community members on and off campus should shelter in place immediately.\" The East Lansing High School auditorium, where a school board meeting was being held Monday night, was locked down and people were being prevented from leaving by East Lansing police. This is a developing story.","link":"http://rssfeeds.freep.com/~/727282178/0/freep/home~Michigan-State-releases-description-of-suspect-in-reported-shootings/"},{"title":"What we know about reported shooting at Michigan State","description":"Michigan State University students were told to run, hide, fight Monday evening after a report of shots fired on the school's East Lansing campus.       ","content":"Michigan State University students were told to run, hide, fight Monday evening after a report of shots fired on the school's East Lansing campus. The school sent an alert at 8:31 p.m. and later said there were reports of injuries. Here's what we know: This is a breaking news report and will be updated. The first report is tied to an academic building The incident was reported to have occurred at 8:18 p.m. inside Berkey Hall, according to a news release from the school. The location is an academic building several buildings east of the MSU Union on East Grand River Avenue. The university warned of an active shooter in the release, saying the suspect was still at large and believed to be on foot. Those on campus and nearby were told to shelter in place and secure the room they were in. Another reported shooting took place at a fitness center A shooting was also reported at a recreation and fitness center known as IM East, MSU police said in a tweet shortly before 9:30 p.m. Multiple injuries were reported with that shooting, police said at the time. Minutes later police stated the building was being secured and that there appeared to only be one suspect. The location is a more than a 25-minute walk southeast of the union on MSU's campus. Police released a description of a suspect about 10 p.m. The suspect is a short male with a mask, police said in a Tweet about 10 p.m. Police asked the community to continue to shelter in place in the Tweet and said they were still recieving reports of an active shooter. Are there injuries, and how many? Confirmed details on injuries were not immediately available but MSU police have said there are victims. Victims were being transported to Sparrow Hospital, MSU police said in a Tweet about 10:10 p.m. Officials reports that Brody Hall, Snyder-Phillips Hall, Mason Hall, Abbot Hall, Landon Hall the MSU Union and Berkey Hall had all been “cleared/secured” at that time. All activities are canceled Officials are asking everyone to stay away from campus on Tuesday, Feb. 14. \"All campus activities are canceled for 48 hours, including athletics, classes, and all campus-related activities,\" MSU police said in a Tweet. When will we learn more? A press briefing is scheduled for 11 p.m. Monday, Feb. 13 at the Henry Center for Executive Development in Lansing. Parents say their daughter escaped through a window Outside Berkey Hall after 9 p.m., Mike and Natalie Papoulias said they sped in their vehicle to the MSU campus from Jackson after receiving a call from their daughter. She reported being in class in Berkey Hall when and hearing gunshots. She told them some students busted out a window and she jumped out, they believe, from the first-floor room. Their daughter, who they said is a sophomore studying psychology, made it back to her residence hall and was in lockdown later Monday night. They hadn't seen her, but they were texting each other. - Paul Egan, Darcie Moran 'I began to run': MSU student recalls fear amid active shooter report Mataya Newbern, 18, a freshman sociology student, said she was eating dinner in the Akers Hall dining area when the incident began. Akers is on the far east side of campus. \"I heard people screaming, 'They're shooting! They're shooting!' That's when I began to run,\" Newbern said. \"It's terrifying.\" She was out walking on campus about 10 p.m., trying to get back to her residence hall and to check on her friends. -Paul Egan, Darcie Moran Gov. Gretchen Whitmer has been briefed on MSU situation Gov. Gretchen Whitmer had been briefed on the situation, she said in a Tweet Monday night. She asked that arms be wrapped around the Spartan community.","link":"http://rssfeeds.freep.com/~/727287458/0/freep/home~What-we-know-about-reported-shooting-at-Michigan-State/"},{"title":"New Mexico State suspends men's basketball program over hazing allegations","description":"New Mexico State University has shut down its men's basketball program for the remainder of the season, following hazing allegations against multiple players on the team. Will Webber, sports editor at the Santa Fe New Mexican, joins CBS News for more.","content":"New Mexico State suspends men's basketball program over hazing allegations New Mexico State University has shut down its men's basketball program for the remainder of the season, following hazing allegations against multiple players on the team. Will Webber, sports editor at the Santa Fe New Mexican, joins CBS News for more.","link":"https://www.cbsnews.com/video/new-mexico-state-basketball-program-suspended-over-hazing-allegations/"},{"title":"Tampa has worst inflation in US, 2.5% higher than national","description":"While inflation is down nationally, it's not down quite as much in the Tampa area. Instead, Tampa has the worst inflation in the U.S., according to WalletHub.","content":"TAMPA, Fla. (WFLA) — While inflation is down nationally, it's not down quite as much in the Tampa area. According to the new inflation reports published by the U.S. Bureau of Labor Statistics, while the national inflation rate fell to 6.4%, Tampa is still above at 8.9%. While the national inflation rate rose a reported 0.5% year over year in January, in Tampa, it rose 1.7%, more than three times higher than the rest of the country. Floridians are among most likely to fall prey to Valentine’s Day ‘scams’ Still, both stats are lower than the previous measures. Tampa's inflation rate was 9.6% in November 2022, while the national rate at that time was 7.1%. Despite the drop in inflation rates, Tampa is still seeing food costs as one of the largest price increases for families to face. Tampa's \"food index rose 1.3% from November to January, reflecting increases in the food at home (+1.4%) and food away from home (+1.1%) indexes,\" according to BLS. \"Four of the six major grocery store food group indexes increased over the bi-monthly period, most notable, the index for meats, poultry, fish and eggs.\" Energy costs for electricity in Tampa were also up 14.8% over the past year, while food costs were up 8.5%. To buy a Tampa home, you’ll need to earn at least $113,000 By comparison, the national inflation report, food costs were up 0.5% in the past month, and up 10.1% year-over-year. Energy costs across the U.S. were up a comparative 8.7% to Tampa's 14.8%, according to the bureau. The biggest drive of inflation in the U.S., according to BLS, was the cost of shelter. Food and energy, while still contributing, particularly cost of gasoline at the pump, were lower relative to housing. \"The index for shelter was by far the largest contributor to the monthly all items increase, accounting for nearly half of the monthly all items increase,\" BLS said. Despite the higher rate, Tampa isn't in a league all on its own, when it comes to inflation. Finance site WalletHub reported that Tampa's one of nearly two dozen cities and metro areas with big inflation levels. When it comes to overall rank, though, Tampa is No. 1 for places where inflation is rising the most. Rent growth slowing nationally, but Tampa rent rising faster than US It's not even alone, when it comes to Florida areas in the list. While Tampa's ranked at No. 1, Miami is No. 2, and Here's WalletHub's ranking of fastest inflation in the nation. RankMetroCPI Change (2-months)CPI Change (Month vs Year)1Tampa-St. Petersburg-Clearwater, Fla.1.70%8.90%2Miami-Fort Lauderdale-West Palm Beach, Fla.1.00%9.90%3Riverside-San Bernardino-Ontario, Calif.1.30%7.30%4San Diego-Carlsbad, Calif.1.80%6.40%5Dallas-Fort Worth-Arlington, Texas0.80%7.50%6Seattle-Tacoma-Bellevue, Wash.0.10%8.40%7Phoenix-Mesa-Scottsdale, Ariz.-0.70%9.50%8Boston-Cambridge-Newton, Mass.-N.H.1.10%6.40%9Los Angeles-Long Beach-Anaheim, Calif.1.30%5.80%10Denver-Aurora-Lakewood, Colo.0.90%6.40%11New York-Newark-Jersey City, N.Y.-N.J.-Pa.1.00%6.00%12Atlanta-Sandy Springs-Roswell, Ga.-0.50%8.10%13St. Louis, Mo.-Ill.0.10%6.20%14Baltimore-Columbia-Towson, Md.-0.10%6.30%15Minneapolis-St.Paul-Bloomington, Minn.-Wis.0.50%5.10%16Philadelphia-Camden-Wilmington, Pa.-N.J.-Del.-Md.-0.40%6.40%17Urban Honolulu, Hawaii0.30%5.20%18Chicago-Naperville-Elgin, Ill.-Ind.-Wis.0.00%5.40%19Detroit-Warren-Dearborn, Mich.-1.00%6.20%20San Francisco-Oakland-Hayward, Calif.-0.30%4.90%21Washington-Arlington-Alexandria, D.C.-Va.-Md.-W.V.-0.30%4.40%22Houston-The Woodlands-Sugar Land, Texas-1.50%5.30%23Anchorage, Alaska-1.70%5.40%(Source: WalletHub)","link":"https://www.wfla.com/news/hillsborough-county/tampa-has-worst-inflation-in-us-2-5-higher-than-national/"},{"title":"Seeking answers after deadly shooting at Michigan State University","description":"Investigators are searching for a motive and more information about the gunman after a mass shooting on the Michigan State University campus in East Lansing. At least three students were killed, and five people are in critical condition. CBS News Chicago reporter Charlie De Mar has the latest from the scene.","content":"Seeking answers after deadly shooting at Michigan State University Investigators are searching for a motive and more information about the gunman after a mass shooting on the Michigan State University campus in East Lansing. At least three students were killed, and five people are in critical condition. CBS News Chicago reporter Charlie De Mar has the latest from the scene.","link":"https://www.cbsnews.com/video/michigan-state-university-shooting-east-lansing-victims-suspect-investigation/"}]
  
   //var offlineNews=JSON.parse(savedNews2);
   //var offlineNews=JSON.parse(testValue);
   offlineNews=testValue;
   console.log(offlineNews);
   setTimeout(() => {
   renderNews(offlineNews);
   activateModal();
   read=document.querySelectorAll(".read-aloud");
   addToFavoriteBtns=document.querySelectorAll('.addFavoriteBtn');
   readAloud();
   addTofavorite();
   }, delaytime);
}

getNews(searchinput,category);


// needs a string input (data.results[i].content) to take the content of article and break it into 4 parts 
function splitArticle(articlestring) {
  
  var sentences = articlestring.split(".");
  var sentencesL = sentences.length

  var partSize = Math.floor(sentencesL / 4);
  var part1 = sentences.slice(0, partSize);
  var part2 = sentences.slice(partSize, partSize * 2);
  var part3 = sentences.slice(partSize * 2, partSize * 3);
  var part4 = sentences.slice(partSize * 3);

  var contentParts = [
    part1.join(""), // concatenate part 1 into a single string
    part2.join(""), // concatenate part 2 into a single string
    part3.join(""), // concatenate part 3 into a single string
    part4.join(""), // concatenate part 4 into a single string
  ];

  console.log(contentParts);

}

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
      
       // console.log(newsAudio);
      }
    }, 1000)

    
    //listen to click event of all read aloud (play buttons and read dicreption and content of the news located in the parent-parent canrd of the cleckd buttons. Buttons are porgrammend to be used as togle switchs play/pouse.
    for (let i = 0; i < read.length; i++) {
      
      read[i].addEventListener("click", ()=>{
          
        var newsDescription=read[i].parentElement.parentElement.children[1].children[0].textContent.trim()+"    ";
        //var newsContent=read[i].parentElement.parentElement.children[2].children[0].textContent.trim();
        var newsContent="";
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
            read[i].textContent = "Pause";
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

          read[i].textContent = "Pause";
        }
      });

    }

}
//=================================end of read aloud function============================================================================
//=================================time delay to wait for element to render before selecting elements to listen to events===================================
// setTimeout(function() {
//   read=document.querySelectorAll(".read-aloud");
//   console.log(read);
//   readAloud();
//  }, delaytime)

//add event listener to searchBtn and runs function when clicked
document.getElementById("searchForm").addEventListener("submit", function (event) {
  console.log(document.getElementById("searchString").value);
  console.log(document.getElementById("selectCat").value);
   event.preventDefault();
  searchinput = document.getElementById("searchString").value
  category = document.getElementById("selectCat").value
  
  getNews(searchinput, category);
  // setTimeout(function() {
  //   read=document.querySelectorAll(".read-aloud");
  //   console.log(read);
  //   readAloud();
  //  }, 2000)
  // activateModal();
});

// Function to split titles to shorter titles in favorites tab
function splitTitle(articletitle) {
  var titlesplit = articletitle.split(" ");
  var titlelength = titlesplit.length ;
  var titlename = "";
  if (titlelength > 3  ) {
    titlesplit = [titlesplit[0], titlesplit[1], titlesplit[2], "..." ];
      titlesplit = titlesplit.join(" ");
  } else {
      titlesplit = titlesplit.join(" ")
  }
  return titlesplit;
}

// Function to render favorites to page under Favorites tab
function renderFavorites() {
  var favoriteContainerDiv = document.querySelector('.favorite');
  favoriteContainerDiv.innerHTML = "";
  var savedFavs = localStorage.getItem("savedNews");
  var parsedFavs = JSON.parse(savedFavs);

  for (let i = 0; i < parsedFavs.length; i++) {
    var favoriteLinkDiv = document.createElement('a');
      favoriteLinkDiv.classList.add('favoriteLinks');

      var favoriteDelBtn = document.createElement('button');
      favoriteDelBtn.classList.add('delBtn');
      favoriteDelBtn.textContent = '-';
      favoriteLinkDiv.append(favoriteDelBtn);
      
      favoriteLinkDiv.textContent = splitTitle(parsedFavs[i].title);
      favoriteContainerDiv.append(favoriteLinkDiv);
      
      console.log(parsedFavs[i].title)
      console.log('Rendered!')
  }
}

//this function will listen to all add to favorite buttons and save the news object from the card wher the button belongs to.
function addTofavorite () {
  // setTimeout(() => {
    var savedFavorite=[];
     
    if (JSON.parse(localStorage.getItem('savedNews'))) {
      savedFavorite=JSON.parse(localStorage.getItem('savedNews'));
      console.log(savedFavorite,"1");
    }
    var newsObject={
      title:"",
      description:"",
      content:"",
      link:""
    }
    for (let i = 0; i < addToFavoriteBtns.length; i++) {
      addToFavoriteBtns[i].addEventListener('click', ()=>{
        newsObject.title=addToFavoriteBtns[i].parentElement.parentElement.children[0].children[0].textContent;
        newsObject.description=addToFavoriteBtns[i].parentElement.parentElement.children[1].children[0].textContent;
        newsObject.content=addToFavoriteBtns[i].parentElement.parentElement.children[2].children[0].textContent;
        newsObject.link=addToFavoriteBtns[i].parentElement.children[1].getAttribute('href');
        var newsIsInstorage=0;
        for (let j = 0; j < savedFavorite.length; j++) {
          if (JSON.stringify(savedFavorite[j])===JSON.stringify(newsObject)) {
            newsIsInstorage=1;
            console.log(newsIsInstorage,"instorage")
             console.log(newsObject);
          }
        }
        if (newsIsInstorage===0) {
          savedFavorite.push(newsObject);
          localStorage.setItem("savedNews",JSON.stringify(savedFavorite));
        console.log("news saved")
        }
        console.log(savedFavorite,"2");
      })
    }
    console.log("I am clicked)")
  // }, delaytime);
  renderFavorites();
}

//Add event listner to clear favorite button which will cleare lcal storage and call render favorite function to cleare it from the page.

