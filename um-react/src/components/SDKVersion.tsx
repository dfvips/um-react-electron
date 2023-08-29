import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Tooltip, VStack, Text, Flex } from '@chakra-ui/react';
import { workerClientBus } from '~/decrypt-worker/client';
import { DECRYPTION_WORKER_ACTION_NAME } from '~/decrypt-worker/constants';

import usePromise from 'react-promise-suspense';

const getSDKVersion = async (): Promise<string> => {
  return workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.VERSION, null);
};

export function SDKVersion() {
  const sdkVersion = usePromise(getSDKVersion, []);

  return (
    <Flex as="span" pl="1" alignItems="center" data-testid="sdk-version">
      <Tooltip
        hasArrow
        placement="top"
        label={
          <VStack>
            <Text>App: __APP_VERSION__</Text>
            <Text>SDK: {sdkVersion}</Text>
          </VStack>
        }
        bg="gray.300"
        color="black"
      >
        <InfoOutlineIcon />
      </Tooltip>
    </Flex>
  );
}
