import setCellProp from './setCellProp';

// логика открытия ячеек
export default function openMultiple(cellsParam, rowParam, colParam) {
  let newCells = setCellProp(cellsParam, rowParam, colParam, 'state', 1);

  const topLeftCell = rowParam > 0 && colParam > 0
    ? cellsParam[rowParam - 1][colParam - 1]
    : null;
  const topCell = rowParam > 0 ? cellsParam[rowParam - 1][colParam] : null;
  const topRightCell = rowParam > 0 && colParam < 15
    ? cellsParam[rowParam - 1][colParam + 1]
    : null;
  const leftCell = colParam > 0 ? cellsParam[rowParam][colParam - 1] : null;
  const rightCell = colParam < 15 ? cellsParam[rowParam][colParam + 1] : null;
  const bottomLeftCell = rowParam < 15 && colParam > 0
    ? cellsParam[rowParam + 1][colParam - 1]
    : null;
  const bottomCell = rowParam < 15 ? cellsParam[rowParam + 1][colParam] : null;
  const bottomRightCell = rowParam < 15 && colParam < 15
    ? cellsParam[rowParam + 1][colParam + 1]
    : null;

  if (topLeftCell && topLeftCell.state === 0 && topLeftCell.value === 0) {
    newCells = openMultiple(newCells, rowParam - 1, colParam - 1);
  } else if (
    topLeftCell
      && topLeftCell.state === 0
      && topLeftCell.value > 0
  ) {
    newCells = setCellProp(newCells, rowParam - 1, colParam - 1, 'state', 1);
  }

  if (topCell && topCell.state === 0 && topCell.value === 0) {
    newCells = openMultiple(newCells, rowParam - 1, colParam);
  } else if (topCell && topCell.value > 0) {
    newCells = setCellProp(newCells, rowParam - 1, colParam, 'state', 1);
  }

  if (topRightCell && topCell.state === 0 && topRightCell.value === 0) {
    newCells = openMultiple(newCells, rowParam - 1, colParam + 1);
  } else if (topRightCell && topRightCell.value > 0) {
    newCells = setCellProp(newCells, rowParam - 1, colParam + 1, 'state', 1);
  }

  if (leftCell && leftCell.state === 0 && leftCell.value === 0) {
    newCells = openMultiple(newCells, rowParam, colParam - 1);
  } else if (leftCell && leftCell.state === 0 && leftCell.value > 0) {
    newCells = setCellProp(newCells, rowParam, colParam - 1, 'state', 1);
  }

  if (rightCell && rightCell.state === 0 && rightCell.value === 0) {
    newCells = openMultiple(newCells, rowParam, colParam + 1);
  } else if (rightCell && rightCell.state === 0 && rightCell.value > 0) {
    newCells = setCellProp(newCells, rowParam, colParam + 1, 'state', 1);
  }

  if (
    bottomLeftCell
      && bottomLeftCell.state === 0
      && bottomLeftCell.value === 0
  ) {
    newCells = openMultiple(newCells, rowParam + 1, colParam - 1);
  } else if (
    bottomLeftCell
      && bottomLeftCell.state === 0
      && bottomLeftCell.value > 0
  ) {
    newCells = setCellProp(newCells, rowParam + 1, colParam - 1, 'state', 1);
  }

  if (bottomCell && bottomCell.state === 0 && bottomCell.value === 0) {
    newCells = openMultiple(newCells, rowParam + 1, colParam);
  } else if (bottomCell && bottomCell.state === 0 && bottomCell.value > 0) {
    newCells = setCellProp(newCells, rowParam + 1, colParam, 'state', 1);
  }

  if (
    bottomRightCell
      && bottomRightCell.state === 0
      && bottomRightCell.value === 0
  ) {
    newCells = openMultiple(newCells, rowParam + 1, colParam + 1);
  } else if (
    bottomRightCell
      && bottomRightCell.state === 0
      && bottomRightCell.value > 0
  ) {
    newCells = setCellProp(newCells, rowParam + 1, colParam + 1, 'state', 1);
  }

  return newCells;
}
