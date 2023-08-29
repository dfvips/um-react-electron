import { VStack } from '@chakra-ui/react';

import { selectFiles } from './fileListingSlice';
import { useAppSelector } from '~/hooks';
import { FileRow } from './FileRow';

export function FileListing() {
  const files = useAppSelector(selectFiles);

  return (
    <VStack>
      {Object.entries(files).map(([id, file]) => (
        <FileRow key={id} id={id} file={file} />
      ))}
    </VStack>
  );
}
