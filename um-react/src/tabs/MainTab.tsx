import { Box, VStack } from '@chakra-ui/react';
import { SelectFile } from '../components/SelectFile';

import { FileListing } from '~/features/file-listing/FileListing';

export function MainTab() {
  return (
    <Box h="full" w="full" pt="4">
      <VStack gap="3">
        <SelectFile />

        <Box w="full">
          <FileListing />
        </Box>
      </VStack>
    </Box>
  );
}
