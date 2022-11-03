export type Position = number;
export type Stone = -1 | 0 | 1;
export type Move = number | VerboseMove;

export interface Options {
  width: number;
  height: number;
  winLength: number;
  turn: Stone;
}

interface VerboseMove {
  row: number;
  col: number;
}
