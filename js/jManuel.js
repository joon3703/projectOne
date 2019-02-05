// Initialize Firebase
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

    // Authentication function
    function submitCreateAccount() {
    // Authentication variables
    var displayName = document.querySelector("#entry-displayname");
    var email = document.querySelector("#entry-email");
    var password = document.querySelector("#entry-password");
    
    firebase.auth().createUserWithEmailAndPassword(email.value, paswordpassword.value)
        .then(function(user) {
            // add the displayName
            user.updateProfile({displayName: displayName.value});
    
    });
    
}

// Chat function
function sendChatMessage() {
    ref = firebase.databse().ref("/chat");
    messageField = document.querySelector("#chat-message");

    ref.push().set({
        name: firebase.auth().currentUser.displayName,
        message: messageField.value
    }); 
}