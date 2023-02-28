import './App.css';
import React, { useState } from 'react';
import NumberDisplay from '../NumberDisplay';
import Button from '../Button';
import initBoard from '../../utils/initBoard';

function App() {
  const [time, setTime] = useState(0);
  const [bombCounter, setBombCounter] = useState(40);
  const [emoji, setEmoji] = useState('🙂');
  const [cells, setCells] = useState(initBoard());

  function createBoard() {
    return cells.map((row, rowIndex) => row.map((cell, colIndex) => <Button />));
  }

  return (
    <div className="App">
      <div className="Header">
        <NumberDisplay value={bombCounter} />
        <div className="Emoji">{emoji}</div>
        <NumberDisplay value={time} />
      </div>
      <div className="Body">{createBoard()}</div>

    </div>
  );
}

export default App;
