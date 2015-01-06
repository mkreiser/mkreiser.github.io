$(document).ready(function() {
    $('#fullpage').fullpage({
    	menu: true,
    	scrollingSpeed: 500,
    	loopHorizontal: false,
    	sectionsColor: ['#00A8C6', '#FFF', '#000', '#FFF'],
    	anchors: ['frontpage','intro','dev','4'],
    	verticalCentered: true,
    	slidesNavigation: true,
        onLeave: function(index, nextIndex, direction){
            //after leaving section 2
            if(index == 2 && direction =='down'){
                $.fn.fullpage.reBuild();
            }
        }
    });

    $.fn.fullpage.reBuild();
});