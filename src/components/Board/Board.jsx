import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";

const Board = ({ width, height }) => {
  const [cells, setCells] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);

  const bombsAndNumbersGenerator = (height, width) => {
    let _cells = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        _cells.push({ x: i, y: j, value: 0, isHidden: true, flag: null });
      }
    }
    _cells = populateCellsWithBombs(_cells, 20);
    _cells = populateCellsWithNumbers(_cells);

    setCells(_cells);
  };

  const populateCellsWithBombs = (cellsArray, totalBombNumber) => {
    for (let i = 0; i < totalBombNumber; i++) {
      let randomNum = Math.trunc(Math.random() * (cellsArray.length - 1));
      cellsArray[randomNum].value = "💣";
    }
    return cellsArray;
  }

  const populateCellsWithNumbers = (_cells) => {
    const populatedCells = _cells.map(({ x, y, value, isHidden, flag }, i, cellsArray) => {
      if (value === "💣") {
        return { x, y, value, isHidden, flag };
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
      return { x, y, value, isHidden, flag };
    });
    return populatedCells;
  }
  
  const openCell = (x, y) => {
    const _cells = cells.slice();
    const i = _cells.findIndex((cell) => cell.x === x && cell.y === y);
    if (i !== -1) {
      if (_cells[i].flag !== "🚩" && _cells[i].isHidden === true) {
        _cells[i].isHidden = false;
        if (_cells[i].value === null) {
          openCell(x, y + 1)
          openCell(x, y - 1)
          openCell(x + 1, y)
          openCell(x - 1, y)
          openCell(x + 1, y + 1)
          openCell(x - 1, y + 1)
          openCell(x + 1, y - 1)
          openCell(x - 1, y - 1 )
        };
        setCells(_cells);
      }
    }
  }

  const flag = (x, y, e) => {
    e.preventDefault();
    const _cells = cells.slice();
    const i = _cells.findIndex((cell) => cell.x === x && cell.y === y);
    _cells[i].flag = _cells[i].flag === null ? "🚩" : null;
    setCells(_cells);
  }

  useEffect(() => {
    bombsAndNumbersGenerator(width, height);
  }, [width, height]);
  
  const renderRows = () => {
    const rows= []
    for (let j = 0; j < height; j++) {
      rows.push(<div key={j} className="row">{renderCells(j)}</div>)
    }
    return rows;
  }
  
  const renderCells = (row) => {
    if (cells !== null){
      const _cells = []
      for (let i = 0; i < width; i++) {
        const cell = cells.find(({x, y}) => x === i && y === row);
        _cells.push(
          <Cell
            key={i}
            x={cell.x}
            y={cell.y}
            value={cell.value}
            isHidden={cell.isHidden}
            flag={cell.flag}
            onClick={(x, y) => openCell(x, y)}
            onContextMenu={(x, y, e) => flag(x, y, e)}
          ></Cell>
        )
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
