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

// Reference database
var database = firebase.database();

// ================================================= //
// Reference chat
var chatRef = database.ref('/chat');

// DOM cache chat
var $chatBtn = $('#send');
var $chatInput = $('#message');
var $chatUl = $('#chat-window').find('ul');

// Create realtime listener for incoming messages
chatRef.on('child_added', function(childSnapshot) {
    
    // Add message value into a variable 
    var message = childSnapshot.val().msg
    console.log("msg: " + message);

    // Append the new message to the chat window
    $chatUl.append("<li class='msg-entry'>" + message + "</li>");

});

// Create a submit message event (click and keypress:enter)
function submit() {  

    // Push the current message from the text input onto the database
    chatRef.push({
        msg: $chatInput.val().trim(),
    });

    // Clear text input
    $chatInput.val('');  

}

// Trigger submit function: click
$chatBtn.click(function() {
    submit();
});

// Trigger submit function: enter
$(document).on('keypress',function(event) {
    if(event.which == 13) {
        submit();
    }
});

// ================================================= //