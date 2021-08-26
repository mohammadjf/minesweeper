import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";

const Board = ({ width, height }) => {
  const [cells, setCells] = useState(null);

  const bombsAndNumbersGenerator = (height, width) => {
    let _cells = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        _cells.push({ x: i, y: j, value: 0 });
      }
    }
    _cells = populateCellsWithBombs(_cells, 20);
    _cells = populateCellsWithNumbers(_cells);

    setCells(_cells);
  };

  function populateCellsWithBombs(cellsArray, totalBombNumber) {
    for (let i = 0; i < totalBombNumber; i++) {
      let randomNum = Math.trunc(Math.random() * (cellsArray.length - 1));
      cellsArray[randomNum].value = "💣";
    }
    return cellsArray;
  }

  function populateCellsWithNumbers(_cells) {
    const populatedCells = _cells.map(({ x, y, value }, i, cellsArray) => {
      if (value === "💣") {
        return { x, y, value };
      }
            
      const topCell = cellsArray.find((cell) => cell.x === x && cell.y === y + 1);
      const belowCell = cellsArray.find((cell) => cell.x === x && cell.y === y - 1);
      const rightCell = cellsArray.find((cell) => cell.x === x + 1 && cell.y === y);
      const leftCell = cellsArray.find((cell) => cell.x === x - 1 && cell.y === y);
      const topRightCell = cellsArray.find((cell) => cell.x === x + 1 && cell.y === y + 1);
      const topLeftCell = cellsArray.find((cell) => cell.x === x - 1 && cell.y === y + 1);
      const belowRightCell = cellsArray.find((cell) => cell.x === x + 1 && cell.y === y - 1);
      const belowLeftCell = cellsArray.find((cell) => cell.x === x - 1 && cell.y === y - 1);

      if (topCell?.value === "💣") value++;
      if (belowCell?.value === "💣") value++;
      if (rightCell?.value === "💣") value++;
      if (leftCell?.value === "💣") value++;
      if (topRightCell?.value === "💣") value++;
      if (topLeftCell?.value === "💣") value++;
      if (belowRightCell?.value === "💣") value++;
      if (belowLeftCell?.value === "💣") value++;
      value = value === 0 ? null : value;
      return { x, y, value };
    });
    return populatedCells;
  }
  
  useEffect(() => {
    bombsAndNumbersGenerator(width, height);
  }, [width, height]);
  
  function renderRows() {
    const rows= []
    for (let j = 0; j < height; j++) {
      rows.push(<div key={j} className="row">{renderCells(j)}</div>)
    }
    return rows;
  }
  
  function renderCells(row) {
    if (cells !== null){
      const _cells = []
      for (let i = 0; i < width; i++) {
        const cell = cells.find(({x,y}) => x === i && y === row);
        _cells.push(<Cell key={i} value={cell.value}></Cell>) 
      }
      return _cells;
    }
  }

  return (
    <div className="board">
      {renderRows()}
    </div>
  );
};
export default Board;
