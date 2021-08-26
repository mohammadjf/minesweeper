import "./App.css";
import { useEffect, useState } from "react";

function Cell({ value }) {
  const [isHidden, setIsHidden] = useState(true);

  return isHidden ? (
    <div
      className="cell hidden"
      onClick={() => {
        setIsHidden(false);
      }}
    ></div>
  ) : (
    <div className="cell">{value}</div>
  );
}

function Board({ width, height }) {
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
      <Board></Board>
    </div>
  );
}

export default App;
