"use strict";angular.module("frontendApp",["ngAnimate","ngCookies","ngMaterial","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"loginCtrl"}).when("/about",{templateUrl:"views/about.html"}).when("/overview",{templateUrl:"views/overview.html"}).when("/houses",{templateUrl:"views/house_search.html",controller:"houseSearchCtrl"}).when("/new_house",{templateUrl:"views/new_house.html",controller:"newHouseCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"signupCtrl"}).when("/signup_pref",{templateUrl:"views/signup-pref.html",controller:"signupPrefCtrl"}).when("/edit_profile",{templateUrl:"views/edit_profile.html",controller:"editProfileCtrl"}).when("/edit_house",{templateUrl:"views/edit_house.html",controller:"editHouseCtrl"}).when("/roommates",{templateUrl:"views/roommates.html",controller:"roommatesCtrl"}).otherwise({redirectTo:"/"})}]).controller("appCtrl",["$http","$location","$mdToast","$rootScope",function(a,b,c,d){d.serverHost="http://tophaus.herokuapp.com/",d.user||b.path("/"),d.goToState=function(a){d.user?b.path(a):b.path("/")},d.showSimpleToast=function(a){c.show(c.simple().content(a||"Toast!").position("top right").hideDelay(2e3))},d.deleteAccount=function(){a["delete"](d.serverHost+"users/deleteUser/"+d.user.id+"/").then(function(){d.showSimpleToast("Deleted "+d.user.name),d.logout()})},d.logout=function(){d.user=null,d.goToState("/")}}]),angular.module("frontendApp").controller("editHouseCtrl",["$http","$rootScope","$scope",function(a,b,c){a.get(b.serverHost+"houses/getHouse/"+b.editHouseId+"/").success(function(a){c.house=a,c.house.cost=c.house.exact_cost,c.house.roommates=c.house.number_of_people}),c.saveHouse=function(c){a.put(b.serverHost+"houses/updateHouse/"+b.editHouseId+"/",{location:c.location,exact_cost:c.cost,number_of_people:c.roommates,style:c.style}).success(function(){b.showSimpleToast("Added a house!"),b.goToState("houses")})}}]),angular.module("frontendApp").controller("editProfileCtrl",["$http","$rootScope","$scope",function(a,b,c){c.user=b.user,c.updateUser=function(){a.put(b.serverHost+"users/updateUser/"+b.user.id+"/",c.user).then(function(a){b.user=a.data,b.showSimpleToast("Profile updated!"),b.goToState("overview")})}}]),angular.module("frontendApp").controller("houseSearchCtrl",["$http","$rootScope","$scope",function(a,b,c){if(c.search={},c.amenity={},b.match){c.disableFilters=!0,c.search.max_price=b.match.budget;var d=b.match.style;c.search.style=d.split(",")[0];for(var e in b.match.user_amenity)b.match.user_amenity.hasOwnProperty(e)&&b.match.user_amenity[e]&&(c.amenity[e]=!0);b.match=null}var f=function(){var d="";for(var e in c.amenity)c.amenity.hasOwnProperty(e)&&c.amenity[e]&&(d+="&"+e+"=True");a.get(b.serverHost+"amenities?house_amenity_bool=True"+d).then(function(d){var e="";angular.forEach(d.data,function(a){e+=a.id+","}),e=e.substring(0,e.length-1);if(""===e)return c.houses=[],void(c.loading=!1);e="?amenity="+e;for(var f in c.search)c.search.hasOwnProperty(f)&&c.search[f]&&(e+="&"+f+"="+c.search[f]);a.get(b.serverHost+"houses"+e).then(function(d){c.houses=d.data,angular.forEach(c.houses,function(c){c.getExpectedPrice=function(d,e){a.post(b.serverHost+"location/getExpectedPrice/",{city:c.city,apartment_type:c.style,month:d,year:e.toString()}).then(function(a){c.expectedPrice=a.data.expected_price})}}),c.loading=!1})})},g=function(){angular.forEach(c.houses,function(a){a.getExpectedPrice(c.expected.month,c.expected.year)})};c.$watch("search",function(){c.loading=!0,f()},!0),c.$watch("amenity",function(){c.loading=!0,f()},!0),c.$watch("expected",function(a){a&&a!=={}&&a.month&&a.year&&g()},!0)}]),angular.module("frontendApp").controller("loginCtrl",["$http","$rootScope","$scope",function(a,b,c){c.login=function(){a.get(b.serverHost+"users?&name="+c.user.name).then(function(a){1!==a.data.length?b.showSimpleToast("Invalid Login"):(b.showSimpleToast("Welcome!"),b.user=a.data[0],b.goToState("overview"))})},c.signup=function(){b.user=c.user,b.goToState("signup")}}]),angular.module("frontendApp").controller("newHouseCtrl",["$http","$rootScope","$scope",function(a,b,c){c.createHouse=function(){a.post(b.serverHost+"houses/newHouse/",c.house).then(function(a){b.showSimpleToast("House created!"),b.goToState("houses")})}}]),angular.module("frontendApp").controller("roommatesCtrl",["$http","$rootScope","$scope",function(a,b,c){c.loading=!0,a.get(b.serverHost+"users/getCompatibleRoommates/"+b.user.id+"/").then(function(a){c.roommates=a.data,c.loading=!1}),c.match=function(c){a.get(b.serverHost+"users/getAvgUser/"+b.user.id+"/"+c+"/").then(function(a){b.match=a.data,b.goToState("houses")})}}]),angular.module("frontendApp").controller("signupCtrl",["$http","$rootScope","$scope",function(a,b,c){c.user=b.user,c.updateUser=function(){b.user=c.user,b.goToState("signup_pref")}}]),angular.module("frontendApp").controller("signupPrefCtrl",["$http","$rootScope","$scope",function(a,b,c){c.user=b.user,c.user.user_amenity={},c.user.house_amenity_bool=!0,c.user.smoking=3,c.user.environment=3,c.user.condition=3,c.user.belongings=3,c.user.guests=3,c.user.sleep=3,c.updateUser=function(){console.log(c.user),a.post(b.serverHost+"users/newUser/",c.user).then(function(a){b.user=a.data,b.showSimpleToast("Welcome!"),b.goToState("overview")})}}]),angular.module("frontendApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">TopHaüs</h2> </div> <div class="mdl-card__supporting-text"> <div>TopHaüs is a CS 411 project created in Fall 2015 at the University of Illinois by Vinh Ha, Radhir Kothuri, Mike Kreiser, and Varun Thangavelu.</div> </div> </div>'),a.put("views/edit_house.html",'<div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Edit House</h2> </div> <div class="mdl-card__supporting-text"> <md-input-container> <label>Location</label> <input ng-model="house.location"> </md-input-container> <md-input-container> <label>Cost</label> <input ng-model="house.cost" type="number"> </md-input-container> <md-input-container> <label># of roommates</label> <input ng-model="house.roommates" type="number"> </md-input-container> <label>Style</label> <md-select ng-model="house.style" aria-label="style"> <md-option value="Art Deco">Art Deco</md-option> <md-option value="Igloo">Igloo</md-option> <md-option value="Modern">Modern</md-option> <md-option value="Post Modern">Post-modern</md-option> <md-option value="Rustic">Rustic</md-option> <md-option value="Ranch">Ranch</md-option> <md-option value="Urban">Urban</md-option> </md-select> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="saveHouse(house)"> Edit Listing </a> </div> </div>'),a.put("views/edit_profile.html",'<div> <div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Edit Profile</h2> </div> <div class="mdl-card__supporting-text"> <h6>User Preferences</h6> <md-input-container> <label>Age</label> <input ng-model="user.age" type="number" min="0" required> </md-input-container> <md-input-container> <label>Zipcode</label> <input ng-model="user.zipcode" md-maxlength="5" required> </md-input-container> <md-input-container> <label>Gender</label> <md-select ng-model="user.gender" aria-label="style" required> <md-option value="Male">Male</md-option> <md-option value="Female">Female</md-option> <md-option value="Other">Other</md-option> </md-select> </md-input-container> <md-input-container> <label>Budget</label> <input ng-model="user.budget" type="number" min="0" required> </md-input-container> <md-input-container> <label># of Roommates</label> <input ng-model="user.number_of_roommates" type="number" min="0" required> </md-input-container> <md-input-container> <label>Style</label> <md-select ng-model="user.style" aria-label="style" required> <md-option value="Studio">Studio</md-option> <md-option value="One Bedroom">One Bedroom</md-option> <md-option value="Two Bedroom">Two Bedroom</md-option> <md-option value="Three Bedroom">Three Bedroom</md-option> <md-option value="Four Bedroom">Four Bedroom</md-option> <md-option value="Five Bedroom">Five Bedroom</md-option> <md-option value="Duplex/Triplex">Duplex/Triplex</md-option> <md-option value="Condomium">Condomium</md-option> </md-select> </md-input-container> <md-input-container> <label>Location</label> <input ng-model="user.location" required> </md-input-container> <md-input-container> <label>Length of Stay (days)</label> <input ng-model="user.length_of_stay" type="number" min="0" required> </md-input-container> <md-input-container> <label>Company</label> <input ng-model="user.company" required> </md-input-container> <h6>Roommate Preferences</h6> <div> <div>Would you be willing to live with a smoker? (1-No, 5-Yes)</div> <md-slider flex="" md-discrete="" ng-model="user.smoking" step="1" min="1" max="5" aria-label="smoking" class="md-primary"> </md-slider> </div> <div> <div>What is your desired sleeping environment? (1-Quiet, 5-Noisy)</div> <md-slider flex="" md-discrete="" ng-model="user.environment" step="1" min="1" max="5" aria-label="environment" class="md-primary"> </md-slider> </div> <div> <div>What is your cleanliness standards? (1-Clean, 5-Cluttered)</div> <md-slider flex="" md-discrete="" ng-model="user.condition" step="1" min="1" max="5" aria-label="condition" class="md-primary"> </md-slider> </div> <div> <div>How do you feel about sharing your belongings? (1-Yes, 5-No)</div> <md-slider flex="" md-discrete="" ng-model="user.belongings" step="1" min="1" max="5" aria-label="belongings" class="md-primary"> </md-slider> </div> <div> <div>How do you feel about guests? (1-Anytime, 5-Never)</div> <md-slider flex="" md-discrete="" ng-model="user.guests" step="1" min="1" max="5" aria-label="guests" class="md-primary"> </md-slider> </div> <div> <div>What is your sleep schedule? (1-Early bird, 5-Late riser)</div> <md-slider flex="" md-discrete="" ng-model="user.sleep" step="1" min="1" max="5" aria-label="sleep" class="md-primary"> </md-slider> </div> <h6>Haüs Preferences</h6> <md-checkbox class="md-primary" ng-model="user.user_amenity.garden_backyard">Garden/Backyard</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.pool">Pool</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.gym">Gym</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.shopping_mall">Shopping Mall</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.beach">Beach</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.movie_theater">Movie Theater</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.amusement_park">Amusement Park</md-checkbox> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="updateUser()"> Submit </a> </div> </div> </div>'),a.put("views/house_search.html",'<div> <div class="demo-card-wide mdl-card mdl-shadow--2dp search-box"> <div class="mdl-card__supporting-text"> <md-input-container> <label>Min Price</label> <input ng-model="search.min_price" type="number" min="0" ng-disabled="disableFilters"> </md-input-container> <md-input-container> <label>Max Price</label> <input ng-model="search.max_price" type="number" min="0" ng-disabled="disableFilters"> </md-input-container> <md-input-container> <label>Style</label> <md-select ng-model="search.style" aria-label="style" ng-disabled="disableFilters"> <md-option value="Studio">Studio</md-option> <md-option value="One Bedroom">One Bedroom</md-option> <md-option value="Two Bedroom">Two Bedroom</md-option> <md-option value="Three Bedroom">Three Bedroom</md-option> <md-option value="Four Bedroom">Four Bedroom</md-option> <md-option value="Five Bedroom">Five Bedroom</md-option> <md-option value="Duplex/Triplex">Duplex/Triplex</md-option> <md-option value="Condomium">Condomium</md-option> </md-select> </md-input-container> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.garden_backyard">Garden/Backyard</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.pool">Pool</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.gym">Gym</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.shopping_mall">Shopping Mall</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.beach">Beach</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.movie_theater">Movie Theater</md-checkbox> <md-checkbox class="md-primary" ng-disabled="disableFilters" ng-model="amenity.amusement_park">Amusement Park</md-checkbox> <br> <div>Expected Price</div> <md-input-container> <label>Month</label> <md-select ng-model="expected.month" aria-label="month"> <md-option value="January">January</md-option> <md-option value="February">February</md-option> <md-option value="March">March</md-option> <md-option value="April">April</md-option> <md-option value="May">May</md-option> <md-option value="June">June</md-option> <md-option value="July">July</md-option> <md-option value="August">August</md-option> <md-option value="September">September</md-option> <md-option value="October">October</md-option> <md-option value="November">November</md-option> <md-option value="December">December</md-option> </md-select> </md-input-container> <md-input-container> <label>Year</label> <input ng-model="expected.year" type="number" min="2015"> </md-input-container> </div> </div> <md-progress-circular class="md-background centered-card" md-mode="indeterminate" ng-if="loading" md-diameter="40"></md-progress-circular> <div class="centered-card demo-card image mdl-card mdl-shadow--2dp" ng-repeat="house in houses" ng-if="!loading"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">{{house.address}}, {{house.city}}, {{house.state}}</h2> </div> <div class="mdl-card__supporting-text"> <div>Rent: {{house.rent | currency}}/month</div> <div>Style: {{house.style}}</div> <div>Number of people: {{house.number_of_people}}</div> <h6>Amenities</h6> <div>Garden/Backyard: {{house.amenity.garden_backyard ? \'Yes\': \'No\'}}</div> <div>Pool: {{house.amenity.pool ? \'Yes\': \'No\'}}</div> <div>Gym: {{house.amenity.gym ? \'Yes\': \'No\'}}</div> <div>Shopping: {{house.amenity.shopping_mall ? \'Yes\': \'No\'}}</div> <div>Beach: {{house.amenity.beach ? \'Yes\': \'No\'}}</div> <div>Movie Theater: {{house.amenity.movie_theater ? \'Yes\': \'No\'}}</div> <div>Amusement Park: {{house.amenity.amusement_park ? \'Yes\': \'No\'}}</div> <br> <div>{{ house.expectedPrice ? (house.expectedPrice > 0 ? \'Expected Price: $\' + house.expectedPrice : \'Expected Price: N/A\') : \'\'}}</div> </div> </div> </div>'),a.put("views/login.html",'<div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Welcome</h2> </div> <div class="mdl-card__supporting-text"> <md-input-container> <label>Name</label> <input ng-model="user.name" required> </md-input-container> <md-input-container> <label>Password</label> <input ng-model="user.password" type="password"> </md-input-container> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="login()"> Login </a> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="signup()"> Sign Up </a> </div> </div>'),a.put("views/new_house.html",'<div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">List a House</h2> </div> <div class="mdl-card__supporting-text"> <md-input-container> <label>Rent</label> <input ng-model="house.rent" type="number" min="0" required> </md-input-container> <md-input-container> <label>Number of People</label> <input ng-model="house.number_of_people" type="number" min="0" required> </md-input-container> <md-input-container> <label>Style</label> <md-select ng-model="house.style" aria-label="style" required> <md-option value="Studio">Studio</md-option> <md-option value="One Bedroom">One Bedroom</md-option> <md-option value="Two Bedroom">Two Bedroom</md-option> <md-option value="Three Bedroom">Three Bedroom</md-option> <md-option value="Four Bedroom">Four Bedroom</md-option> <md-option value="Five Bedroom">Five Bedroom</md-option> <md-option value="Duplex/Triplex">Duplex/Triplex</md-option> <md-option value="Condomium">Condomium</md-option> </md-select> </md-input-container> <md-input-container> <label>Length of Stay (days)</label> <input ng-model="house.length_of_stay" type="number" min="0" required> </md-input-container> <md-input-container> <label>Address</label> <input ng-model="house.address" required> </md-input-container> <md-input-container> <label>City</label> <input ng-model="house.city" required> </md-input-container> <md-input-container> <label>State</label> <input ng-model="house.state" required> </md-input-container> <md-input-container> <label>Zipcode</label> <input ng-model="house.zipcode" md-maxlength="5" required> </md-input-container> <md-checkbox class="md-primary" ng-model="house.amenity.garden_backyard">Garden/Backyard</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.pool">Pool</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.gym">Gym</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.shopping_mall">Shopping Mall</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.beach">Beach</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.movie_theater">Movie Theater</md-checkbox> <md-checkbox class="md-primary" ng-model="house.amenity.amusement_park">Amusement Park</md-checkbox> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="createHouse()"> Submit </a> </div> </div>'),a.put("views/overview.html",'<div class="centered-card demo-card-wide image mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Welcome to TopHaüs</h2> </div> <div class="mdl-card__supporting-text"> <div><b>Profile</b> - Edit your profile, roommate preferences, and Haüs preferences.</div> <div><b>List a House</b> - List a house on TopHaüs.</div> <div><b>Search Houses</b> - Search for a matching house.</div> <div><b>Find a Roommate</b> - Get matched with a roommate and find a house together.</div> </div> </div>'),a.put("views/roommates.html",'<div class="mdl-card__title"> <h2 class="mdl-card__title-text">Compatible Roommates for {{$root.user.name}}</h2> </div> <md-progress-circular class="md-background centered-card" md-mode="indeterminate" ng-if="loading" md-diameter="40"></md-progress-circular> <div class="centered-card demo-card mdl-card mdl-shadow--2dp" ng-repeat="roommate in roommates" ng-if="!loading"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">#{{$index + 1}}: {{roommate.name}}</h2> </div> <div class="mdl-card__supporting-text"> <div>Age: {{roommate.age}}</div> <div>Gender: {{roommate.gender}}</div> <div>Location: {{roommate.location}}</div> <br> <div>Budget: {{roommate.budget | currency}}/month</div> <div>Style: {{roommate.style}}</div> <div>Number of Roommates: {{roommate.number_of_roommates}}</div> <div>Length of Stay: {{roommate.length_of_stay}}</div> <div>Company: {{roommate.company}}</div> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="match(roommate.id)"> Match </a> </div> </div>'),a.put("views/signup-pref.html",'<div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Create Profile</h2> </div> <div class="mdl-card__supporting-text"> <h6>Roommate Preferences</h6> <div> <div>Would you be willing to live with a smoker? (1-No, 5-Yes)</div> <md-slider flex="" md-discrete="" ng-model="user.smoking" step="1" min="1" max="5" aria-label="smoking" class="md-primary"> </md-slider> </div> <div> <div>What is your desired sleeping environment? (1-Quiet, 5-Noisy)</div> <md-slider flex="" md-discrete="" ng-model="user.environment" step="1" min="1" max="5" aria-label="environment" class="md-primary"> </md-slider> </div> <div> <div>What is your cleanliness standards? (1-Clean, 5-Cluttered)</div> <md-slider flex="" md-discrete="" ng-model="user.condition" step="1" min="1" max="5" aria-label="condition" class="md-primary"> </md-slider> </div> <div> <div>How do you feel about sharing your belongings? (1-Yes, 5-No)</div> <md-slider flex="" md-discrete="" ng-model="user.belongings" step="1" min="1" max="5" aria-label="belongings" class="md-primary"> </md-slider> </div> <div> <div>How do you feel about guests? (1-Anytime, 5-Never)</div> <md-slider flex="" md-discrete="" ng-model="user.guests" step="1" min="1" max="5" aria-label="guests" class="md-primary"> </md-slider> </div> <div> <div>What is your sleep schedule? (1-Early bird, 5-Late riser)</div> <md-slider flex="" md-discrete="" ng-model="user.sleep" step="1" min="1" max="5" aria-label="sleep" class="md-primary"> </md-slider> </div> <h6>Haüs Preferences</h6> <md-checkbox class="md-primary" ng-model="user.user_amenity.garden_backyard">Garden/Backyard</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.pool">Pool</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.gym">Gym</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.shopping_mall">Shopping Mall</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.beach">Beach</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.movie_theater">Movie Theater</md-checkbox> <md-checkbox class="md-primary" ng-model="user.user_amenity.amusement_park">Amusement Park</md-checkbox> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="updateUser()"> Submit </a> </div> </div>'),a.put("views/signup.html",'<div> <div class="centered-card demo-card mdl-card mdl-shadow--2dp"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Create Profile</h2> </div> <div class="mdl-card__supporting-text"> <md-input-container> <label>Age</label> <input ng-model="user.age" type="number" min="0" required> </md-input-container> <md-input-container> <label>Zipcode</label> <input ng-model="user.zipcode" md-maxlength="5" required> </md-input-container> <md-input-container> <label>Gender</label> <md-select ng-model="user.gender" aria-label="style" required> <md-option value="Male">Male</md-option> <md-option value="Female">Female</md-option> <md-option value="Other">Other</md-option> </md-select> </md-input-container> <md-input-container> <label>Budget</label> <input ng-model="user.budget" type="number" min="0" required> </md-input-container> <md-input-container> <label># of Roommates</label> <input ng-model="user.number_of_roommates" type="number" min="0" required> </md-input-container> <md-input-container> <label>Style</label> <md-select ng-model="user.style" aria-label="style" required> <md-option value="Studio">Studio</md-option> <md-option value="One Bedroom">One Bedroom</md-option> <md-option value="Two Bedroom">Two Bedroom</md-option> <md-option value="Three Bedroom">Three Bedroom</md-option> <md-option value="Four Bedroom">Four Bedroom</md-option> <md-option value="Five Bedroom">Five Bedroom</md-option> <md-option value="Duplex/Triplex">Duplex/Triplex</md-option> <md-option value="Condomium">Condomium</md-option> </md-select> </md-input-container> <md-input-container> <label>Location</label> <input ng-model="user.location" required> </md-input-container> <md-input-container> <label>Length of Stay (days)</label> <input ng-model="user.length_of_stay" type="number" min="0" required> </md-input-container> <md-input-container> <label>Company</label> <input ng-model="user.company" required> </md-input-container> </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="updateUser()"> Next </a> </div> </div> </div>')}]);