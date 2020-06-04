$(document).ready(function(){
    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    $(".title").click(function(e) {
        var $opened = $(this).children("i:first").hasClass("open");
        var $children =  $(this).parent().children(".title");
        $children.each(function () {
            $(this).children("i:first").removeClass("open");
            $(this).children("div:first").children("div:first").css("display", "none");
        });
        if(!$opened){
            $(this).children("i:first").addClass("open");
            $(this).children("div:first").children("div:first").css("display", "block");
        }
        e.stopPropagation();
    });

});
