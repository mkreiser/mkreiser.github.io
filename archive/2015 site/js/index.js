$(document).ready(function() {
    $('#fullpage').fullpage({
    	scrollingSpeed: 400,
    	loopHorizontal: false,
    	sectionsColor: ['#00A8C6', '#FFF', '#000', '#00A8C6', '#FFF'],
    	anchors: ['frontpage','intro','dev','experience','contact'],
    	slidesNavigation: true
    });
    
    $.fn.fullpage.reBuild();
});