const EMPTY_SQUARE = {
  player: "",
  pieceId: ""
};

const emptyRow = [
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE,
  EMPTY_SQUARE
];
export const testBoard = (player, piece, row) => {
  const rowWithPiece = [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "black", pieceId: "pawn-8" },
    { player: "", pieceId: "" },
    { player, pieceId: `${piece}-0` },
    { player: "", pieceId: "" },
    { player: "black", pieceId: "pawn-9" },
    { player: "", pieceId: "" }
  ];
  return [
    emptyRow,
    [
      { player: "black", pieceId: "pawn-0" },
      { player: "black", pieceId: "pawn-1" },
      { player: "black", pieceId: "pawn-2" },
      { player: "black", pieceId: "pawn-3" },
      { player: "black", pieceId: "pawn-4" },
      { player: "black", pieceId: "pawn-5" },
      { player: "black", pieceId: "pawn-6" },
      { player: "black", pieceId: "pawn-7" }
    ],
    row === 2 ? rowWithPiece : emptyRow,
    row === 3 ? rowWithPiece : emptyRow,
    row === 4 ? rowWithPiece : emptyRow,
    row === 5 ? rowWithPiece : emptyRow,
    [
      { player: "white", pieceId: "pawn-0" },
      { player: "white", pieceId: "pawn-1" },
      { player: "white", pieceId: "pawn-2" },
      { player: "white", pieceId: "pawn-3" },
      { player: "white", pieceId: "pawn-4" },
      { player: "white", pieceId: "pawn-5" },
      { player: "white", pieceId: "pawn-6" },
      { player: "white", pieceId: "pawn-7" }
    ],
    row === 7 ? rowWithPiece : emptyRow
  ];
};

export const inCheckBoard = [
  [
    { player: "black", pieceId: "rook-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "rook-1" }
  ],
  emptyRow,
  [
    { player: "black", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  emptyRow,
  [
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "pawn-3" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],

  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    { player: "white", pieceId: "queen" },
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckmateBoard = [
  [
    { player: "black", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "rook-0" }
  ],
  emptyRow,
  [
    { player: "white", pieceId: "queen" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  emptyRow,
  emptyRow,
  [
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "pawn-3" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckCanTakeThreatWithKing = [
  [
    { player: "black", pieceId: "rook-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "rook-1" }
  ],
  [
    { player: "black", pieceId: "pawn-0" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-4" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-7" }
  ],
  [
    { player: "black", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "knight-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "pawn-3" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    { player: "white", pieceId: "queen" },
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckmateBoard2 = [
  // This scenario is possible if white queen takes a black piece on square b-6
  [
    { player: "black", pieceId: "rook-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "rook-1" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-4" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-7" }
  ],
  [
    { player: "black", pieceId: "king" },
    { player: "white", pieceId: "queen" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  emptyRow,
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "rook-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "pawn-3" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" }
  ]
];

export const oneMoveFromCheck = [
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    { player: "black", pieceId: "pawn-7" },
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  emptyRow,
  [
    { player: "white", pieceId: "queen" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-4" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const oneMoveFromCheck2 = [
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  emptyRow,
  [
    { player: "white", pieceId: "queen" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-4" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckBothSides = [
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  emptyRow,
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-4" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    { player: "white", pieceId: "queen" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckCanTakeThreatWithNonKing = [
  [
    { player: "black", pieceId: "rook-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "bishop-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "knight-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    { player: "black", pieceId: "queen" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "rook-1" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    EMPTY_SQUARE
  ]
];

export const inCheckCanBlockThreat = [
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  emptyRow,
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "rook-1" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    EMPTY_SQUARE
  ]
];

export const inCheckCanBlockMultipleThreats = [
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  emptyRow,
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "rook-1" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-0" },
    EMPTY_SQUARE
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-3" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    EMPTY_SQUARE
  ]
];

export const inCheckCannotBlockMultipleThreats = [
  // This scenario is possible if white bishop-0 moved from d-4 to b-6
  [
    { player: "black", pieceId: "rook-1" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-6" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  [
    { player: "black", pieceId: "knight-1" },
    { player: "white", pieceId: "bishop-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  emptyRow,
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "rook-1" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    { player: "white", pieceId: "knight-0" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    EMPTY_SQUARE
  ]
];

export const checkMateCannotDefendThreatsInSingleMove = [
  // Scenario possible if white knight-0 moves from d-4
  [
    { player: "black", pieceId: "rook-1" },
    { player: "black", pieceId: "knight-1" },
    { player: "black", pieceId: "bishop-1" },
    { player: "black", pieceId: "king" },
    { player: "black", pieceId: "queen" },
    { player: "black", pieceId: "bishop-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "rook-0" }
  ],
  [
    { player: "black", pieceId: "pawn-7" },
    { player: "black", pieceId: "pawn-6" },
    { player: "black", pieceId: "pawn-5" },
    EMPTY_SQUARE,
    { player: "black", pieceId: "pawn-3" },
    { player: "black", pieceId: "pawn-2" },
    { player: "black", pieceId: "pawn-1" },
    { player: "black", pieceId: "pawn-0" }
  ],
  [
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "knight-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    EMPTY_SQUARE
  ],
  emptyRow,
  emptyRow,
  emptyRow,
  [
    { player: "white", pieceId: "pawn-0" },
    { player: "white", pieceId: "pawn-1" },
    { player: "white", pieceId: "pawn-2" },
    { player: "white", pieceId: "rook-1" },
    { player: "white", pieceId: "pawn-4" },
    { player: "white", pieceId: "pawn-5" },
    { player: "white", pieceId: "pawn-6" },
    { player: "white", pieceId: "pawn-7" }
  ],
  [
    { player: "white", pieceId: "rook-0" },
    EMPTY_SQUARE,
    EMPTY_SQUARE,
    { player: "white", pieceId: "king" },
    EMPTY_SQUARE,
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    EMPTY_SQUARE
  ]
];
