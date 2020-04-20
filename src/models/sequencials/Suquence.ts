export default abstract class Sequence {
  numericSequence: number[];

  variableIndexes: number[];

  firstConsecutiveDiff: number;

  firstNumberIndex: number;

  secondNumberIndex: number;

  constructor(
    numericSequence: number[],
    variableIndexes: number[],
    firstConsecutiveDiff: number,
    firstNumberIndex: number,
    secondNumberIndex: number,
  ) {
    this.numericSequence = numericSequence;
    this.variableIndexes = variableIndexes;
    this.firstConsecutiveDiff = firstConsecutiveDiff;
    this.firstNumberIndex = firstNumberIndex;
    this.secondNumberIndex = secondNumberIndex;
  }

  abstract generateAllSequence(): number[];

  getMissingVariables(): number[] {
    return this.generateAllSequence().filter((elem, index) => this.variableIndexes.includes(index));
  }
}
