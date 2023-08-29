import { renderWithProviders, screen } from '~/test-utils/test-helper';
import { untouchedFile } from './__fixture__/file-list';
import { FileRow } from '../FileRow';
import { completedFile } from './__fixture__/file-list';

test('should render no metadata when unavailable', () => {
  renderWithProviders(<FileRow id="file://ready" file={untouchedFile} />);

  expect(screen.getAllByTestId('file-row')).toHaveLength(1);
  expect(screen.getByTestId('audio-meta-song-name')).toHaveTextContent('ready');
  expect(screen.queryByTestId('audio-meta-album-name')).toBeFalsy();
  expect(screen.queryByTestId('audio-meta-song-artist')).toBeFalsy();
  expect(screen.queryByTestId('audio-meta-album-artist')).toBeFalsy();
});

test('should render metadata when file has been processed', () => {
  renderWithProviders(<FileRow id="file://done" file={completedFile} />);

  expect(screen.getAllByTestId('file-row')).toHaveLength(1);
  expect(screen.getByTestId('audio-meta-song-name')).toHaveTextContent('Für Alice');
  expect(screen.getByTestId('audio-meta-album-name')).toHaveTextContent("NOW That's What I Call Cryptography 2023");
  expect(screen.getByTestId('audio-meta-song-artist')).toHaveTextContent('Jixun');
  expect(screen.getByTestId('audio-meta-album-artist')).toHaveTextContent('Cipher Lovers');
});
