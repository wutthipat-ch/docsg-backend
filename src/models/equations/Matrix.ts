/* eslint-disable arrow-body-style */
import MatrixMinor from './MatrixMinor';

export default class Matrix {
  elements: number[][];

  constructor(elements: number[][]) {
    this.elements = elements;
  }

  static getTwoDimensionsDet(elements: number[][]): number {
    return elements[0][0] * elements[1][1] - elements[1][0] * elements[0][1];
  }

  static getDeterminant(cofactorMatrix: number[][], elements: number[][]): number {
    return cofactorMatrix[0].reduce((accum, ele, index) => accum + ele * elements[0][index], 0);
  }

  static getTransposeMatrix(elements: number[][]): number[][] {
    return elements.map((rows, rowIndex) => rows
      .map((elem, colIndex) => elements[colIndex][rowIndex]));
  }

  static roundError(x: number): number {
    const error = 0.00001;
    if (Math.round(x) === Math.floor(x + error) || Math.round(x) === Math.ceil(x - error)) {
      return Math.round(x);
    }
    return x;
  }

  getEquationResultMatrix(constantMatrix: number[][]): number[][] {
    return constantMatrix.map((rows, rowIndex) => rows.map((elem) => {
      const result = Array.from(Array(this.elements[0].length).keys())
        .reduce((accum, i) => accum
          + (this.getInverseMatrix()[rowIndex][i] * constantMatrix[i][0]), 0);
      return Matrix.roundError(result);
    }));
  }

  getInverseMatrix(): number[][] {
    const cofactorMatrix = this.getCofactorMatrix();
    const adjoint = Matrix.getTransposeMatrix(cofactorMatrix);
    const determinant = Matrix.getDeterminant(cofactorMatrix, this.elements);
    return adjoint.map((rows) => rows.map((elem) => (1 / determinant) * elem));
  }

  getMatrixOfMinors(): number[][] {
    return this.elements.map((rows, rowIndex) => rows.map((elem, colIndex) => Matrix
      .getTwoDimensionsDet(new MatrixMinor(
        rowIndex,
        colIndex,
        this.elements,
      ).elements)));
  }

  getCofactorMatrix(): number[][] {
    return this.getMatrixOfMinors().map((rows, rowIndex) => rows.map((elem, colIndex) => {
      return (rowIndex + colIndex) % 2 === 0 ? elem : -elem;
    }));
  }
}
