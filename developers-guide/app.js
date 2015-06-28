angular.module('devGuide', ['ngMaterial', 'ngAnimate', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider.when("/", {
  	templateUrl: "home.html"
  }).when("/html", {
  	templateUrl: "/views/html.html"
  }).when("/color", {
  	templateUrl: "/views/colors.html"
  }).when("/css", {
  	templateUrl: "/views/css.html"
  }).when("/javascript", {
  	templateUrl: "/views/javascript.html"
  }).when("/angular", {
  	templateUrl: "/views/angular.html"
  }).when("/git", {
  	templateUrl: "/views/git.html"
  }).when("/vim", {
  	templateUrl: "/views/vim.html"
  }).when("/sublime", {
  	templateUrl: "/views/sublime.html"
  });;
})

.controller('appController', function($location, $scope) {
	$scope.go = function(path) {
		$location.path(path);
	};

	$scope.backgroundColor = 'home-page-color';

	$scope.colorSchemes = [
		'#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900',
		'#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58',
		'#774F38', '#E08E79', '#F1D4AF', '#ECE5CE', '#C5E0DC',
		'#D1F2A5', '#EFFAB4', '#FFC48C', '#FF9F80', '#F56991',
		'#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6', '#FF8C94',
		'#F7F9FE', '#ECF1F2', '#DCE8EB', '#CBDBE0', '#BED2D9',
		'#00A8C6', '#40C0CB', '#F9F2E7', '#AEE239', '#8FBE00',
		'#AAFF00', '#FFAA00', '#FF00AA', '#AA00FF', '#00AAFF'
	];

	$scope.individualColors = [
		'#FE4365', '#C3FF68', '#00B4FF', '#EEEEEE', '#82837E',
		'#515151'
	];
})

.directive('menuBar', function() {
	return {
	  restrict: 'E',
    templateUrl: '/views/directives/menu-bar.html'
  };
})

.directive('externalLink', function() {
	return {
	  restrict: 'E',
    templateUrl: '/views/directives/external-link.html',
    scope: {
    	text: '@',
    	link: '@',
    	fontSize: '@'
    }
  };
});
