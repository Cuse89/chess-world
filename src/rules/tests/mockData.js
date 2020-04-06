export const testBoard = (player, piece, row) => {
  const emptyRow = [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ];
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
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "white", pieceId: "pawn-0" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "rook-0" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "white", pieceId: "queen" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "bishop-1" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckCanTakeThreatBoard = [
  [
    { player: "black", pieceId: "rook-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "bishop-0" },
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "white", pieceId: "pawn-0" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "knight-0" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "white", pieceId: "bishop-0" },
    { player: "white", pieceId: "king" },
    { player: "white", pieceId: "queen" },
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" },
    { player: "white", pieceId: "rook-1" }
  ]
];

export const inCheckmateBoard2 = [
  [
    { player: "black", pieceId: "rook-0" },
    { player: "black", pieceId: "knight-0" },
    { player: "black", pieceId: "bishop-0" },
    { player: "", pieceId: "" },
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
    { player: "white", pieceId: "queen" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "rook-1" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "", pieceId: "" }
  ],
  [
    { player: "", pieceId: "" },
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
    { player: "", pieceId: "" },
    { player: "", pieceId: "" },
    { player: "white", pieceId: "bishop-1" },
    { player: "white", pieceId: "knight-1" }
  ]
];

export const oneMoveFromCheck = [
  [
    {
      player: "black",
      pieceId: "rook-1"
    },
    {
      player: "black",
      pieceId: "knight-1"
    },
    {
      player: "black",
      pieceId: "bishop-1"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "black",
      pieceId: "queen"
    },
    {
      player: "black",
      pieceId: "bishop-0"
    },
    {
      player: "black",
      pieceId: "knight-0"
    },
    {
      player: "black",
      pieceId: "rook-0"
    }
  ],
  [
    {
      player: "black",
      pieceId: "pawn-7"
    },
    {
      player: "black",
      pieceId: "pawn-6"
    },
    {
      player: "black",
      pieceId: "pawn-5"
    },
    {
      player: "black",
      pieceId: "king"
    },
    {
      player: "black",
      pieceId: "pawn-3"
    },
    {
      player: "black",
      pieceId: "pawn-2"
    },
    {
      player: "black",
      pieceId: "pawn-1"
    },
    {
      player: "black",
      pieceId: "pawn-0"
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "white",
      pieceId: "queen"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "black",
      pieceId: "pawn-4"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "pawn-3"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "white",
      pieceId: "pawn-0"
    },
    {
      player: "white",
      pieceId: "pawn-1"
    },
    {
      player: "white",
      pieceId: "pawn-2"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "pawn-4"
    },
    {
      player: "white",
      pieceId: "pawn-5"
    },
    {
      player: "white",
      pieceId: "pawn-6"
    },
    {
      player: "white",
      pieceId: "pawn-7"
    }
  ],
  [
    {
      player: "white",
      pieceId: "rook-0"
    },
    {
      player: "white",
      pieceId: "knight-0"
    },
    {
      player: "white",
      pieceId: "bishop-0"
    },
    {
      player: "white",
      pieceId: "king"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "bishop-1"
    },
    {
      player: "white",
      pieceId: "knight-1"
    },
    {
      player: "white",
      pieceId: "rook-1"
    }
  ]
];

export const oneMoveFromCheck2 = [
  [
    {
      player: "black",
      pieceId: "rook-1"
    },
    {
      player: "black",
      pieceId: "knight-1"
    },
    {
      player: "black",
      pieceId: "bishop-1"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "black",
      pieceId: "queen"
    },
    {
      player: "black",
      pieceId: "bishop-0"
    },
    {
      player: "black",
      pieceId: "knight-0"
    },
    {
      player: "black",
      pieceId: "rook-0"
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "black",
      pieceId: "pawn-6"
    },
    {
      player: "black",
      pieceId: "pawn-5"
    },
    {
      player: "black",
      pieceId: "king"
    },
    {
      player: "black",
      pieceId: "pawn-3"
    },
    {
      player: "black",
      pieceId: "pawn-2"
    },
    {
      player: "black",
      pieceId: "pawn-1"
    },
    {
      player: "black",
      pieceId: "pawn-0"
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "white",
      pieceId: "queen"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "black",
      pieceId: "pawn-4"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "pawn-3"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "white",
      pieceId: "king"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    }
  ],
  [
    {
      player: "white",
      pieceId: "pawn-0"
    },
    {
      player: "white",
      pieceId: "pawn-1"
    },
    {
      player: "white",
      pieceId: "pawn-2"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "pawn-4"
    },
    {
      player: "white",
      pieceId: "pawn-5"
    },
    {
      player: "white",
      pieceId: "pawn-6"
    },
    {
      player: "white",
      pieceId: "pawn-7"
    }
  ],
  [
    {
      player: "white",
      pieceId: "rook-0"
    },
    {
      player: "white",
      pieceId: "knight-0"
    },
    {
      player: "white",
      pieceId: "bishop-0"
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "",
      pieceId: ""
    },
    {
      player: "white",
      pieceId: "bishop-1"
    },
    {
      player: "white",
      pieceId: "knight-1"
    },
    {
      player: "white",
      pieceId: "rook-1"
    }
  ]
];

export const inCheckBothSides = [
  [
    {
      "player": "black",
      "pieceId": "rook-1"
    },
    {
      "player": "black",
      "pieceId": "knight-1"
    },
    {
      "player": "black",
      "pieceId": "bishop-1"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "black",
      "pieceId": "queen"
    },
    {
      "player": "black",
      "pieceId": "bishop-0"
    },
    {
      "player": "black",
      "pieceId": "knight-0"
    },
    {
      "player": "black",
      "pieceId": "rook-0"
    }
  ],
  [
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "black",
      "pieceId": "pawn-6"
    },
    {
      "player": "black",
      "pieceId": "pawn-5"
    },
    {
      "player": "black",
      "pieceId": "king"
    },
    {
      "player": "black",
      "pieceId": "pawn-3"
    },
    {
      "player": "black",
      "pieceId": "pawn-2"
    },
    {
      "player": "black",
      "pieceId": "pawn-1"
    },
    {
      "player": "black",
      "pieceId": "pawn-0"
    }
  ],
  [
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    }
  ],
  [
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "black",
      "pieceId": "pawn-4"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    }
  ],
  [
    {
      "player": "white",
      "pieceId": "queen"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "white",
      "pieceId": "pawn-3"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    }
  ],
  [
    {
      "player": "white",
      "pieceId": "king"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    }
  ],
  [
    {
      "player": "white",
      "pieceId": "pawn-0"
    },
    {
      "player": "white",
      "pieceId": "pawn-1"
    },
    {
      "player": "white",
      "pieceId": "pawn-2"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "white",
      "pieceId": "pawn-4"
    },
    {
      "player": "white",
      "pieceId": "pawn-5"
    },
    {
      "player": "white",
      "pieceId": "pawn-6"
    },
    {
      "player": "white",
      "pieceId": "pawn-7"
    }
  ],
  [
    {
      "player": "white",
      "pieceId": "rook-0"
    },
    {
      "player": "white",
      "pieceId": "knight-0"
    },
    {
      "player": "white",
      "pieceId": "bishop-0"
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "",
      "pieceId": ""
    },
    {
      "player": "white",
      "pieceId": "bishop-1"
    },
    {
      "player": "white",
      "pieceId": "knight-1"
    },
    {
      "player": "white",
      "pieceId": "rook-1"
    }
  ]
]
