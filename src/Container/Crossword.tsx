import { useMemo, type FC } from "react";

const gridSize = 14;

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
    <div>
      {cell.map((item) => (
        <div style={{
            display: "flex"
        }}>
          {item.map((el) => (
            <div
              style={{
                width: "28px",
                height: "28px",
                border: "1px solid #000000",
              }}
            >
              {el}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
