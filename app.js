// Gets a new object
// (the architecture allow us to not have to use the 'new' keyword here)
var g = G$("Alex", "Smith");

// User chainable methods
g.greet().setLang('es').greet(true).log();

// Use the Greetr object on the click of the login button
$('#btn-login').click(function(){

    // Create a new Greetr object (pretend we know the name from the login)
    var loginGreetr = G$('Super', 'Girl');

    // Hide the login on the screen
    $('.login-wrapper').hide();

    // Fire off an HTML greeting, passing the '.greeting' as the selector
    // and the chosen language, and log the welcome message as well
    loginGreetr.setLang($('#lang' ).val( )).HTMLGreeting($('.greeting'), true).log();

});
