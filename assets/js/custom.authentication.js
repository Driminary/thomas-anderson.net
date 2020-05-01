var auth2; // The Sign-In object.
var googleUser; // The current user.


/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  gapi.load('auth2', initSigninV2);
};


/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
  auth2 = gapi.auth2.init({
      client_id: '654558835136-q9cqi3n4phvojlf93oqo2q08gtlt38hd.apps.googleusercontent.com',
      scope: 'profile email openid'
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  } else {
    auth2.attachClickHandler($('#gsignin'), {},
        function(googleUser) {
            console.log('Successful sign in');
        },
        function(error) {
            alert(JSON.stringify(error, undefined, 2));
        }
    );
  }

  // Start with the current live values.
  refreshValues();
};


/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
};


/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user) {
  console.log('User now: ', user);
  googleUser = user;
  updateGoogleUser();
};


/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function () {
  if (googleUser) {
    console.log(JSON.stringify(googleUser, undefined, 2));
  } else {
    console.log('No User');
  }
};


/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();

    console.log('Signed In: ',auth2.isSignedIn.get());

    updateGoogleUser();
  }
}
