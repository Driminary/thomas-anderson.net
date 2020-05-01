/**
 * The Sign-In client object.
 */
var auth2;
var userdetails;

/**
 * Initializes the Sign-In client.
 */
var appStart = function() {
    gapi.load('auth2', function(){
        /**
         * Retrieve the singleton for the GoogleAuth library and set up the
         * client.
         */
        auth2 = gapi.auth2.init({
            client_id: '654558835136-q9cqi3n4phvojlf93oqo2q08gtlt38hd.apps.googleusercontent.com'
        });

        gapi.signin2.render('gsignin', {
        'scope': 'profile email openid',
        'longtitle': false,
        'width': 90,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
        });

        // Listen for user changes.
        auth2.currentUser.listen(onSuccess);

    });
};

/**
 * Handle successful sign-ins.
 */
var onSuccess = function(user) {
    if (auth2.isSignedIn.get()) {
        console.log('Signed in as ' + user.getBasicProfile().getName());
        userdetails = user;
        $("#gsignin").addClass("d-none").removeClass("d-flex justify-items-center");
        $("#gsignout").removeClass("d-none");
        $("#gsignedin")
            .text('Signed In:')
            .append('<br />' + user.getBasicProfile().getName())
            .append('<br />' + user.getBasicProfile().getEmail());

        // Set state
        var id_token = user.getAuthResponse().id_token;

        $.ajax({
            type: "POST",
            url: "/auth",
            data: JSON.stringify({ token: id_token }),
            success: function( data ) {
                alert( "Cookie set, response: " + data );
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        
    } else { // Catch not signed in.
        console.log('Not signed in.')
        $("#gsignin").removeClass("d-none").addClass("d-flex justify-items-center");
        $("#gsignout").addClass("d-none");
        $("#gsignedin").text("Not Signed In");
    }
 };

/**
 * Handle sign-in failures.
 */
var onFailure = function(error) {
    console.log(error);
};

/**
 * Handle Sign-Out.
 */
var signOut = function() {
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}