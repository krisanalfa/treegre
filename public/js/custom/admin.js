$('#alert').hide();
$('#addNewUserAlert').hide();
var element = $('#userContainer').children();
var length = element.length;
$('#userContainer').html(element[0]);
$('.pagination').bootpag({
    total: length,
    page: 1,
    maxVisible: 10
}).on("page", function(event, num) {
    $("#userContainer").html(element[num - 1]);
});
$('#logout').click(function(e) {
    e.preventDefault();
    window.location.href = "/logout";
});
$('#rootControl').submit(function() {
    var oldPassword = $('#oldPassword').val();
    var newPassword = $('#newPassword').val();
    var verPassword = $('#verPassword').val();
    if (oldPassword === "") {
        $('.oldPassword').addClass('error');
        $('#alertMessage').text('');
        $('#alertMessage').append('<p>The old password cannot be empty</p>');
        $('#alert').show(500);
        return false;
    } else {
        $('.oldPassword').removeClass('error');
    }
    if (newPassword != verPassword) {
        $('.newPassword').addClass('error');
        $('.verPassword').addClass('error');
        $('#alertMessage').text('');
        $('#alertMessage').append('<p>Please verify your new password, it\'s value is not same!</p>');
        return false;
    } else {
        $('.newPassword').removeClass('error');
        $('.verPassword').removeClass('error');
    }
});
$('.close').click(function() {
    $('#alert').hide(500);
});
