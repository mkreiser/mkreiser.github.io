$(document).ready(function() {
    $('#fullpage').fullpage({
    	menu: true,
    	scrollingSpeed: 500,
    	loopHorizontal: false,
    	sectionsColor: ['#00A8C6', '#FFF', '#000', '#FFF'],
    	anchors: ['frontpage','intro','dev','4'],
    	verticalCentered: true 	
    });

    $.fn.fullpage.reBuild();
});