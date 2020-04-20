/* eslint-disable arrow-body-style */
import Matrix from '../Matrix';

describe('Matrix class should work correctly in', () => {
  describe('Method getTwoDimensionsDet', () => {
    test('Negative determinant', () => {
      const elements = [[1, 1], [7, 3]];
      const det = Matrix.getTwoDimensionsDet(elements);
      expect(det).toBe(-4);
    });
    test('Positive determinant', () => {
      const elements = [[5, 4], [2, 3]];
      const det = Matrix.getTwoDimensionsDet(elements);
      expect(det).toBe(7);
    });
  });
  describe('Method getDeterminant', () => {
    test('Three dimensions work correctly', () => {
      const cofactorMatrix = [[1, -1, 1], [1, 2, 3], [4, 5, 6]];
      const elements = [[5, -1, 7], [1, 2, 3], [4, 5, 6]];
      const det = Matrix.getDeterminant(cofactorMatrix, elements);
      expect(det).toBe(13);
    });
  });
  describe('Method getTransposeMatrix', () => {
    test('Three dimensions work correctly', () => {
      const elements = [[5, -1, 7], [1, 2, 3], [4, 5, 6]];
      const det = Matrix.getTransposeMatrix(elements);
      expect(det).toStrictEqual([[5, 1, 4], [-1, 2, 5], [7, 3, 6]]);
    });
  });
  describe('Method roundError', () => {
    test('Error more than actual', () => {
      const x = 5.00000001;
      const roundNum = Matrix.roundError(x);
      expect(roundNum).toBe(5);
    });
    test('Error less than actual', () => {
      const x = 4.99999995;
      const roundNum = Matrix.roundError(x);
      expect(roundNum).toBe(5);
    });
  });
  describe('Method getEquationResultMatrix', () => {
    test('Three dimension work correctly', () => {
      const elements = [[1, 1, 1], [0, 2, 5], [2, 5, -1]];
      const constantMatrix = [[6], [-4], [27]];
      const matrix = new Matrix(elements);
      matrix.getInverseMatrix = jest.fn(() => {
        return [[-27 / -21, 6 / -21, 3 / -21],
          [10 / -21, -3 / -21, -5 / -21],
          [-4 / -21, -3 / -21, 2 / -21]];
      });
      const result = matrix.getEquationResultMatrix(constantMatrix);
      expect(result).toStrictEqual([[5], [3], [-2]]);
    });
  });
  describe('Method getInverseMatrix', () => {
    test('Three dimension work correctly', () => {
      const isEqualDecimal = (x: number, y: number): boolean => x - y < 0.000001;
      const elements = [[1, 1, 1], [0, 2, 5], [2, 5, -1]];
      const matrix = new Matrix(elements);
      matrix.getCofactorMatrix = jest.fn(() => {
        return [[-27, 10, -4],
          [6, -3, -3],
          [3, -5, 2]];
      });
      const result = matrix.getInverseMatrix();
      expect(isEqualDecimal(result[0][0], -27 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[0][1], 6 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[0][2], 3 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[1][0], 10 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[1][1], -3 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[1][2], -5 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[2][0], -4 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[2][1], -3 / -21)).toBeTruthy();
      expect(isEqualDecimal(result[2][2], 2 / -21)).toBeTruthy();
    });
  });
  describe('Method getMatrixOfMinor', () => {
    test('Three dimension work correctly', () => {
      const elements = [[3, 0, 2], [2, 0, -2], [0, 1, 1]];
      const matrix = new Matrix(elements);
      const matrixOfMinors = matrix.getMatrixOfMinors();
      expect(matrixOfMinors).toStrictEqual([[2, 2, 2], [-2, 3, 3], [-0, -10, 0]]);
    });
  });
  describe('Method getCofactorMatrix', () => {
    test('Three dimension work correctly', () => {
      const elements = [[3, 0, 2], [2, 0, -2], [0, 1, 1]];
      const matrix = new Matrix(elements);
      const cofactorMatrix = matrix.getCofactorMatrix();
      expect(cofactorMatrix).toStrictEqual([[2, -2, 2], [2, 3, -3], [-0, 10, 0]]);
    });
  });
});
