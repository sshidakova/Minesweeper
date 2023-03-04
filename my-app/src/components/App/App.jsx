import React, { useEffect, useState } from 'react';
import openMultiple from '../../utils/openMultiple';
import './App.css';
import NumberDisplay from '../NumberDisplay';
import Button from '../Button';
import generateCells from '../../utils/generateCells';
import setCellProp from '../../utils/setCellProp';

function App() {
  const [cells, setCells] = useState(generateCells());
  const [mineCounter, setMineCounter] = useState(40);
  const [time, setTime] = useState(0);
  const [emoji, setEmoji] = useState('😊');
  const [isLive, setIsLive] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  // уставливаем таймер
  useEffect(() => {
    if (isLive && !hasWon && !hasLost) {
      const interval = setInterval(() => {
        if (time < 1000) {
          setTime(time + 1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [time, isLive, hasWon, hasLost]);

  // устанавливаем смайлик, пользователь нажал на поле, но еще не отпустил кнопку мыши
  const handleMouseDown = (e) => {
    if (hasWon || hasLost) {
      return;
    }
    setEmoji('😮');
  };

  const handleMouseUp = (e) => {
    if (hasWon || hasLost) {
      return;
    }
    setEmoji('😊');
  };

  // установливаем смайлик, есди проиграли
  useEffect(() => {
    if (hasLost) {
      setEmoji('😵');
      setTimeout(() => {
        alert('Вы проиграли! Нажмите на смайлик для перезапуска игры.');
      }, '1000');
    }
  }, [hasLost]);

  // уставливаем смайлик с очками, если победили
  useEffect(() => {
    if (hasWon) {
      const newCells = cells.map((row) => row.map((cell) => (cell.value === -1
        ? {
          ...cell,
          state: 1,
        }
        : cell)));
      setCells(newCells);
      setEmoji('😎');
    }
  }, [hasWon]);

  // уставливаем прослушивателей событий для указанного типа события(клик мышки по полю)
  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [emoji, hasWon, hasLost]);

  // при проигрыше будут открываться все бомбы
  const openAllBombs = (cellsParam) => cellsParam.map((row) => row.map((cell) => {
    if (cell.value === -1) {
      return {
        ...cell,
        state: 1,
      };
    }

    return cell;
  }));

  const handleButtonClick = (rowParam, colParam) => (e) => {
    e.preventDefault();

    if (hasWon || hasLost) {
      return;
    }

    let gameCells = cells;
    let cell = gameCells[rowParam][colParam];

    if (!isLive) {
      // если кликнули в место, где есть бомба, доску обновить
      if (cell.value === -1) {
        let hasABomb = true;
        let newCells = gameCells;
        while (hasABomb) {
          newCells = generateCells();
          const newCell = newCells[rowParam][colParam];
          if (newCell.value !== -1) {
            hasABomb = false;
          }
        }
        gameCells = newCells;
        cell = gameCells[rowParam][colParam];
      }

      setIsLive(true);
    }

    if (cell.state !== 0) {
      return;
    }

    // если наткнулся на бомбу, игра окончена
    if (cell.value === -1) {
      setHasLost(true);
      let newCells = setCellProp(gameCells, rowParam, colParam, 'red', true);
      newCells = openAllBombs(newCells);
      setCells(newCells);
      return;
    }

    if (cell.value === 0) {
      gameCells = openMultiple(gameCells, rowParam, colParam);
    }
    // открываем цифры
    if (cell.value > 0) {
      gameCells = setCellProp(gameCells, rowParam, colParam, 'state', 1);
    }
    // если все ячейки были нажаты (не наткнувшись на бомбы), то игра выиграна
    const availableNonBombSpaces = gameCells.reduce(
      (acc, row) => acc
        + row.reduce(
          (acc2, cell) => (cell.value !== -1 && cell.state === 0 ? acc2 + 1 : acc2),
          0,
        ),
      0,
    );

    setCells(gameCells);

    if (availableNonBombSpaces === 0) {
      gameCells.map((row) => row.map((cell) => ({ ...cell, state: 1 })));
      setHasWon(true);
    }
  };

  const handleButtonContextMenu = (rowParam, colParam) => (e) => {
    e.preventDefault();
    if (hasWon || hasLost) {
      return;
    }
    if (!isLive) return;
    const cell = cells[rowParam][colParam];

    // если кнопки после нажатия видно, ничего не происходит
    if (cell.state === 1) {
      return;
    }

    // установка флага
    if (cell.state === 0) {
      const newCells = setCellProp(cells, rowParam, colParam, 'state', 2);
      setCells(newCells);
      setMineCounter(mineCounter - 1);
      return;
    }

    // убрать флаг
    const newCells = setCellProp(cells, rowParam, colParam, 'state', 0);
    setCells(newCells);
    setMineCounter(mineCounter + 1);
  };

  // при клике на смайлик, перезапускать игру и обнуление таймера
  const handleEmojiClick = (e) => {
    e.preventDefault();
    if (isLive) {
      setCells(generateCells());
      setIsLive(false);
      setMineCounter(40);
      setTime(0);
      setHasLost(false);
      setHasWon(false);
      setEmoji('😊');
    }
  };

  // создание игрового пространства(кнопок)
  function createBoard() {
    return cells.map((row, rowIndex) => row.map((cell, colIndex) => (
      <Button
        state={cell.state}
        value={cell.value}
        red={cell.red}
        key={`${rowIndex}-${colIndex}`}
        onClick={handleButtonClick}
        onContext={handleButtonContextMenu}
        row={rowIndex}
        col={colIndex}
      />
    )));
  }

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={mineCounter} />
        <div className="Emoji" onClick={handleEmojiClick}>
          {emoji}
        </div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{createBoard()}</div>
    </div>
  );
}

export default App;
