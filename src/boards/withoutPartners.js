const EMPTY_SQUARE = {
  player: "",
  pieceId: ""
};

export default [
  [
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],

  [
    { player: "black", pieceId: "pawn-4" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE, EMPTY_SQUARE],
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "pawn-3" },
    { player: "white", pieceId: "pawn-4" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "king" },
    { player: "white", pieceId: "queen" },
    { player: "white", pieceId: "bishop-0" }
  ]
];
