// создание игровой борды (колонки и строки)
export default function initBoard() {
  const board = [];
  for (let row = 0; row < 16; row += 1) {
    board.push([]);
    for (let col = 0; col < 16; col += 1) { board[row].push(({ bomb: false, state: 0 })); }
  }
  return board;
}
