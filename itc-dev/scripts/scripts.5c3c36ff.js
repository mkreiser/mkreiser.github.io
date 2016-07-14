"use strict";angular.module("itcFrontendApp",["angulartics","angulartics.google.analytics","ngAnimate","ngCookies","ngMaterial","ngResource","ngRoute","ngSanitize"]).config(["$mdThemingProvider",function(a){var b=a.extendPalette("orange",{contrastDefaultColor:"light"});a.definePalette("orange",b),a.theme("default").primaryPalette("orange")}]),angular.module("itcFrontendApp").filter("orderObjectBy",function(){return function(a,b,c){var d=[];return angular.forEach(a,function(a){d.push(a)}),d.sort(function(a,c){return a[b]>c[b]?1:-1}),c&&d.reverse(),d}}),angular.module("itcFrontendApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/news",{templateUrl:"views/news.html",controller:"NewsCtrl"}).when("/races",{templateUrl:"views/races.html",controller:"RacesCtrl"}).when("/clubrelays",{templateUrl:"views/clubrelays.html",controller:"ClubRelaysCtrl"}).when("/results",{templateUrl:"views/results.html",controller:"ResultsCtrl"}).when("/prospective_members",{templateUrl:"views/prospective_members.html",controller:"ProspectiveMembersCtrl"}).when("/current_members/board_minutes",{templateUrl:"views/current_members/board_minutes.html",controller:"BoardMinutesCtrl"}).when("/current_members/training_resources",{templateUrl:"views/current_members/training_resources.html",controller:"TrainingResourcesCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("itcFrontendApp").controller("ClubRelaysCtrl",function(){}),angular.module("itcFrontendApp").controller("ContactCtrl",["$scope","$window",function(a,b){a.emailCoach=function(a){b.open("mailto:"+a)},a.xcCoaches=[{name:"Michael Fritner",position:"President",email:"illinoisxcclub+president@gmail.com",image:null},{name:"Ryan Somerfield",position:"Head Coach",email:"illinoisxcclub+coach@gmail.com",image:null},{name:"Emma Burkhardt",position:"Gender Minority Captain",email:"illinoisxcclub+genderminority@gmail.com",image:null},{name:"Mariela Marquez",position:"Treasurer",email:"illinoisxcclub+treasurer@gmail.com",image:null},{name:"Arturo Woodward-Montes",position:"Secretary",email:"illinoisxcclub+secretary@gmail.com",image:null},{name:"Megan Fritner",position:"Social & Fundraising Chair",email:"illinoisxcclub+social@gmail.com",image:null},{name:"Sean Bruyere",position:"Home Meet Coordinator",email:"illinoisxcclub+meetcoord@gmail.com",image:null},{name:"Jared Ripoli",position:"Travel Coordinator",email:"illinoisxcclub+travel@gmail.com",image:null},{name:"Chris Kennedy",position:"Webmaster",email:"illinoisxcclub+webmaster@gmail.com",image:null}],a.tfCoaches=[{name:"Michael Fritner",position:"President",email:"illinoistfclub+president@gmail.com",image:null},{name:"Jared Ripoli",position:"Head Coach",email:"illinoistfclub+coach@gmail.com",image:null},{name:"Andy Briggs",position:"Treasurer",email:"illinoistfclub+treasurer@gmail.com",image:null},{name:"Anneliese Schultz",position:"Secretary",email:"illinoistfclub+secretary@gmail.com",image:null},{name:"Emily Foley",position:"Social & Fundraising Chair",email:"illinoistfclub+social@gmail.com",image:null},{name:"Sean Bruyere",position:"Home Meet Coordinator",email:"illinoistfclub+meetcoord@gmail.com",iamge:null},{name:"Mateusz Lopez",position:"Travel Coordinator",email:"illinoistfclub+travel@gmail.com",image:null},{name:"Tyler Splitt",position:"Webmaster",email:"illinoistfclub+webmaster@gmail.com",image:null},{name:"Mike Kreiser",position:"Sprints Coach",email:"mkreise2@illinois.edu",image:null},{name:"Tyler Splitt",position:"Mid-D Coach",email:"",image:null},{name:"Ryan Somerfield",position:"Distance & Steeplechase Coach",email:"",image:null},{name:"Mateusz Lopez",position:"Jumps Coach",email:"",image:null},{name:"Abby Ralph",position:"Hurdles Coach",email:"",image:null},{name:"Ali Djokic ",position:"Throws Coach",email:"",image:null}]}]),angular.module("itcFrontendApp").controller("HomeCtrl",function(){}),angular.module("itcFrontendApp").controller("NewsCtrl",function(){}),angular.module("itcFrontendApp").controller("ProspectiveMembersCtrl",["$mdDialog","$scope",function(a,b){b.openEmailSurvey=function(){a.show({templateUrl:"views/dialogs/emailSurvey.html",clickOutsideToClose:!1,fullscreen:!0,scope:b})},b.submitSurvey=function(){a.show(a.alert({clickOutsideToClose:!0,title:"Thank You!",textContent:"You will be added to our email list shortly",ok:"Continue"}))},b.cancelSurvey=function(){a.cancel()}}]),angular.module("itcFrontendApp").controller("RacesCtrl",["$scope",function(a){a.indoorMeets=[{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"},{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"},{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"},{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"},{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"},{event:"Sample Meet",date:"January 20, 2017",location:"Champaign, IL"}]}]),angular.module("itcFrontendApp").controller("ResultsCtrl",["Api","$http","$q","$scope",function(a,b,c,d){var e=function(a){a.sort(function(a,b){return new Date(b.date).getTime()-new Date(a.date).getTime()}),a.reverse()},f=function(a,b){angular.forEach(b,function(b){var c=new Date(b.date).getFullYear();a[c]?a[c].push(b):a[c]=[b]})},g=function(b,c){a.getAllMeetsBy("season="+b).then(function(a){var b=a.data,g={};e(b),f(g,b),d[c]=g})};g("XC","crossCountryMeets"),g("Indoor","indoorMeets"),g("Outdoor","outdoorMeets"),d.loadAthletes=function(){var b=c.defer();return a.getAllAthletesBy("search="+d.athleteText).then(function(a){b.resolve(a.data)}),b.promise}}]),angular.module("itcFrontendApp").controller("BoardMinutesCtrl",function(){}),angular.module("itcFrontendApp").controller("TrainingResourcesCtrl",function(){}),angular.module("itcFrontendApp").service("Api",["$http",function(a){var b="http://illinoistrackclub.herokuapp.com/";this.getAllAthletes=function(){return a.get(b+"athletes/")},this.getAllAthletesBy=function(c){return a.get(b+"athletes/?"+c)},this.getAthlete=function(c){return a.get(b+"athletes/getAthlete/"+c+"/")},this.getAllEvents=function(){return a.get(b+"events/")},this.getEvent=function(c){return a.get(b+"events/getEvent/"+c+"/")},this.getAllMeets=function(){return a.get(b+"meets/")},this.getAllMeetsBy=function(c){return a.get(b+"meets/?"+c)},this.getMeet=function(c){return a.get(b+"meets/getMeet/"+c+"/")},this.getAllResults=function(){return a.get(b+"results/")},this.getResult=function(c){return a.get(b+"results/getResult/"+c+"/")}}]),angular.module("itcFrontendApp").run(["$templateCache",function(a){a.put("views/clubrelays.html",'<div class="clubrelays-page-container"> <div class="centered-content padded-content"> <div class="title-container"> <span class="page-title">Club Relays</span> </div> <div class="page-content extra-vertical-space"> <div class="md-headline">Event Info</div> <div>Please contact Sean Bruyere, meet coordinator, at <a class="link" href="mailto:sbruyer2@illinois.edu">sbruyer2@illinois.edu</a> or at <a class="link" href="illinoistfclub+meetcoord@gmail.com">illinoistfclub+meetcoord@gmail.com</a></div> <div class="md-headline extra-vertical-space">Cost</div> <div>$10 per individual event and $20 per relay team (team cap at $200)</div> <div>Payment is due the day of the meet. Please make checks payable to Illinois Track and Field Club.</div> <div class="md-headline extra-vertical-space">Facility</div> <div>The meet will be held at the University of Illinois Armory, a 200 meter indoor track. Spikes are permitted. Batons and starting blocks will be provided. Parking will be available at Huff Hall (directly south of the Armory).</div> <div class="md-headline extra-vertical-space">Events</div> <div>Running events begin at <span class="emphasis">10 AM</span> and are on a <span class="emphasis">rolling schedule</span>.</div> <div>Field events begin at <span class="emphasis">10 AM</span>.</div> <br> <div>Running Events:</div> <div>60m Hurdles</div> <div>60m Dash</div> <div>4x800m Relay</div> <div>4x200m Relay</div> <div>3000m Run</div> <div>1600m Sprint Medley Relay</div> <div>1 Mile Run</div> <div>4x400m Relay</div> <br> <div>Field Events:</div> <br> <div>High Jump</div> <div>Long Jump</div> <div>Triple Jump</div> <div>Shot Put</div> <div class="md-headline extra-vertical-space">Scoring</div> <div>Relay events are scored 10-8-6-5-4-3-2-1, with only one relay team per school per event scoring You may enter as many relay teams as you like. Individual events are scored as two person relays, with the top two marks from each team added together to determine the team score (except for mile, in which case the top four marks are added together). You do not have to declare your scorers in advance.</div> <br> <div>Relay teams must be single-sex.</div> <iframe class="map-container" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.6593359239164!2d-88.23448238432506!3d40.10530768244393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb21d56f2b951978!2sArmory+Building!5e0!3m2!1sen!2sus!4v1467160365267" frameborder="0" style="border:0" allowfullscreen></iframe> </div> </div> </div>'),a.put("views/contact.html",'<div class="contact-page-container"> <div class="centered-content padded-content"> <div class="title-container"> <span class="page-title">Contact</span> </div> <div class="page-content"> <div class="md-headline">Cross Country Board &amp; Coaches</div> <md-card class="coach-card" ng-repeat="coach in xcCoaches"> <md-card-title> <md-card-title-text> <span class="md-headline">{{coach.name}}</span> <span class="md-subhead">{{coach.position}}</span> </md-card-title-text> <md-card-title-media> <div class="md-media-md card-media"> <img src="{{coach.image}}"> </div> </md-card-title-media> </md-card-title> <md-card-actions layout="row" layout-align="end center"> <md-button ng-click="emailCoach(coach.email)">Email</md-button> </md-card-actions> </md-card> <div class="md-headline second-title">Track and Field Board &amp; Coaches</div> <md-card class="coach-card" ng-repeat="coach in tfCoaches"> <md-card-title> <md-card-title-text> <span class="md-headline">{{coach.name}}</span> <span class="md-subhead">{{coach.position}}</span> </md-card-title-text> <md-card-title-media> <div class="md-media-md card-media"> <img src="{{coach.image}}"> </div> </md-card-title-media> </md-card-title> <md-card-actions layout="row" layout-align="end center"> <md-button ng-click="emailCoach(coach.email)">Email</md-button> </md-card-actions> </md-card> </div> </div> </div>'),a.put("views/current_members/board_minutes.html","<div>board minutes</div>"),a.put("views/current_members/training_resources.html","<div>training resources</div>"),a.put("views/dialogs/emailSurvey.html",'<md-dialog> <form> <md-toolbar> <div class="md-toolbar-tools"> <h1>Mailing List Survey</h1> </div> </md-toolbar> <md-dialog-content class="md-dialog-content"> <md-input-container> <label>Name</label> <input ng-model="survey.name"> </md-input-container> <md-input-container> <label>Email</label> <input ng-model="survey.email"> </md-input-container> <md-input-container> <label>Year in School</label> <input ng-model="survey.year"> </md-input-container> <md-input-container> <label>Additional Comments</label> <input ng-model="survey.comments"> </md-input-container> </md-dialog-content> <md-dialog-actions layout="row"> <span flex></span> <md-button ng-click="cancelSurvey()" class="md-warn">Cancel</md-button> <md-button ng-click="submitSurvey()" class="md-primary">Submit</md-button> </md-dialog-actions> </form> </md-dialog>'),a.put("views/home.html",'<div class="home-page-container"> <div class="image-slider-container">sliding image scroller here</div> <div class="social-bar-container" layout="row" layout-align="center center"> <a class="social-bar facebook-bar" href="https://www.facebook.com/illinoisxctrackclub/"><i class="ion-social-facebook"></i></a> <a class="social-bar twitter-bar" href="https://twitter.com/IlliniTrackClub"><i class="ion-social-twitter"></i></a> <a class="social-bar instagram-bar" href=""><i class="ion-social-instagram-outline"></i></a> <a class="social-bar youtube-bar" href="https://www.youtube.com/channel/UCcZRTX-FYPADoTpgc1jAcow"><i class="ion-social-youtube"></i></a> </div> <div class="centered-content padded-content"> <div class="about-title">About Us</div> <div class="about-text">The University of Illinois Cross Country and Track Clubs are competitive coeducational collegiate running teams that compete at NCAA and NIRCA (National Intercollegiate Running Club Association) competitions during both cross country (fall) and track (spring) seasons. Our members are graduate and undergraduate students at the University of Illinois and include everyone from beginning runners to All-State and All-American athletes.</div> <div class="about-text">We are one of the foremost clubs in NIRCA, and travel all over the Midwest to compete at NCAA meets and NIRCA meets for both track and cross country.</div> <div class="about-text">If you are interested or if you have any questions please do not hesitate to contact us or visit our prospective members page. Thank you and we hope to see you out competing with us soon! We generally meet daily at 4:15 at the west entrance of the Armory at 4th and Gregory during the school year.</div> </div> </div>'),a.put("views/news.html",'<div class="news-page-container"> <div class="centered-content padded-content"> <div class="title-container"> <span class="page-title">News</span> <md-input-container class="news-year-selector"> <label>Filter By Year</label> <md-select ng-model="selectedYear"> <md-option value="2016">2016</md-option> <md-option value="2015">2015</md-option> <md-option value="2014">2014</md-option> <md-option value="2013">2013</md-option> </md-select> </md-input-container> </div> <div class="post-container"> <div class="post"> <div class="post-title">Something About How Great Our Team Is</div> <div class="post-metadata"> <span class="post-author">Post Author</span> - <span class="post-date">1/1/2016 11:11:11</span> </div> <div class="post-content"> <p>hjkahsdfasdf</p> <p>ajfskldfjkasdhfjlaksdf</p> </div> </div> </div> </div> </div>'),a.put("views/prospective_members.html",'<div class="prospective-members-page-container"> <div class="centered-content padded-content"> <div class="title-container"> <span class="page-title">Prospective Members</span> </div> <div class="page-content extra-vertical-space"> <div>Whether you are a senior in High School planning on enrolling at U of I, already attend U of I, are an elite athlete, or a total beginner, ITC/IXC strives to be a welcoming community for you. Please join our mailing list, and read more for more information!</div> <div class="mailing-list extra-vertical-space"><md-button class="md-raised md-primary mailing-list-button" ng-click="openEmailSurvey()">Join our Mailing List</md-button></div> <div class="md-headline faq-title">FAQ</div> <div class="faq-question">Who are we?</div> <div class="faq-answer">The Illinois Cross Country and Track and Field Club is an Registered Student Organizations at the University of Illinois. Club members are competitive and focused on improving in their respective events.</div> </div> </div> </div>'),a.put("views/races.html",'<div class="races-page-container"> <div class="centered-content padded-content"> <div class="title-container"> <div class="page-title">Race Schedule</div> </div> <div class="page-content"> <div class="md-headline">2016 Cross Country Season</div> <div class="three-column-table"> <div class="header row md-body-2"> <div class="first-column">Meet</div> <div class="second-column">Date</div> <div class="third-column">Location</div> </div> <md-divider></md-divider> <div class="row md-body-1" ng-repeat="meet in indoorMeets"> <div class="first-column">{{meet.event}}</div> <div class="second-column">{{meet.date}}</div> <div class="third-column">{{meet.location}}</div> </div> </div> <div class="md-headline extra-vertical-space">2017 Indoor Season</div> <div class="three-column-table"> <div class="header row md-body-2"> <div class="first-column">Meet</div> <div class="second-column">Date</div> <div class="third-column">Location</div> </div> <md-divider></md-divider> <div class="row md-body-1" ng-repeat="meet in indoorMeets"> <div class="first-column">{{meet.event}}</div> <div class="second-column">{{meet.date}}</div> <div class="third-column">{{meet.location}}</div> </div> </div> <div class="md-headline extra-vertical-space">2017 Outdoor Season</div> <div class="three-column-table"> <div class="header row md-body-2"> <div class="first-column">Meet</div> <div class="second-column">Date</div> <div class="third-column">Location</div> </div> <md-divider></md-divider> <div class="row md-body-1" ng-repeat="meet in indoorMeets"> <div class="first-column">{{meet.event}}</div> <div class="second-column">{{meet.date}}</div> <div class="third-column">{{meet.location}}</div> </div> </div> </div> </div> </div>'),a.put("views/results.html",'<div class="results-page-container"> <div class="centered-content padded-content"> <md-tabs class="tabs" md-dynamic-height> <md-tab label="Records"> <div class="md-headline extra-vertical-space">Cross Country</div> <div class="three-column-table record-table"> <div class="header row md-body-2"> <div class="first-column">Men</div> <div class="second-column">Event</div> <div class="third-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">20:25.26</span></div> <div class="second-column">5000m Run</div> <div class="third-column"><span class="record-time">20:25.26</span> Other Person</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">20:25.26</span></div> <div class="second-column">6000m Run</div> <div class="third-column"><span class="record-time">20:25.26</span> Other Person</div> </div> <md-divider></md-divider> </div> <div class="md-headline extra-vertical-space">Indoor Track</div> <div class="three-column-table record-table"> <div class="header row md-body-2"> <div class="first-column">Men</div> <div class="second-column">Event</div> <div class="third-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">6.90</span></div> <div class="second-column">60m Run</div> <div class="third-column"><span class="record-time">8.00</span> Other Person</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">17.38</span></div> <div class="second-column">200m Run</div> <div class="third-column"><span class="record-time">20.02</span> Other Person</div> </div> <md-divider></md-divider> </div> <div class="md-headline extra-vertical-space">Outdoor Track</div> <div class="three-column-table record-table"> <div class="header row md-body-2"> <div class="first-column">Men</div> <div class="second-column">Event</div> <div class="third-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">8.90</span></div> <div class="second-column">100m Run</div> <div class="third-column"><span class="record-time">10.00</span> Other Person</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="first-column">Mike Kreiser <span class="record-time">17.38</span></div> <div class="second-column">200m Run</div> <div class="third-column"><span class="record-time">20.02</span> Other Person</div> </div> <md-divider></md-divider> </div> </md-tab> <md-tab label="Top Performances"> <md-tabs class="tabs" md-dynamic-height> <md-tab label="Cross Country"> <div class="two-column-table performance-table extra-vertical-space"> <div class="row md-body-2">5000m Run</div> <md-divider></md-divider> <div class="header row md-body-2"> <div class="left-column">Men</div> <div class="right-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">20:20.20</span></div> <div class="right-column">Other Person <span class="performance">20:20.20</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">20:20.20</span></div> <div class="right-column">Other Person <span class="performance">20:20.20</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">20:20.20</span></div> <div class="right-column">Other Person <span class="performance">20:20.20</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">20:20.20</span></div> <div class="right-column">Other Person <span class="performance">20:20.20</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">20:20.20</span></div> <div class="right-column">Other Person <span class="performance">20:20.20</span></div> </div> <md-divider></md-divider> </div> </md-tab> <md-tab label="Indoor Track"> <div class="two-column-table performance-table extra-vertical-space"> <div class="row md-body-2">60m Dash</div> <md-divider></md-divider> <div class="header row md-body-2"> <div class="left-column">Men</div> <div class="right-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">6.90</span></div> <div class="right-column">Other Person <span class="performance">6.90</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">6.90</span></div> <div class="right-column">Other Person <span class="performance">6.90</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">6.90</span></div> <div class="right-column">Other Person <span class="performance">6.90</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">6.90</span></div> <div class="right-column">Other Person <span class="performance">6.90</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">6.90</span></div> <div class="right-column">Other Person <span class="performance">6.90</span></div> </div> <md-divider></md-divider> </div> </md-tab> <md-tab label="Outdoor Track"> <div class="two-column-table performance-table extra-vertical-space"> <div class="row md-body-2">100m Run</div> <md-divider></md-divider> <div class="header row md-body-2"> <div class="left-column">Men</div> <div class="right-column">Women</div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">10.10</span></div> <div class="right-column">Other Person <span class="performance">10.10</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">10.10</span></div> <div class="right-column">Other Person <span class="performance">10.10</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">10.10</span></div> <div class="right-column">Other Person <span class="performance">10.10</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">10.10</span></div> <div class="right-column">Other Person <span class="performance">10.10</span></div> </div> <md-divider></md-divider> <div class="row md-body-1"> <div class="left-column">Mike Kreiser <span class="performance">10.10</span></div> <div class="right-column">Other Person <span class="performance">10.10</span></div> </div> <md-divider></md-divider> </div> </md-tab> </md-tabs> </md-tab> <md-tab label="Meet Results"> <md-tabs class="tabs" md-dynamic-height> <md-tab label="Cross Country"> <span ng-repeat="meets in crossCountryMeets | orderObjectBy:date:true"> <div class="md-title extra-vertical-space">{{ meets[0].date.substring(0, 4) }}</div> <div class="two-column-table results-table extra-vertical-space"> <div class="row md-body-1" ng-repeat-start="meet in meets"> <div class="left-column">{{ meet.name }}</div> <div class="right-column"> <a class="link results" ng-if="meet.resultURL" href="{{ meet.resultURL }}">Results</a> <a class="link splits" ng-if="meet.splitURL" href="{{ meet.splitURL }}">Splits</a> </div> </div> <md-divider ng-repeat-end></md-divider> </div> </span> </md-tab> <md-tab label="Indoor Track"> <span ng-repeat="meets in indoorMeets | orderObjectBy:date:true"> <div class="md-title extra-vertical-space">{{ meets[0].date.substring(0, 4) }}</div> <div class="two-column-table results-table extra-vertical-space"> <div class="row md-body-1" ng-repeat-start="meet in meets"> <div class="left-column">{{ meet.name }}</div> <div class="right-column"> <a class="link results" ng-if="meet.resultURL" href="{{ meet.resultURL }}">Results</a> <a class="link splits" ng-if="meet.splitURL" href="{{ meet.splitURL }}">Splits</a> </div> </div> <md-divider ng-repeat-end></md-divider> </div> </span> </md-tab> <md-tab label="Outdoor Track"> <span ng-repeat="meets in outdoorMeets | orderObjectBy:date:true"> <div class="md-title extra-vertical-space">{{ meets[0].date.substring(0, 4) }}</div> <div class="two-column-table results-table extra-vertical-space"> <div class="row md-body-1" ng-repeat-start="meet in meets"> <div class="left-column">{{ meet.name }}</div> <div class="right-column"> <a class="link results" ng-if="meet.resultURL" href="{{ meet.resultURL }}">Results</a> <a class="link splits" ng-if="meet.splitURL" href="{{ meet.splitURL }}">Splits</a> </div> </div> <md-divider ng-repeat-end></md-divider> </div> </span> </md-tab> </md-tabs> </md-tab> <md-tab label="Athlete Search" md-on-select="loadAthletes()"> <div class="extra-vertical-space"> <md-autocomplete md-items="athlete in loadAthletes()" md-item-text="athlete.name" md-search-text="athleteText" placeholder="Search for an athlete profile"> <md-item-template> <span md-highlight-text="athleteText">{{ athlete.name }}</span> </md-item-template> <md-not-found> No matches found. </md-not-found> </md-autocomplete> </div> </md-tab> </md-tabs> </div> </div>')}]);