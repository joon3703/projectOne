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

// ================================================= //
//  GLOBAL VARIABLES: CHATBOX
// ================================================= //

// Reference chat
var chatRef = database.ref('/chat');

// DOM cache chat
var $chatBtn = $('#chatBtn');
var $chatInput = $('#text-area');
var $chatUi = $('#chat-window').find('ul');
var userName = "";

// ================================================= //
//  DATABASE LISTENER: CHATBOX
// ================================================= //

// Create a realtime listener for incoming messages
chatRef.on('child_added', function(childSnapshot) {

    // Add message value into a variable
    var message = childSnapshot.val();
    console.log("msg: " + message);

    // Get name of sender
    // userName = $logUser.val().trim();

    // Append the new message to the chat window
    $chatUi.append("<li class='msg-entry'>" + message + "</li>");

});

// ================================================= //
//  BUTTON EVENT: SEND MESSAGE 
// ================================================= //

// Create a submit message event (click and keypress:enter)
function submit() {  

    // Push the current message from the text input onto the database
    chatRef.push($chatInput.val().trim(),
    );

    // Clear text input
    $chatInput.val('');  
}

// Trigger submit function: click & enter
$chatBtn.click(function() {
    submit();
});

$(document).on('keypress',function(event) {
    if(event.which == 13) {
        submit();
    }
});
