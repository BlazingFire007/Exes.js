import Board from './board';
import search from './engine';
export { Board } from './board';
export { search } from './engine';
const Game = {
  Board: Board,
  search: search,
};

export default Game;
