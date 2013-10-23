$(document).ready(function() {
    var x = 24 * 60 * 60;
    var y = 0;

    function update() {
        var date = new Date();
        hour = date.getHours() * 60 * 60;
        min = date.getMinutes() * 60;
        sec = date.getSeconds() + 1;
        cur = hour + min + sec;
        per = (cur / x) * 100;
        $('#clock').text(date.getHours() + " : " + date.getMinutes() + " : " + sec);
        $('.bar').css('width', per + "%");
    }
    setInterval(function() {
        update();
    }, 1000);
});
