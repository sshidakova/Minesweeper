import React from 'react';
import './Button.css';

export default function Button({
  onClick, onContext, row, col, state, value, red,
}) {
  const displayContent = () => {
    if (state === 2) {
      return <span>1</span>;
    }

    if (state === 1) {
      if (value === -1) {
        return <span>💣</span>;
      }

      if (value > 0) {
        return value;
      }
    }

    return null;
  };
  return (
    <div
      className={`Button value-${value} ${state === 1 ? 'visible' : ''} ${
        red ? 'red' : ''
      }`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {displayContent()}
    </div>
  );
}
