import { MMKVParser } from '../MMKVParser';
import { readFileSync } from 'node:fs';

test('parse mmkv file as expected', () => {
  const buff = readFileSync(__dirname + '/__fixture__/test.mmkv');
  const view = new DataView(buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength));
  expect(MMKVParser.toStringMap(view)).toEqual(
    new Map([
      ['key', 'value'],
      [
        'Lorem Ipsum',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
          'Vestibulum congue volutpat metus non molestie. Quisque id est sapien. ' +
          'Fusce eget tristique sem. Donec tellus lacus, viverra sed lectus eget, elementum ultrices dolor. ' +
          'Integer non urna justo.',
      ],
    ])
  );
});
