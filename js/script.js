<<<<<<< HEAD
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

var whitePlayer = "white logged out";
var blackPlayer = "black logged out";
// Starting position as a FEN string
var position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

$("#white-login-button").on("click", function(event) {
  if($("#white-sign-in").val() === "") {
    alert("Type your name in the field");
    return;
  }
  whitePlayer = $("#white-sign-in").val().trim();

  $("#white-logout-button").text(whitePlayer + " sign-out");
  disableSignin('white');
  
  // Update Firebase database for the two players
  // when white logs in.
  updateDatabase();
});

$("#black-login-button").on("click", function(event) {
  if($("#black-sign-in").val() === "") {
    alert("Type your name in the field");
    return;
  }
  blackPlayer = $("#black-sign-in").val().trim();

  $("#black-logout-button").text(blackPlayer + " sign-out");
  disableSignin('black');
  
  // Update Firebase database for the two players
  // when black logs in.
  updateDatabase();
});

function disableSignin(player) {
  var loginField = '.' + player + '-input';
  var loginButton = '#' + player + '-login-button';
  var logoutButton = '#' + player + '-logout-button';
  $(loginField).hide();
  $(loginButton).hide();
  $(logoutButton).show();
}

function enableSignin(player) {
  var loginField = '.' + player + '-input';
  var loginButton = '#' + player + '-login-button';
  var logoutButton = '#' + player + '-logout-button';
  $(loginField).show();
  $(loginButton).show();
  $(logoutButton).hide();
}

$("#white-logout-button").on("click", function(event) {
  whitePlayer = "white logged out";
  $("#white-logout-button").hide();
  $('#white-sign-in').val('');
  $('#white-sign-in').next().removeClass('active');
  $(".white-input").show();
  $("#white-login-button").show();
  updateDatabase();
});

$("#black-logout-button").on("click", function(event) {
  blackPlayer = "black logged out";
  $("#black-logout-button").hide();
  $('#black-sign-in').val('');
  $('#black-sign-in').next().removeClass('active');
  $(".black-input").show();
  $("#black-login-button").show();
  updateDatabase();
});

function resetGame() {
  $("#white-logout-button").hide();
  $("#black-logout-button").hide();
  $(".white-input").show();
  $(".black-input").show();
  $("#white-login-button").show();
  $("#black-login-button").show();
  $('.move-number').prepend("<p>&nbsp;</p>");
  $('.white-moves').prepend("<p class='scoresheet-header-white'>WHITE</p>");
  $('.black-moves').prepend("<p class='scoresheet-header-black'>BLACK</p>");
}

function updateDatabase() {
  event.preventDefault();
  database.ref().set({
    whitePlayer: whitePlayer,
    blackPlayer: blackPlayer,
    position: position
  });
}

// do not pick up pieces if the game is over
// only pick up pieces for White
var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';

  // highlight white's move
  removeHighlights('white');
  boardEl.find('.square-' + source).addClass('highlight-white');
  boardEl.find('.square-' + target).addClass('highlight-white');

  // make random move for black
  window.setTimeout(makeRandomMove, 250);
};

var onMoveEnd = function() {
  boardEl.find('.square-' + squareToHighlight)
    .addClass('highlight-black');
    console.log("Highlighted: " + squareToHighlight);
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  // board.position(game.fen());
  // updateDatabase();
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMoveEnd: onMoveEnd
  // ,
  // onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

// Show position in FEN
// Update position in Firebase
function clickGetPositionBtn() {
  position = board.fen();
  $('#fen').html(position);
  updateDatabase();
}

$('#submitMoveBtn').on('click', clickGetPositionBtn);

function clearSignInValue(player) {
  if(player === 'white') {
    whitePlayer = "white logged out";
  }
  if(player === 'black') {
    blackPlayer = "black logged out";
  } 
  $('#' + player + '-sign-in').val('');
  $('#' + player + '-sign-in').next().removeClass('active');

}

// $('#testBtn').on('click', configureBoard);
// function configureBoard() {
//   console.log("Position: " + position);
//   // Enter any FEN as an argument to this function and it will set the pieces on the board accordingly.
//   board.position(position);
// }

database.ref().on("value", function(snapshot) {

  whitePlayer = snapshot.val().whitePlayer;
  blackPlayer = snapshot.val().blackPlayer;
  position = snapshot.val().position

  // Change the HTML to reflect current state of the game
  if (whitePlayer === "white logged out") {
    clearSignInValue('white');
    enableSignin('white');
  } else {
    $("#white-logout-button").text(whitePlayer + " sign-out");
    disableSignin('white');
  }

  if (blackPlayer === "black logged out") {
    clearSignInValue('black');
    enableSignin('black');
  } else  {
    $("#black-logout-button").text(blackPlayer + " sign-out");
    disableSignin('black');
  }
  
  board.position(position);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// var chatRef = database.ref('/chat');

// var onSnapEnd = function() { 
//   console.log(board.position());
// };

var board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
  // ,
  // onSnapEnd: onSnapEnd
});
=======
// OUR WORKING JS PART
// Populate the Chessboard
var abChess = {};
var options = {
    animated: false
};
abChess = new AbChess("chessboard", options);
abChess.setFEN();
>>>>>>> 276f8bcfe64e785ca657b00c4057f9a9257680f2

// Activate Empty and Start buttons.
var clearButton = document.getElementById("clearButton");
var clearFEN = "8/8/8/8/8/8/8/8 w - - 0 1";
var startButton = document.getElementById("startButton");
clearButton.addEventListener("click", function () {
    if (abChess.isValidFEN(clearFEN)) {
        abChess.setFEN(clearFEN);
    }
});
startButton.addEventListener("click", function () {
    abChess.setFEN();
});

// Extra stuff
var pgnEl = $('#pgn');

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }
  pgnEl.html(game.pgn());
};

$(window).resize(board.resize);

// These are sample moves to show how the scoresheet should look.
var moves = [
  { white:"e4" , black:"e5" },
  { white:"Nf3" , black:"Nc6" },
  { white:"Bb5" , black:"Nf6" },
  { white:"Nc3" , black:"Bc5" },
  { white:"0-0" , black:"d5" },
  { white:"exd5" , black:"Nxd5" },
  { white:"Nxd5" , black:"Qxd5" },
  { white:"Bxc6+" , black:"bxc6" },
  { white:"c3" , black:"0-0" },
  { white:"Ng5" , black:"e4" },
  { white:"d4" , black:"exd3(ep)" },
  { white:"Qf3" , black:"d2" },
  { white:"Qxd5" , black:"dxc1=Q" },
  { white:"Raxc1" , black:"cxd5" },
  { white:"Kh1" , black:"Bb7" },
  { white:"f4" , black:"Rfe8" },
  { white:"Nh3" , black:"Rad8" },
  { white:"Rcd1" , black:"f6" },
  { white:"Rfc1" , black:"d4++" }
];

function notateMoves() {
  for(var i = 0; i < moves.length; i++) {
    $('.move-number').append("<p>" + (i+1) + "</p>");
    $('.white-moves').append("<p>" + moves[i].white + "</p>");
    $('.black-moves').append("<p>" + moves[i].black + "</p>");
  }
}

function adjustForSmallScreen() {
  if(window.outerWidth < 455) {
    $('#board').width('350px');
  } else {
    $('#board').width('100%');
  }
}

// ================================================= //
//  GLOBAL VARIABLES: CHATBOX
// ================================================= //

// Reference chat
var chatRef = database.ref('/chat');

// DOM cache chat
var $chatBtn = $('#chatBtn');
var $chatInput = $('#message');
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
    chatRef.push($chatInput.val().trim());

    // Clear text input
    $chatInput.val('');  
}

// Trigger submit function: click & enter
$chatBtn.click(function() {
    submit();
});

// What is this?
// $(document).on('keypress',function(event) {
//   if(event.which == 13) {
//     submit();
//   }
// });

$( document ).ready(function() {
  notateMoves();
  $('.move-number').prepend("<p>&nbsp;</p>");
  $('.white-moves').prepend("<p class='scoresheet-header-white'>WHITE</p>");
  $('.black-moves').prepend("<p class='scoresheet-header-black'>BLACK</p>");
  // updateDatabase();
  
  // resetGame();
});
