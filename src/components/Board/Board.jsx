import { useEffect, useState } from 'react';
import Row from '../Row/Row';
import boardGenerator from './boardGenerator';

const Board = ({ width, height, bombNum }) => {
  const [board, setBoard] = useState([]);
  const [lost, setLost] = useState(false);
  const [bombIndexes, setBombIndexes] = useState([]);

  useEffect(() => {
    const [_board, bombIndexes] = boardGenerator(width, height, bombNum);
    setBoard(_board);
    setBombIndexes(bombIndexes);
  }, [width, height, bombNum])

  const handleClick = (y, x) => {
    if (lost) return;
    const _board = board.slice();
    const clickedCell = board[y][x];
    clickedCell.isHidden = false;
    if (clickedCell.value === 0) {
      let top = _board?.[y - 1]?.[x];
			let bottom = _board?.[y + 1]?.[x];
			let right = _board?.[y]?.[x + 1];
			let left = _board?.[y]?.[x - 1];
			let topRight = _board?.[y - 1]?.[x + 1];
			let topLeft = _board?.[y - 1]?.[x - 1];
			let bottomRight = _board?.[y + 1]?.[x + 1];
			let bottomLeft = _board?.[y + 1]?.[x - 1];
			
			if (top !== undefined && top.isHidden === true) handleClick(y - 1, x);
			if (bottom !== undefined && bottom.isHidden === true) handleClick(y + 1, x);
			if (right !== undefined && right.isHidden === true) handleClick(y, x + 1);
			if (left !== undefined && left.isHidden === true) handleClick(y, x - 1);
			if (topRight !== undefined && topRight.isHidden === true) handleClick(y - 1, x + 1);
			if (topLeft !== undefined && topLeft.isHidden === true) handleClick(y - 1, x - 1);
			if (bottomRight !== undefined && bottomRight.isHidden === true) handleClick(y + 1, x + 1);
			if (bottomLeft !== undefined && bottomLeft.isHidden === true) handleClick(y + 1, x - 1);
    } else if (clickedCell.value === '💣') {
      setLost(true);
      _board[y][x].value = '💥';
      bombIndexes.map(([y, x]) => {
        _board[y][x].isHidden = false;
      });      
    };
    setBoard(_board);
  }

  return (
    <div className="board">
      {board.map((row, j) => {
        return <Row key={j} cellsArray={row} onClick={(y, x) => handleClick(y, x)}></Row>
      })}
    </div>
  );
};

export default Board;
