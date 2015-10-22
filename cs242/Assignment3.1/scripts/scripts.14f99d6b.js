"use strict";angular.module("assignment31App",["ngAnimate","ngCookies","ngMaterial","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/overview.html"}).when("/Projects",{templateUrl:"views/projects.html"}).otherwise({redirectTo:"/"})}]).constant("_",window._).run(["$rootScope",function(a){a._=window._}]).controller("appCtrl",["$http","$location","$q","$rootScope","$scope","_",function(a,b,c,d,e,f){var g=a.get("http://web.engr.illinois.edu/~mkreise2/PHPMagic.php"),h=a.get("http://web.engr.illinois.edu/~mkreise2/Comment.php");c.all([g,h]).then(function(a){d.projects=a[0].data,angular.forEach(a[1].data,function(a){if(null===a.reply_to&&d.projects[a.project])d.projects[a.project].comments?d.projects[a.project].comments.push(a):d.projects[a.project].comments=[a];else if(null!==a.reply_to&&d.projects[a.project]){var b=f.findWhere(d.projects[a.project].comments,{comment_id:a.reply_to});b.replies?b.replies.push(a):b.replies=[a]}}),console.log(d.projects)}),d.roundToTwo=function(a){return+(Math.round(a+"e+2")+"e-2")},e.goToOverview=function(){b.path("/")},e.goToProjects=function(){b.path("Projects")},e.setActiveProject=function(a){e.activeProject=d.projects[a]}}]),angular.module("assignment31App").run(["$templateCache",function(a){a.put("views/header.html",'<header class="mdl-layout__header mdl-layout__header--scroll mdl-color--primary"> <div class="mdl-layout--large-screen-only mdl-layout__header-row"> </div> <div class="mdl-layout--large-screen-only mdl-layout__header-row"> <h3>SVN Portfolio</h3> </div> <div class="mdl-layout--large-screen-only mdl-layout__header-row"> </div> </header> <div class="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark"> <a ng-click="goToOverview()" class="mdl-layout__tab is-active">Overview</a> <a ng-click="goToProjects()" class="mdl-layout__tab">Projects</a> </div>'),a.put("views/overview.html",'<main class="mdl-layout__content full-width"> <div class="mdl-layout__tab-panel is-active" id="overview"> <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp"> <div class="mdl-card mdl-cell mdl-cell--12-col"> <div class="mdl-card__supporting-text"> <h4>Projects</h4> <table class="mdl-data-table mdl-js-data-table center-table full-width hover-cursor"> <thead> <tr> <th class="mdl-data-table__cell--non-numeric">Name</th> <th>Revision</th> <th>Date</th> <th>Author</th> <th>Commit Message</th> </tr> </thead> <tbody> <tr ng-repeat="project in $root.projects" ng-click="setActiveProject(project.name)"> <td class="mdl-data-table__cell--non-numeric">{{project.name}}</td> <td>{{project.revision}}</td> <td>{{project.date}}</td> <td>{{project.author}}</td> <td>{{project.commitMessage}}</td> </tr> </tbody> </table> </div> </div> </section> <section class="mdl-grid mdl-grid--no-spacing mdl-shadow--2dp" ng-if="activeProject"> <div class="mdl-card mdl-cell mdl-cell--12-col"> <div class="mdl-card__supporting-text"> <h4>{{activeProject.name}}</h4> <div> <table class="mdl-data-table mdl-js-data-table center-table"> <thead> <tr> <th class="mdl-data-table__cell--non-numeric">Path</th> <th>Revision</th> <th>Date</th> <th>Author</th> <th>Commit Message</th> <th>Size</th> </tr> </thead> <tbody> <tr ng-repeat="file in activeProject.files"> <td class="mdl-data-table__cell--non-numeric">{{file.name}}</td> <td>{{file.revision}}</td> <td>{{file.date}}</td> <td>{{file.author}}</td> <td>{{file.commitMessage}}</td> <td>{{$root.roundToTwo(file.size / 32)}} KB</td> </tr> </tbody> </table> </div> </div> <div class="mdl-card__actions mdl-card--border"> <h5 class="comment-section-title">Comments</h5> <div class="comment" ng-repeat="comment in activeProject.comments"> {{comment.text}} <div class="reply-link"><a>reply</a></div> <div class="comment reply" ng-repeat="reply in comment.replies"> {{reply.text}} </div> </div> <md-input-container flex> <label>Comment</label> <textarea ng-model="newcomment" columns="1"></textarea> </md-input-container> <md-button class="md-raised md-primary">Submit</md-button> </div> </div> </section> </div> </main>'),a.put("views/projects.html",'<div ng-repeat="project in $root.projects" class="mdl-layout__tab-panel is-active mdl-color--grey-100 spacer"> <div class="mdl-layout__tab-panel is-active" id="overview"> <section class="mdl-grid mdl-grid--no-spacing mdl-shadow--2dp"> <div class="mdl-card mdl-cell mdl-cell--12-col"> <div class="mdl-card__supporting-text"> <h4>{{project.name}}</h4> <div> <table class="mdl-data-table mdl-js-data-table center-table"> <thead> <tr> <th class="mdl-data-table__cell--non-numeric">Path</th> <th>Revision</th> <th>Date</th> <th>Author</th> <th>Commit Message</th> <th>Size</th> </tr> </thead> <tbody> <tr ng-repeat="file in project.files"> <td class="mdl-data-table__cell--non-numeric">{{file.name}}</td> <td>{{file.revision}}</td> <td>{{file.date}}</td> <td>{{file.author}}</td> <td>{{file.commitMessage}}</td> <td>{{$root.roundToTwo(file.size / 32)}} KB</td> </tr> </tbody> </table> </div> </div> </div> </section> </div> </div>')}]);