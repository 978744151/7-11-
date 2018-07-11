$(function () {
    var height = $('.userbox').width();
    $('.userbox').css('height',height)
    //$('.userbox').css('lineHeight',height+'px')
    var username = localStorage.getItem('username');
    var portraiturl = localStorage.getItem('portraiturl');
    $('.user_img').attr('src',portraiturl);
    $('.username').html(username)
})