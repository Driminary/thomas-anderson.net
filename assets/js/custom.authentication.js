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

        // Attach the click handler to the sign-in button
        auth2.attachClickHandler('gsignin', {}, onSuccess, onFailure);

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
        $("#gsignin").addClass("d-none");
        $("#gsignedin").text('Signed in as: ' + user.getBasicProfile().getName()).removeClass("d-none");
    } else { // Catch not signed in.
        console.log('Not signed in.')
        $("#gsignin").removeClass("d-none");
        $("#gsignedin").text("").addClass("d-none");
    }
 };

/**
 * Handle sign-in failures.
 */
var onFailure = function(error) {
    console.log(error);
};