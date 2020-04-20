import SequenceUtil from '../SequenceUtil';

describe('SequenceUtil should work correctly in', () => {
  describe('Method findTwoConsecutiveBeginningIndex', () => {
    test('First two consecutive numbers and skip one', () => {
      const numberIndexes = [0, 1, 3, 4];
      const twoConsecutiveIndex = SequenceUtil.findTwoConsecutiveBeginningIndex(numberIndexes);
      expect(twoConsecutiveIndex).toStrictEqual([0, 3]);
    });
    it('First three consecutive numbers and skip', () => {
      const numberIndexes = [0, 1, 2, 4];
      const twoConsecutiveIndex = SequenceUtil.findTwoConsecutiveBeginningIndex(numberIndexes);
      expect(twoConsecutiveIndex).toStrictEqual([0, 1]);
    });
    it('Find only one', () => {
      const numberIndexes = [0, 1, 3, 5];
      const twoConsecutiveIndex = SequenceUtil.findTwoConsecutiveBeginningIndex(numberIndexes);
      expect(twoConsecutiveIndex).toStrictEqual([0]);
    });
  });
  describe('Method getRawSequenceFromStr', () => {
    test('Including multiple spaces', () => {
      const rawSequenceStr = 'a, b, c , 12  , 3';
      const rawSequence = SequenceUtil.getRawSquenceFromStr(rawSequenceStr);
      expect(rawSequence).toStrictEqual(['a', 'b', 'c', '12', '3']);
    });
  });
  describe('Method getNumericSequence', () => {
    test('Mix among alphabet and number', () => {
      const rawSequence = ['a', 'b', 'c', '12', '3'];
      const numericSeq = SequenceUtil.getNumericSequence(rawSequence);
      expect(numericSeq).toStrictEqual([NaN, NaN, NaN, 12, 3]);
    });
  });
  describe('Method getNumberIndexes', () => {
    test('Mix among alphabet and number', () => {
      const rawSequence = ['a', 'b', 'c', '12', '3'];
      const numberIndexes = SequenceUtil.getNumberIndexes(rawSequence);
      expect(numberIndexes).toStrictEqual([3, 4]);
    });
  });
  describe('Method getConsecutiveDiff', () => {
    test('Diff is zero', () => {
      const numericSeq = [NaN, NaN, NaN, 3, 3];
      const firstIndex = 3;
      const secondIndex = 4;
      const diff = SequenceUtil.getConsecutiveDiff(numericSeq, firstIndex, secondIndex);
      expect(diff).toBe(0);
    });
  });
  describe('Method getVariableIndexes', () => {
    test('Mix among alphabet and number', () => {
      const numberIndexes = [0, 3];
      const length = 5;
      const variableIndexes = SequenceUtil.getVariableIndexes(numberIndexes, length);
      expect(variableIndexes).toStrictEqual([1, 2, 4]);
    });
  });
});
