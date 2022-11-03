declare type Position = number;
declare type Stone = -1 | 0 | 1;
declare type Move = number | VerboseMove;
interface Options {
    width: number;
    height: number;
    winLength: number;
    turn: Stone;
}
interface VerboseMove {
    row: number;
    col: number;
}

declare class Board {
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

declare function search(b: Board, depth: number): number;

declare const Game: {
    Board: typeof Board;
    search: typeof search;
};

export { Board, Game as default, search };
