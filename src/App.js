import "./App.css";
import { useEffect, useState } from "react";

function Cell({ value }) {
  const [isHidden, setIsHidden] = useState(true);
  const [flag, setFlag] = useState(null);

  return isHidden ? (
    <div
      className="cell hidden"
      onClick={() => {
        setIsHidden(flag === "🚩");
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setFlag(flag === null ? "🚩" : null);
      }}
    >
      {flag}
    </div>
  ) : (
    <div
      className="cell"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {value}
    </div>
  );
}

function Board({ width, height }) {
  const [cells, setCells] = useState(new Array(width * height));

  function bombsAndNumbersGenerator(height, width) {
    let _cells = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        _cells.push({ x: i, y: j, value: null });
      }
    }
    // _cells = populateCellsWithBombs(8, _cells);

    setCells(_cells);
  }

  function populateCellsWithBombs(totalBombnumber, cellsArray) {
    for (let i = 0; i < totalBombnumber; i++) {
      let randomNum = Math.trunc(Math.random() * (cellsArray.length - 1));
      cellsArray[randomNum].value = "💣";
    }
    return cellsArray;
  }
  useEffect(() => {
    bombsAndNumbersGenerator(width, height);
  }, []);

  return (
    <div className="board">
      <div className="row">
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
      </div>
      <div className="row">
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
      </div>
      <div className="row">
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
      </div>
      <div className="row">
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
        <Cell value="2"></Cell>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Board width={15} height={15}></Board>
    </div>
  );
}

export default App;
