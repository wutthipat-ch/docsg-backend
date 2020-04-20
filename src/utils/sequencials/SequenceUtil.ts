/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import Sequence from '../../models/sequencials/Suquence';
import TriangularSeq from '../../models/sequencials/TriangularSeq';

export default class SequenceUtil {
  static delimiter = ',';

  static getSequenceInstanceFromString(rawSequenceStr: string): Sequence | null {
    const rawSequence = SequenceUtil.getRawSquenceFromStr(rawSequenceStr);
    const numericSequence = SequenceUtil.getNumericSequence(rawSequence);
    const numberIndexes = SequenceUtil.getNumberIndexes(rawSequence);
    const variableIndexes = SequenceUtil.getVariableIndexes(numberIndexes, rawSequence.length);

    const twoConsecutiveBeginningIndex = SequenceUtil
      .findTwoConsecutiveBeginningIndex(numberIndexes);

    if (twoConsecutiveBeginningIndex.length !== 2) return null;

    const diff1 = SequenceUtil.getConsecutiveDiff(
      numericSequence,
      twoConsecutiveBeginningIndex[0],
      twoConsecutiveBeginningIndex[0] + 1,
    );

    const diff2 = SequenceUtil.getConsecutiveDiff(
      numericSequence,
      twoConsecutiveBeginningIndex[1],
      twoConsecutiveBeginningIndex[1] + 1,
    );

    return new TriangularSeq(
      numericSequence,
      variableIndexes,
      diff1,
      twoConsecutiveBeginningIndex[0],
      twoConsecutiveBeginningIndex[1],
      diff2,
    );
  }

  static findTwoConsecutiveBeginningIndex(numberIndexes: number[]): number[] {
    const twoConsecutiveBeginningIndex = [];
    for (const index of numberIndexes) {
      if (twoConsecutiveBeginningIndex.length === 2) break;
      if (numberIndexes.includes(index + 1)) {
        twoConsecutiveBeginningIndex.push(index);
      }
    }
    return twoConsecutiveBeginningIndex;
  }

  static getRawSquenceFromStr(rawSequenceStr: string): string[] {
    return rawSequenceStr.split(SequenceUtil.delimiter).map((str) => str.trim());
  }

  static getNumericSequence(rawSequence: string[]): number[] {
    return rawSequence.map((str) => parseInt(str, 10));
  }

  static getConsecutiveDiff(
    numericSequence: number[],
    firstIndex: number,
    secondIndex: number,
  ): number {
    return numericSequence[secondIndex] - numericSequence[firstIndex];
  }

  static getNumberIndexes(rawSequence: string[]): number[] {
    return rawSequence.map((str, index) => {
      const int = parseInt(str, 10);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(int)) return index;
      return -1;
    })
      .filter((ele) => ele !== -1);
  }

  static getVariableIndexes(numberIndexes: number[], lenght: number): number[] {
    return _.difference(Array.from(Array(lenght).keys()), numberIndexes);
  }
}
