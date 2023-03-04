// создание игрового поля
export default function generateCells() {
  const cells = [];
  for (let row = 0; row < 16; row += 1) {
    cells.push([]);
    for (let col = 0; col < 16; col += 1) {
      cells[row].push({ bomb: false, state: 0 });
      // state 0 = не нажали, 1 = видимая, 2 = установить флаг
    }
  }

  // распределение бомб по игровому полю
  for (let i = 0; i < 40; i++) {
    let placedBomb = false;
    while (!placedBomb) {
      const row = Math.floor(Math.random() * 16);
      const col = Math.floor(Math.random() * 16);

      if (!cells[row][col].bomb) {
        cells[row][col].bomb = true;
        placedBomb = true;
        continue;
      }
    }
  }

  // расчет значений для каждой ячейки
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const cell = cells[row][col];
      if (cell.bomb) {
        cell.value = -1;
        continue;
      }

      // расставляем по полю;
      let counter = 0;
      if (row > 0 && col > 0 && cells[row - 1][col - 1].bomb) {
        counter++;
      }
      if (row > 0 && cells[row - 1][col].bomb) {
        counter++;
      }
      if (row > 0 && col < 15 && cells[row - 1][col + 1].bomb) {
        counter++;
      }
      if (col > 0 && cells[row][col - 1].bomb) {
        counter++;
      }
      if (col < 15 && cells[row][col + 1].bomb) {
        counter++;
      }
      if (row < 15 && col > 0 && cells[row + 1][col - 1].bomb) {
        counter++;
      }
      if (row < 15 && cells[row + 1][col].bomb) {
        counter++;
      }
      if (row < 15 && col < 15 && cells[row + 1][col + 1].bomb) {
        counter++;
      }

      cell.value = counter;
    }
  }

  return cells;
}
