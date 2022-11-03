import { Options, Stone, Move, Position } from './types';

const defaults = {
  width: 3,
  height: 3,
  winLength: 3,
  turn: 1 as Stone,
};

export class Board {
  width: number;
  height: number;
  size: number;
  winLength: number;
  internal: Stone[];
  turn: Stone;
  constructor(options?: Options) {
    options = Object.assign({}, defaults, options);
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
      if (stone === -1) acc.push(index);
      return acc;
    }, [] as number[]);
  }

  get winner(): Stone {
    const { width, height, winLength } = this;
    const { internal } = this;
    const check = (x: number, y: number, dx: number, dy: number) => {
      const first = internal[x + y * width];
      if (first === -1) return -1;
      for (let i = 1; i < winLength; i++) {
        const stone = internal[x + dx * i + (y + dy * i) * width];
        if (stone !== first) return -1;
      }
      return first;
    };
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (x <= width - winLength) {
          const winner = check(x, y, 1, 0);
          if (winner !== -1) return winner;
        }
        if (y <= height - winLength) {
          const winner = check(x, y, 0, 1);
          if (winner !== -1) return winner;
        }
        if (x <= width - winLength && y <= height - winLength) {
          const winner = check(x, y, 1, 1);
          if (winner !== -1) return winner;
        }
        if (x >= winLength - 1 && y <= height - winLength) {
          const winner = check(x, y, -1, 1);
          if (winner !== -1) return winner;
        }
      }
    }
    return -1;
  }

  get isDraw(): boolean {
    return this.winner === -1 && this.moves.length === 0;
  }

  get isOver(): boolean {
    return this.winner !== -1 || this.isDraw;
  }

  move(move: Move): boolean {
    if (typeof move === 'number') {
      if (this.internal[move] !== -1) return false;
      this.internal[move] = this.turn;
      this.turn ^= 1;
      return true;
    }
    const { row, col } = move;
    if (this.internal[row * this.width + col] !== -1) return false;
    this.internal[row * this.width + col] = this.turn;
    this.turn ^= 1;
    return true;
  }

  undo(pos: Position): void {
    this.internal[pos] = -1;
    this.turn ^= 1;
  }

  load(moves: Position[]): void {
    moves.forEach((move) => this.move(move));
  }

  print(): void {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const output = this.internal.map((stone) => {
      switch (stone) {
        case -1:
          return ' ';
        case 0:
          return 'O';
        case 1:
          return 'X';
      }
    });
    for (let i = 0; i < this.height; i++) {
      console.log(
        `|${((this.height - i).toString() + '|: ').padEnd(5)}|${output
          .slice(i * this.width, (i + 1) * this.width)
          .join('|')}|`,
      );
    }
    let str = '';
    const gap = '      ';

    str += gap + '-'.repeat(this.width * 2 + 1) + '\n';
    str += gap + '|' + alphabet.slice(0, this.width).join('|') + '|\n';
    console.log(str);
    console.log(`Turn: ${this.turn === 0 ? 'O' : 'X'}`);
  }
}

export default Board;
