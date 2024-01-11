import { useMemo, type FC } from "react";

const gridSize = 14;

const getBorder = (rowIndex: number, colIndex: number) => {
  let borderTop: number = 0;
  let borderRight: number = 0;
  let borderBottom: number = 0;
  let borderLeft: number = 0;
  const borderRadius: string =
    rowIndex === 0 && colIndex === 0
      ? "5px 0 0 0"
      : rowIndex === 0 && colIndex === gridSize - 1
      ? "0 5px 0 0"
      : rowIndex === gridSize - 1 && colIndex === 0
      ? "0 0 0 5px"
      : rowIndex === gridSize - 1 && colIndex === gridSize - 1
      ? "0 0 5px 0"
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

export const Crossword: FC = () => {
  const cell = useMemo(() => {
    const matrix: string[][] = [];

    for (let i = 0; i < gridSize; i++) {
      matrix.push([]);
      for (let j = 0; j < gridSize; j++) {
        matrix[i].push("1");
      }
    }

    return matrix;
  }, []);

  return (
    <div
      style={{
        width: `calc(28px * ${gridSize})`,
        padding: `calc((100vh - 28px * ${gridSize}) / 2) 0`,
        margin: "0 auto",
      }}
    >
      {cell.map((item, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            width: `calc(28px * ${gridSize})`,
            display: "flex",
          }}
        >
          {item.map((el, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: "100%",
                height: "28px",
                display: "flex",
                justifyContent: "center",
                boxSizing: "border-box",
                ...getBorder(rowIndex, colIndex),
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {el}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
