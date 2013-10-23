$('#cancelButton').click(function(e) {
    e.preventDefault();
    window.location.href = "/";
});
$('#alert').hide();
$('#register').submit(function() {
    var name = $('#newUser-name');
    var username = $('#newUser-username');
    var password = $('#newUser-password');
    var verPassword = $('#newUser-verPassword');
    if (name.val() === '') {
        $('#alertMessage').text('');
        $('#alertMessage').append('<p>Name cannot be empty</p>');
        $('#alert').show(500);
        return false;
    }
});
$('.close').click(function() {
    $('#alert').hide(500);
});
