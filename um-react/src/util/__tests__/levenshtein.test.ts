import { closestByLevenshtein, levenshtein } from '../levenshtein';

test('levenshtein quick test', () => {
  expect(levenshtein('cat', '')).toStrictEqual(3);
  expect(levenshtein('', 'cat')).toStrictEqual(3);
  expect(levenshtein('cat', 'cat')).toStrictEqual(0);
  expect(levenshtein('cat', 'cut')).toStrictEqual(1);
  expect(levenshtein('kitten', 'sitting')).toStrictEqual(3);
  expect(levenshtein('tier', 'tor')).toStrictEqual(2);
  expect(levenshtein('mississippi', 'swiss miss')).toStrictEqual(8);
});

test('closestByLevenshtein quick test', () => {
  expect(closestByLevenshtein('cat', ['cut', 'dog', 'bat'])).toStrictEqual('cut');
  expect(closestByLevenshtein('dag', ['dog', 'pumpkin'])).toStrictEqual('dog');
  expect(closestByLevenshtein('hello', ['jello', 'yellow', 'bello'])).toStrictEqual('jello');
});
