import { enumObject } from '../objects';

test('it should ignore and not crash with non-object', () => {
  expect(Array.from(enumObject('string' as never))).toEqual([]);
});

test('it should ignore and not crash with null', () => {
  expect(Array.from(enumObject(null))).toEqual([]);
});

test('it be able to iterate object', () => {
  expect(Array.from(enumObject({ a: '1', b: '2' }))).toMatchInlineSnapshot(`
    [
      [
        "a",
        "1",
      ],
      [
        "b",
        "2",
      ],
    ]
  `);
});
