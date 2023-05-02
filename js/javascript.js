$(document).ready(function(){
 
    $('#meni').click(function(){
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');

    });
});