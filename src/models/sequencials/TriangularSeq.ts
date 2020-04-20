import Sequence from './Suquence';
import ArithmaticSeq from './ArithmaticSeq';

export default class TriangularSeq extends Sequence {
  arithmaticSeq: ArithmaticSeq;

  secondConsecutiveDiff: number;

  constructor(
    numericSequence: number[],
    variableIndexes: number[],
    firstConsecutiveDiff: number,
    firstNumberIndex: number,
    secondNumberIndex: number,
    secondConsecutiveDiff: number,
  ) {
    super(numericSequence,
      variableIndexes,
      firstConsecutiveDiff,
      firstNumberIndex,
      secondNumberIndex);
    this.secondConsecutiveDiff = secondConsecutiveDiff;
    this.secondNumberIndex = secondNumberIndex;
    this.arithmaticSeq = this.generateAssociateArithmaticSeq();
  }

  generateAssociateArithmaticSeq(): ArithmaticSeq {
    const nummericSequence = Array.from(
      Array(this.numericSequence.length - 1).keys(),
    ).map((index) => {
      if (this.firstNumberIndex === index) return this.firstConsecutiveDiff;
      if (this.secondNumberIndex === index) return this.secondConsecutiveDiff;
      return NaN;
    });
    const variableIndexes = Array.from(Array(this.numericSequence.length - 1).keys())
      .filter((index) => index !== this.firstNumberIndex && index !== this.secondNumberIndex);
    const firstConsecutiveDiff = this.secondConsecutiveDiff - this.firstConsecutiveDiff;
    return new ArithmaticSeq(
      nummericSequence,
      variableIndexes,
      firstConsecutiveDiff,
      this.firstNumberIndex,
      this.secondNumberIndex,
    );
  }

  generateAllSequence(): number[] {
    const associateSeq = this.arithmaticSeq.generateAllSequence();
    return this.numericSequence.map((elem, index) => {
      const diffIndex = index - this.firstNumberIndex;
      if (diffIndex < 0) {
        let accum = this.numericSequence[this.firstNumberIndex];
        for (let i = this.firstNumberIndex - 1; i >= index; i -= 1) {
          const diff = associateSeq[i];
          accum -= diff;
        }
        return accum;
      }
      let accum = this.numericSequence[this.firstNumberIndex];
      for (let i = this.firstNumberIndex; i < index; i += 1) {
        const diff = associateSeq[i];
        accum += diff;
      }
      return accum;
    });
  }
}
