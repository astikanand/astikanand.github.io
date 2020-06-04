$(document).ready(function(){
    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $(".title").click(function(e) {
        var $opened = $(this).children("i:first").hasClass("open");
        var $children =  $(this).parent().children(".title");
        $children.each(function () {
            $(this).children("i:first").removeClass("open");
            $(this).children("div:first").children("div:first").removeClass("visible");
            $(this).children("div:first").children("div:first").addClass("hidden");
        });
        if(!$opened){
            $(this).children("i:first").addClass("open");
            $(this).children("div:first").children("div:first").removeClass("hidden");
            $(this).children("div:first").children("div:first").addClass("visible");
        }
        e.stopPropagation();
    });

});
