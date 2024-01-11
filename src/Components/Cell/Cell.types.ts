import { Dispatch, SetStateAction } from "react";

export type TActiveCellPos = {
  rowIndex: number;
  colIndex: number;
};

export interface ICellProps {
  grid: string[][];
  gridSize: number;
  rowIndex: number;
  colIndex: number;
  activeCellPos: TActiveCellPos;
  setActiveCellPos: Dispatch<SetStateAction<TActiveCellPos>>;
}
