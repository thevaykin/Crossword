import { useMemo, type FC, useCallback, useState, useEffect } from "react";
import { Cell } from "../Components/Cell/Cell";

const cellSize = 48;
const minGridSize = 10;
const maxGridSize = 14;

export const Crossword: FC = () => {
  const [gridSize, setGridSize] = useState(
    Math.trunc(Math.random() * (maxGridSize - minGridSize) + minGridSize)
  );

  const [activeCellPos, setActiveCellPos] = useState<{
    rowIndex: number;
    colIndex: number;
  }>({
    rowIndex: 0,
    colIndex: 0,
  });

  const handleOnKeydown = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key);

      switch (event.key) {
        case "ArrowLeft": //key left
          setActiveCellPos({
            rowIndex: activeCellPos.rowIndex,
            colIndex: activeCellPos.colIndex - 1,
          });
          break;

        case "ArrowUp": //key up
          setActiveCellPos({
            rowIndex: activeCellPos.rowIndex - 1,
            colIndex: activeCellPos.colIndex,
          });
          break;

        case "ArrowRight": //key right
          setActiveCellPos({
            rowIndex: activeCellPos.rowIndex,
            colIndex: activeCellPos.colIndex + 1,
          });
          break;

        case "ArrowDown": //key down
          setActiveCellPos({
            rowIndex: activeCellPos.rowIndex + 1,
            colIndex: activeCellPos.colIndex,
          });
          break;

        default:
          return;
      }
      event.preventDefault();
    },
    [activeCellPos.colIndex, activeCellPos.rowIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleOnKeydown);

    return () => {
      window.removeEventListener("keydown", handleOnKeydown);
    };
  }, [handleOnKeydown]);

  const grid = useMemo(() => {
    const matrix: string[][] = [];

    for (let i = 0; i < gridSize; i++) {
      matrix.push([]);
      for (let j = 0; j < gridSize; j++) {
        matrix[i].push("");
      }
    }

    return matrix;
  }, [gridSize]);

  const handleReload = useCallback(() => {
    setGridSize(
      Math.trunc(Math.random() * (maxGridSize - minGridSize) + minGridSize)
    );
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={handleReload}
      >
        <div>Reload</div>
      </div>
      <div
        style={{
          width: `calc(${cellSize}px * ${gridSize})`,
          padding: `calc((100vh - ${cellSize}px * ${gridSize}) / 2) 0`,
          margin: "0 auto",
        }}
      >
        {grid.map((item, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              width: `calc(${cellSize}px * ${gridSize})`,
              display: "flex",
            }}
          >
            {item.map((_el, colIndex) => (
              <Cell
                key={colIndex}
                grid={grid}
                gridSize={gridSize}
                rowIndex={rowIndex}
                colIndex={colIndex}
                activeCellPos={activeCellPos}
                setActiveCellPos={setActiveCellPos}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
