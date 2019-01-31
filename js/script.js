var board1 = ChessBoard('board1', 'start');

var board2 = ChessBoard('board2', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
  });
  $('#startBtn').on('click', board2.start);
  $('#clearBtn').on('click', board2.clear);