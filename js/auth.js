// Initialize firebase
var config = {
    apiKey: "AIzaSyDbUkGBWrOhci0h0LlBUun-nXEa5XIFAU8",
    authDomain: "projectone-641c8.firebaseapp.com",
    databaseURL: "https://projectone-641c8.firebaseio.com",
    projectId: "projectone-641c8",
    storageBucket: "projectone-641c8.appspot.com",
    messagingSenderId: "1024028131590"
    };
    firebase.initializeApp(config);

// Establish database
var database = firebase.database();

// DOM cache for auth functions
var logEmail = document.getElementById('email');
var logPassword = document.getElementById('password');
var newNameFirst = document.getElementById('firstName');
var newNameLast = document.getElementById('lastName');
var newEmail = document.getElementById('newEmail');
var newPassword = document.getElementById('newPassword');
var btnLogin = document.getElementById('login-btn');
var btnLogout = document.getElementById('logout-btn');
var btnSignup = $('#signup-btn');
var btnCreateAcc = document.getElementById('create-btn');


// Add log-in event
btnLogin.addEventListener('click', e => {

    // Get email and pass
    var email = logEmail.value;
    var pass = logPassword.value;
    var auth = firebase.auth();

    // Sign in w/ any error console logged
    var signIn = auth.signInWithEmailAndPassword(email, pass);
    signIn.catch(e => console.log(e.message));

    // Show log out button and main page
    $('.logout-btn').css('display', 'unset');
    $('.cloak-main').css('display', 'unset');
    $('.cloak-log').css('display', 'none');


});

// Switch screens to sign-up
btnSignup.click(function () {

    $('.cloak-signup').css('display', 'unset');
    $('.cloak-log').css('display', 'none');
    
});

// Add create a new account event
btnCreateAcc.addEventListener('click', e => {

    // Get email and pass
    var email = newEmail.value;
    var pass = newPassword.value;
    var auth = firebase.auth();

    // Sign up w/ any error console logged
    var signUp = auth.createUserWithEmailAndPassword(email, pass);
    signUp.catch(e => console.log(e.message));

    // Switch back to log in screen
    $('.cloak-log').css('display', 'unset');
    $('.cloak-signup').css('display', 'none');

});

// Log-out event
btnLogout.click(function() {

    // Sign out
    firebase.auth().signOut();

    // Switch back to log in screen
    $('.cloak-log').css('display', 'unset');
    $('.logout-btn').css('display', 'none');
    $('.cloak-main').css('display', 'none');    

});

// Add a realtime listener if user is logged in or not

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log('not logged in');
        btnLogout.classList.add('hide');
    }
});
// ================================================= //