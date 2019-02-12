var whitePlayer = "White";
var blackPlayer = "Black";

$("#white-login-button").on("click", function(event) {
  if($("#white-sign-in").val() === "") {
    alert("Type your name in the field");
    return;
  }
  whitePlayer = $("#white-sign-in").val().trim();

  $("#white-logout-button").text(whitePlayer + " sign-out");
  disableSignin('.white-input', '#white-login-button', '#white-logout-button');
  
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
  disableSignin('.black-input', '#black-login-button', '#black-logout-button');
  
  // Update Firebase database for the two players
  // when black logs in.
  updateDatabase();
});

function disableSignin(player, login, logout) {
  $(player).hide();
  $(login).hide();
  $(logout).show();
}

$("#white-logout-button").on("click", function(event) {
  whitePlayer = "White";
  $("#white-logout-button").hide();
  $('#white-sign-in').val('');
  $('#white-sign-in').next().removeClass('active');
  $(".white-input").show();
  $("#white-login-button").show();
  updateDatabase();
});

$("#black-logout-button").on("click", function(event) {
  blackPlayer = "Black";
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

}

function updateDatabase() {
  event.preventDefault();
  database.ref().set({
    whitePlayer: whitePlayer,
    blackPlayer: blackPlayer
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
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMoveEnd: onMoveEnd,
  onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);

// Show position in FEN
function clickGetPositionBtn() {
    
  $('#fen').html(board.fen());
}

$('#submitBtn').on('click', clickGetPositionBtn);

var onSnapEnd = function() { 
  console.log(board.position());
};

var board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true,
  onSnapEnd: onSnapEnd
});

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);

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

// TODO: Incorporate onChange function to generate the scoresheet 
// onChange function starts here.
// Open the console log and move a piece.
// This function takes in the old position (of the entire board, 
// written as a FEN string) and the new position.
// By comparing the two positions, we can write a JS function
// that returns just the piece moved in Algebraic Chess Notation
// to populate the columns on the Scoresheet.
// Algebraic notation: 
// http://blog.chesshouse.com/how-to-read-and-write-algebraic-chess-notation/
// Forsyth–Edwards Notation:
// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#Examples

// var onChange = function(oldPos, newPos) {
//   console.log("Position changed:");
//   console.log("Old position: " + ChessBoard.objToFen(oldPos));
//   console.log("New position: " + ChessBoard.objToFen(newPos));
//   console.log("--------------------");
// };

// var cfg = {
//   draggable: true,
//   position: 'start',
//   onChange: onChange
// };

// var board = ChessBoard('board', cfg);

// $('#startPositionBtn').on('click', board.start);

// onChange ends here.


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
  $('.move-number').append("<p>&nbsp;</p>");
  $('.white-moves').append("<p class='scoresheet-header-white'>WHITE</p>");
  $('.black-moves').append("<p class='scoresheet-header-black'>BLACK</p>");
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

$( document ).ready(function() {
  notateMoves();
  resetGame();
});
