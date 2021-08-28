import { useState } from 'react';

function Cell({ cellObj, onClick }) {
  const [flag, setFlag] = useState(null);

  const value = cellObj.value;
  const x = cellObj.x;
  const y = cellObj.y;
  const isHidden = cellObj.isHidden;

  return isHidden ? (
    <div
      className='cell hidden'
      onClick={() => {if(flag !== '🚩') onClick(y, x)}}
      onContextMenu={(e) => {
        e.preventDefault();
        setFlag(flag === null ? '🚩' : null);
      }}
    >
      {flag}
    </div>
  ) : (
    <div
      className='cell'
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {value === 0 ? null : value}
    </div>
  );
}

export default Cell;
