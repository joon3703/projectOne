var board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);

$(window).resize(board.resize);

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

var onChange = function(oldPos, newPos) {
  console.log("Position changed:");
  console.log("Old position: " + ChessBoard.objToFen(oldPos));
  console.log("New position: " + ChessBoard.objToFen(newPos));
  console.log("--------------------");
};

var cfg = {
  draggable: true,
  position: 'start',
  onChange: onChange
};

var board = ChessBoard('board', cfg);

$('#startPositionBtn').on('click', board.start);

// onChange ends here.
// This function disables the original START and CLEAR buttons.

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
});