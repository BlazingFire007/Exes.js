declare module "types" {
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
    export interface Board {
        width: number;
        height: number;
        winLength: number;
        turn: Stone;
        internal: Stone[];
        moves: Position[];
        winner: Stone;
        isDraw: boolean;
        isOver: boolean;
        move(move: Move): boolean;
        undo(pos: Position): void;
        load(moves: Position[]): void;
        print(): void;
    }
}
declare module "board" {
    import { Options, Stone, Move, Position } from "types";
    export class Board {
        width: number;
        height: number;
        size: number;
        winLength: number;
        internal: Stone[];
        turn: Stone;
        constructor(options?: Options);
        get moves(): number[];
        get winner(): Stone;
        get isDraw(): boolean;
        get isOver(): boolean;
        move(move: Move): boolean;
        undo(pos: Position): void;
        load(moves: Position[]): void;
        print(): void;
    }
    export default Board;
}
declare module "engine" {
    import { Board } from "types";
    export function search(b: Board, depth: number): number;
    export default search;
}
declare module "index" {
    import Board from "board";
    import search from "engine";
    export { Board } from "board";
    export { search } from "engine";
    const Game: {
        Board: typeof Board;
        search: typeof search;
    };
    export default Game;
}
