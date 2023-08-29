import { getFileName } from '../pathHelper';

test('handle linux path', () => {
  expect(getFileName('/path/to/file.bin')).toEqual('file.bin');
});

test('handle win32 path', () => {
  expect(getFileName('C:\\system32\\file.bin')).toEqual('file.bin');
});

test('handle file name only as well', () => {
  expect(getFileName('file.bin')).toEqual('file.bin');
});
