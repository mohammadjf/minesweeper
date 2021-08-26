import { useState } from "react";

const Cell = ({ x, y, value, isHidden, flag, onClick, onContextMenu }) => {
  return isHidden ? (
    <div
      className="cell hidden"
      onClick={() => {onClick(x, y)}}
      onContextMenu={(e) => {onContextMenu(x, y, e)}}
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

export default Cell;
