$(document).ready(function() {
    $(document).on("keypress", "#login input", function(e) { 
        if(e.which === 13) {
            authenticate();
        }
    });
    $(document).on('click', '#login button', function() {
        authenticate();
    });

    // Open a link
    $('a.link').click(function() {
        chrome.tabs.create({ url: $(this).prop('href') });
    });
});
function authenticate() {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
        type: 'POST',
        url: 'http://websterday.skurty.com/ws/users/authenticate',
        data: { username: username, password: password }
    }).done(function(data) {
        if (data.token) { // Authentified
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else { // Error
            if (data.error) {
                $('#error').html(data.error);
            }
        }
    });
}