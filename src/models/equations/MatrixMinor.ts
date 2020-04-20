export default class MatrixMinor {
  rowIndex: number;

  colIndex: number;

  elements: number[][];

  constructor(rowIndex: number, colIndex: number, originMatrix: number[][]) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.elements = this.getElementsFromOrigin(originMatrix);
  }

  getElementsFromOrigin(originMatrix: number[][]): number[][] {
    return originMatrix.filter((_, rowIndex) => rowIndex !== this.rowIndex)
      .map((rows) => rows.filter((_, colIndex) => colIndex !== this.colIndex));
  }
}
