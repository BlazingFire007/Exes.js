import { Board, Position } from './types';
export default function search(b: Board, depth: number) {
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

function negamax(board: Board, depth: number, alpha: number, beta: number): number {
  if (board.isOver || depth === 0) {
    if (board.winner === -1) return 0;
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
    if (alpha >= beta) break;
  }
  return bestScore;
}

function shuffle(moves: Position[]) {
  for (let i = moves.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [moves[i], moves[j]] = [moves[j], moves[i]];
  }
  return moves;
}
