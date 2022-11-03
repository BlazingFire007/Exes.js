# Exes.js

A small library for managing Tic-Tac-Toe like games.

- [Exes.js](#exesjs)
- [Installation](#installation)
  - [CJS](#cjs)
  - [ESM](#esm)
- [Usage](#usage)
  - [Board](#board)
    - [Basics](#basics)
    - [Create a New Board](#create-a-new-board)
    - [Making a Move](#making-a-move)
    - [Undoing a Move](#undoing-a-move)
    - [Load](#load)
  - [Search](#search)
- [Example](#example)
  - [Unbeatable Tic Tac Toe Computer](#unbeatable-tic-tac-toe-computer)

# Installation

```sh
npm i exesjs
```

## CJS

```js
const { Board, search } = require('exesjs');
```

## ESM

```js
import { Board, search } from 'exesjs';
```

# Usage

There are two main components to this library.

## Board

### Basics

The board manages things like which player's turn it is, placing a move, checking if the game is over, etc.

`Board.internal` is the internal representation of the game board. It is a one-dimensional array of numbers.

- `-1` Represents an empty space.
- `0` Represents a space occupied by 'O.'
- `1` Represents a space occupied by 'X.'

### Create a New Board

You can create a board by specifying a `width`, `height`, `winLength`, and `turn`.

```js
const b = new Board({ width: 3, height: 3, winLength: 3, turn: 1 });
// Or leave the options blank to get a tic tac toe board.
const b = new Board();
```

### Making a Move

Make moves on the board by calling `board.move()`
It accepts two methods of moving.

**Standard Move**

A standard move can be made by simply passing a number — the position you want to play — to `board.move`.

```js
const board = new Board();
board.move(4);
/*
-1 -1 -1
-1  1 -1
-1 -1 -1
*/
```

You can also specify a verbose move.

```js
const board = new Board();
board.move({
  row: 2,
  col: 2,
});
/*
-1 -1 -1
-1  1 -1
-1 -1 -1
*/
```

**You do not need to manually change `board.turn`, as it does so automatically.**

### Undoing a Move

You can undo a move by simply passing in the position you want to remove. Once again, the turn is automatically adjusted.

```js
const board = new Board();
board.move(4);
/*
-1 -1 -1
-1  1 -1
-1 -1 -1
*/
board.undo(4);
/*
-1 -1 -1
-1 -1 -1
-1 -1 -1
*/
```

### Load

You can load an array of moves into the board.
Note: these moves must not be verbose.

```js
const board = new Board();
board.load([4, 0, 8]);
/*
 0 -1 -1
-1  1 -1
-1 -1  1
*/
```

## Search

You can have the computer pick a move by using the `search` function.

You must provide the search depth. But use caution, with great boards comes great search time.

```js
const board = new Board();
board.load([4, 0, 8]);
/*
 0 -1 -1
-1  1 -1
-1 -1  1
*/
const bestMove = search(board, 4);
```

# Example

## Unbeatable Tic Tac Toe Computer

```js
import { Board, search } from 'exesjs';
import readlineSync from 'readline-sync';

const board = new Board();

while (!board.isOver) {
  const move = search(board, 9);
  board.move(move);
  if (board.isOver) break;

  board.print();

  console.log('Your move: ');
  const input = readlineSync.question();

  board.move(parseInt(input));
}

board.print();
console.log(board.winner + ' wins!');
```
