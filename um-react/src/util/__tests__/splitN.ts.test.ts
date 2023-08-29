import { splitN } from '../splitN';

test('some test cases', () => {
  expect(splitN('1,2,3', ',', 2)).toEqual(['1', '2,3']);
  expect(splitN('1,2,3', ',', 3)).toEqual(['1', '2', '3']);
  expect(splitN('1,2,3', ',', 4)).toEqual(['1', '2', '3']);

  expect(splitN('1,2,3', '.', 3)).toEqual(['1,2,3']);
  expect(splitN('1,2,3', '?', 0)).toEqual(['1,2,3']);
});
