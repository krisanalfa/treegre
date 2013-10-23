var username = $('#username').val();
$('#cancelButton').click(function(e) {
    e.preventDefault();
    window.location.href = "/users/" + username;
});
$('#logout').click(function(e) {
    e.preventDefault();
    window.location.href = "/logout";
});
$('#change-user-password').click(function(e) {
    e.preventDefault();
    $('#changePassword').modal('show');
});
$('#cancel').click(function(e) {
    e.preventDefault();
    $('#changePassword').modal('hide');
});
