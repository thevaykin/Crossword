import { useCallback, type FC, useState } from "react";
import { ICellProps } from "./Cell.types";

const cellSize = 48;

const getBorder = (gridSize: number, rowIndex: number, colIndex: number) => {
  let borderTop: number = 0;
  let borderRight: number = 0;
  let borderBottom: number = 0;
  let borderLeft: number = 0;
  const borderRadius: string =
    rowIndex === 0 && colIndex === 0
      ? "4px 0 0 0"
      : rowIndex === 0 && colIndex === gridSize - 1
      ? "0 4px 0 0"
      : rowIndex === gridSize - 1 && colIndex === 0
      ? "0 0 0 4px"
      : rowIndex === gridSize - 1 && colIndex === gridSize - 1
      ? "0 0 4px 0"
      : "";

  if (colIndex === 0) {
    borderTop = 1;
    borderLeft = 1;
  }

  if (colIndex > 0) {
    borderTop = 1;
  }

  if (rowIndex !== gridSize) {
    borderRight = 1;
  }

  if (rowIndex === gridSize - 1) {
    borderBottom = 1;
  }

  return {
    borderTop: `${borderTop}px solid #000000`,
    borderRight: `${borderRight}px solid #000000`,
    borderBottom: `${borderBottom}px solid #000000`,
    borderLeft: `${borderLeft}px solid #000000`,
    borderRadius,
  };
};

export const Cell: FC<ICellProps> = ({
  grid,
  gridSize,
  rowIndex,
  colIndex,
  setActiveCellPos,
}) => {
  const [activeCellValue, setActiveCellValue] = useState<string>("");

  const handleOnCellFocus = useCallback(
    (rowIndex: number, colIndex: number) => {
      setActiveCellPos({
        rowIndex,
        colIndex,
      });
    },
    [setActiveCellPos]
  );

  const handleOnCellInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      grid[rowIndex][colIndex] = e.target.value;
      setActiveCellValue(e.target.value);
    },
    [colIndex, grid, rowIndex]
  );

  return (
    <div
      key={colIndex}
      style={{
        width: "100%",
        height: `${cellSize}px`,
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        ...getBorder(gridSize, rowIndex, colIndex),
      }}
    >
      <input
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: `${cellSize}px`,
          border: "none",
        }}
        value={activeCellValue}
        onInput={handleOnCellInput}
        onFocus={() => handleOnCellFocus(rowIndex, colIndex)}
      />
    </div>
  );
};
