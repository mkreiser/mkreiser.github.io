"use strict";angular.module("cuttingPorkApp",["ngAnimate","ngAria","ngCookies","ngMaterial","ngMessages","ngResource","ngRoute","ngSanitize"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"homeCtrl"}).when("/candidate",{templateUrl:"views/candidate.html",controller:"candidateCtrl"}).when("/issue",{templateUrl:"views/issue.html",controller:"issueCtrl"}).otherwise({redirectTo:"/"})}]).run(["$location","$rootScope",function(a,b){b.goToState=function(b){a.path(b)}}]),angular.module("cuttingPorkApp").constant("CANDIDATES",{"Bernie Sanders":{name:"Bernie Sanders",image:"images/candidates/Bernie Sanders/Bernie_Sanders.jpg",currentOffice:"U.S. Senator from Vermont",previousOffices:["U.S. Representative Vermont's at-large district","Mayor of Burlington, Vermont"],party:"Democratic Party",age:74,website:"https://berniesanders.com/",facebook:"https://www.facebook.com/berniesanders/",twitter:"https://twitter.com/SenSanders",wikipedia:"https://en.wikipedia.org/wiki/Bernie_Sanders",media:["images/candidates/Bernie Sanders/media1.jpg"],issues:[{name:"Abortion",stance:"Pro-Choice",citations:[{text:"this is a text blob1",url:""},{text:"this is a text blob2",url:""},{text:"this is a text blob3",url:""}]},{name:"Supreme Court",stance:"Hold hearing now",citations:[{text:"this is a text blob1",url:""},{text:"this is a text blob2",url:""},{text:"this is a text blob3",url:""}]},{name:"Education",stance:"Increase public funding",citations:[{text:"this is a text blob1",url:""},{text:"this is a text blob2",url:""},{text:"this is a text blob3",url:""}]}],furtherCitations:[{text:"Bernie Sanders is a pimp",url:""},{text:"Bernie Sanders",url:""},{text:"Feel the Bern",url:""}]},"Donald Trump":{name:"Donald Trump",image:"images/candidates/Donald Trump/Donald Trump.jpg",currentOffice:"Private Citizen (Businessman)",previousOffices:["No public offices held"],party:"Republican Party",age:69,website:"https://www.donaldjtrump.com/",facebook:"https://www.facebook.com/DonaldTrump/",twitter:"https://twitter.com/realDonaldTrump",wikipedia:"https://en.wikipedia.org/wiki/Donald_Trump",media:["images/candidates/Donald Trump/media1.jpg"],issues:[{name:"Abortion",stance:"Pro-Life",citations:[""]},{name:"Gun Rights",stance:"Pro Gun Rights",citations:[""]}],furtherCitations:[""]},"Hillary Clinton":{name:"Hillary Clinton",image:"images/candidates/Hillary Clinton/Hillary Clinton.jpg",currentOffice:"Private Citizen",previousOffices:["U.S. Secretary of State","U.S. Senator from New York","First Lady of U.S.","First Lady of Arkansas"],party:"Democratic Party",age:68,website:"https://www.hillaryclinton.com/",facebook:"https://www.facebook.com/hillaryclinton/",twitter:"https://twitter.com/HillaryClinton",wikipedia:"https://en.wikipedia.org/wiki/Hillary_Clinton",media:["images/candidates/Hillary Clinton/media1.jpg"],issues:[{name:"Abortion",stance:"Pro-Choice",citations:[""]},{name:"Gun Rights",stance:"Pro Gun Control",citations:[""]}],furtherCitations:[""]},"Ted Cruz":{name:"Ted Cruz",image:"images/candidates/Ted Cruz/Ted Cruz.jpg",currentOffice:"U.S. Senator from Texas",previousOffices:["Solicitor General of Texas"],party:"Republican Party",age:45,website:"https://www.tedcruz.org/",facebook:"https://www.facebook.com/tedcruzpage/",twitter:"https://twitter.com/tedcruz",wikipedia:"https://en.wikipedia.org/wiki/Ted_Cruz",media:["images/candidates/Ted Cruz/media1.jpg"],issues:[{name:"Abortion",stance:"Pro-Life",citations:[""]},{name:"Gun Rights",stance:"Pro Gun Rights",citations:[""]}],furtherCitations:[""]}}).constant("ISSUES",{Immigration:{name:"Immigration",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]},"Supreme Court":{name:"Supreme Court",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]},Abortion:{name:"Abortion",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]},"Campaign Finance":{name:"Campaign Finance",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]},"Financial Reform":{name:"Financial Reform",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]},Education:{name:"Education",description:"Brief description",argumentsInSupport:["BLAH1","BLAH2","BLAH3"],argumentsAgainst:["NAH1","NAH2","NAH3"],candidatesInSupport:["Bernie Sanders"],candidatesAgainst:["Donald Trump"],furtherCitations:[""]}}),angular.module("cuttingPorkApp").controller("candidateCtrl",["CANDIDATES","$location","$scope",function(a,b,c){0==b.hash()&&b.path("/"),c.candidate=a[b.hash()]}]),angular.module("cuttingPorkApp").controller("homeCtrl",["CANDIDATES","$scope",function(a,b){var c=["Bernie Sanders","Donald Trump","Hillary Clinton","Ted Cruz"],d=["Bernie Sanders","Donald Trump"];b.trendingIssues=["Immigration","Supreme Court","Abortion","Campaign Finance","Financial Reform","Education"],b.currentElection=[],b.trendingCandidates=[],angular.forEach(c,function(c){b.currentElection.push(a[c])}),angular.forEach(d,function(c){b.trendingCandidates.push(a[c])})}]),angular.module("cuttingPorkApp").controller("issueCtrl",["ISSUES","$location","$scope",function(a,b,c){0==b.hash()&&b.path("/"),c.issue=a[b.hash()]}]),angular.module("cuttingPorkApp").run(["$templateCache",function(a){a.put("views/candidate.html",'<div class="candidate-page"> <div class="candidate-header"> <img class="candidate-image" src="{{candidate.image}}"> <div class="candidate-name">{{candidate.name}}</div> <div>{{candidate.currentOffice}}</div> <div class="candidate-bio"> <div>Previous offices: <span ng-repeat="office in candidate.previousOffices">{{office}}<span ng-if="!$last">, </span></span></div> <div>Current Party: {{candidate.party}}</div> <div>Age: {{candidate.age}}</div> </div> <div class="candidate-links"> <div><a href="{{candidate.website}}">Website<md-icon md-font-set="material-icons">call_made</md-icon></a></div> <div><a href="{{candidate.facebook}}">Facebook<md-icon md-font-set="material-icons">call_made</md-icon></a></div> <div><a href="{{candidate.twitter}}">Twitter<md-icon md-font-set="material-icons">call_made</md-icon></a></div> <div><a href="{{candidate.wikipedia}}">Wikipedia<md-icon md-font-set="material-icons">call_made</md-icon></a></div> </div> </div> <div class="candidate-media"> <fieldset class="candidate-media-header header-line"><legend>Media</legend></fieldset> <span ng-repeat="m in candidate.media"> <img src="{{m}}"> </span> </div> <div class="candidate-issues"> <fieldset class="header-line"><legend>Issues</legend></fieldset> <div class="issue" ng-repeat="i in candidate.issues"> <div class="issue-name">{{i.name}}</div> <div class="issue-stance">{{i.stance}}</div> <div class="issue-reason" ng-repeat="reason in i.citations"> <a href="{{reason.url}}">{{reason.text}}<md-icon md-font-set="material-icons">call_made</md-icon></a> </div> </div> </div> <div class="candidate-reading"> <fieldset class="header-line"><legend>Further Reading</legend></fieldset> <div class="further-reading" ng-repeat="read in candidate.furtherCitations"> {{read.text}}<md-icon md-font-set="material-icons">call_made</md-icon> </div> </div> </div>'),a.put("views/home.html",'<div class="capitol-image"><img src="images/capitol.af28426f.jpg"></div> <div class="home-container"> <md-input-container class="search-bar md-background"> <label>Search Candidates &amp; Issues</label> <input ng-model="searchQuery"> </md-input-container> <h2>Candidates Running in Current Election</h2> <div class="candidate-container"> <span class="candidate" ng-repeat="can in currentElection"> <a href="#/candidate#{{can.name}}"> <img src="{{can.image}}"> <div>{{can.name}}</div> </a> </span> </div> <h2>Trending Candidates</h2> <div class="candidate-container"> <span class="candidate" ng-repeat="can in trendingCandidates"> <a href="#/candidate#{{can.name}}"> <img src="{{can.image}}"> <div>{{can.name}}</div> </a> </span> </div> <h2>Trending Issues</h2> <div class="issue-container"> <span ng-repeat="issue in trendingIssues"> <a href="#/issue#{{issue}}"><span class="issue">{{issue}}</span></a> </span> </div> </div>'),a.put("views/issue.html",'<div class="issue-container"> <div class="issue-header"> <div class="issue-name">{{issue.name}}</div> <div class="issue-description">{{issue.description}}</div> </div> <div class="issue-arguments-container"> <div class="left-argument"> <fieldset class="header-line"><legend>Arguments in support</legend></fieldset> <div class="argument-list" ng-repeat="argument in issue.argumentsInSupport"> <div>{{argument}}</div> </div> </div> <div class="right-argument"> <fieldset class="header-line"><legend>Arguments against</legend></fieldset> <div class="argument-list" ng-repeat="argument in issue.argumentsAgainst"> <div>{{argument}}</div> </div> </div> </div> <div class="issue-candidates-container"> <div class="left-candidates"> <fieldset class="header-line"><legend>Candidates in support</legend></fieldset> <div class="candidates-list" ng-repeat="candidate in issue.candidatesInSupport"> <div>{{candidate}}</div> </div> </div> <div class="right-candidates"> <fieldset class="header-line"><legend>Candidates against</legend></fieldset> <div class="candidates-list" ng-repeat="candidate in issue.candidatesAgainst"> <div>{{candidate}}</div> </div> </div> </div> <div class="issue-reading"> <fieldset class="header-line"><legend>Further Reading</legend></fieldset> </div> </div>')}]);