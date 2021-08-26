import { useState } from "react";

const Cell = ({ value }) => {
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

export default Cell;
