import React from 'react';
import './NumberDisplay.css';

export default function NumberDisplay({ value }) {
  return (
    // значение, которое является числом, сначала преобразуем в строку, а затем
    // с помощью padStart задаем максимальную длину равную трем
    // мы ее будем заполнять автоматом, если она не соответсвует трем символам
    <div className="NumberDisplay">
      {value < 0
        ? `-${Math.abs(value)
          .toString()
          .padStart(2, '0')}`
        : value.toString().padStart(3, '0')}
    </div>
  );
}
