import Sequence from './Suquence';

export default class ArithmaticSeq extends Sequence {
  generateAllSequence(): number[] {
    return this.numericSequence.map((elem, index) => {
      if (index === this.firstNumberIndex) return elem;
      if (index === this.secondNumberIndex) return elem;
      const delta = this.firstConsecutiveDiff / (this.secondNumberIndex - this.firstNumberIndex);
      return delta * (index - this.firstNumberIndex) + this.numericSequence[this.firstNumberIndex];
    });
  }
}
