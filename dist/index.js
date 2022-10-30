// src/board.ts
var defaults = {
  width: 3,
  height: 3,
  winLength: 3,
  turn: 1
};
var Board = class {
  width;
  height;
  size;
  winLength;
  internal;
  turn;
  constructor(options) {
    if (!options)
      options = defaults;
    this.width = options.width;
    this.height = options.height;
    this.size = options.width * options.height;
    this.winLength = options.winLength;
    this.turn = options.turn;
    this.internal = [...Array(this.size)].map(() => -1);
    return this;
  }
  get moves() {
    return this.internal.reduce((acc, stone, index) => {
      if (stone === -1)
        acc.push(index);
      return acc;
    }, []);
  }
  get winner() {
    const { width, height, winLength } = this;
    const { internal } = this;
    const check = (x, y, dx, dy) => {
      const first = internal[x + y * width];
      if (first === -1)
        return -1;
      for (let i = 1; i < winLength; i++) {
        const stone = internal[x + dx * i + (y + dy * i) * width];
        if (stone !== first)
          return -1;
      }
      return first;
    };
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x <= width - winLength) {
          const winner = check(x, y, 1, 0);
          if (winner !== -1)
            return winner;
        }
        if (y <= height - winLength) {
          const winner = check(x, y, 0, 1);
          if (winner !== -1)
            return winner;
        }
        if (x <= width - winLength && y <= height - winLength) {
          const winner = check(x, y, 1, 1);
          if (winner !== -1)
            return winner;
        }
        if (x >= winLength - 1 && y <= height - winLength) {
          const winner = check(x, y, -1, 1);
          if (winner !== -1)
            return winner;
        }
      }
    }
    return -1;
  }
  get isDraw() {
    return this.winner === -1 && this.moves.length === 0;
  }
  get isOver() {
    return this.winner !== -1 || this.isDraw;
  }
  move(move) {
    if (typeof move === "number") {
      if (this.internal[move] !== -1)
        return false;
      this.internal[move] = this.turn;
      this.turn ^= 1;
      return true;
    }
    const { row, col } = move;
    if (this.internal[row * this.width + col] !== -1)
      return false;
    this.internal[row * this.width + col] = this.turn;
    this.turn ^= 1;
    return true;
  }
  undo(pos) {
    this.internal[pos] = -1;
    this.turn ^= 1;
  }
  load(moves) {
    moves.forEach((move) => this.move(move));
  }
  print() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const output = this.internal.map((stone) => {
      switch (stone) {
        case -1:
          return " ";
        case 0:
          return "O";
        case 1:
          return "X";
      }
    });
    for (let i = 0; i < this.height; i++) {
      console.log(
        `|${((this.height - i).toString() + "|: ").padEnd(5)}|${output.slice(i * this.width, (i + 1) * this.width).join("|")}|`
      );
    }
    let str = "";
    const gap = "      ";
    str += gap + "-".repeat(this.width * 2 + 1) + "\n";
    str += gap + "|" + alphabet.slice(0, this.width).join("|") + "|\n";
    console.log(str);
    console.log(`Turn: ${this.turn === 0 ? "O" : "X"}`);
  }
};
var board_default = Board;

// src/engine.ts
function search(b, depth) {
  const moves = shuffle(b.moves);
  let bestScore = -Infinity;
  let bestMove = moves[0];
  let alpha = -Infinity;
  let beta = Infinity;
  for (const move of moves) {
    b.move(move);
    const score = -negamax(b, depth - 1, -beta, -alpha);
    b.undo(move);
    console.log(`Move: ${move}, Score: ${score}`);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}
function negamax(board, depth, alpha, beta) {
  if (board.isOver || depth === 0) {
    if (board.winner === -1)
      return 0;
    else {
      return board.winner === board.turn ? 100 : -100;
    }
  }
  let bestScore = -Infinity;
  for (const move of board.moves) {
    board.move(move);
    const score = -negamax(board, depth - 1, -beta, -alpha);
    board.undo(move);
    bestScore = Math.max(score, bestScore);
    alpha = Math.max(alpha, score);
    if (alpha >= beta)
      break;
  }
  return bestScore;
}
function shuffle(moves) {
  for (let i = moves.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [moves[i], moves[j]] = [moves[j], moves[i]];
  }
  return moves;
}

// src/index.ts
var Game = {
  Board: board_default,
  search
};
var src_default = Game;
export {
  src_default as default
};
