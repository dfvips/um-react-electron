import { FileListing } from '../FileListing';
import { renderWithProviders, screen } from '~/test-utils/test-helper';
import { ListingMode } from '../fileListingSlice';
import { dummyFiles } from './__fixture__/file-list';

test('should be able to render a list of 3 items', () => {
  renderWithProviders(<FileListing />, {
    preloadedState: {
      fileListing: {
        displayMode: ListingMode.LIST,
        files: dummyFiles,
      },
    },
  });

  expect(screen.getAllByTestId('file-row')).toHaveLength(3);
  expect(screen.getByText('Für Alice')).toBeInTheDocument();
});
