import { Center, Flex, Link, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import { SDKVersion } from './SDKVersion';
import { CurrentYear } from './CurrentYear';

export function Footer() {
  return (
    <Center
      fontSize="sm"
      textAlign="center"
      bottom="0"
      w="full"
      pt="3"
      pb="3"
      borderTop="1px solid"
      borderColor="gray.300"
      bg="gray.100"
      color="gray.800"
      flexDir="column"
      flexShrink={0}
    >
      <Flex as={Text}>
        <Link href="https://git.unlock-music.dev/um/um-react" isExternal>
          音乐解锁
        </Link>
        {' (__APP_VERSION_SHORT__'}
        <Suspense>
          <SDKVersion />
        </Suspense>
        {') - 移除已购音乐的加密保护。'}
      </Flex>
      <Text>
        {'© 2019 - '}
        <CurrentYear />{' '}
        <Link href="https://git.unlock-music.dev/um" isExternal>
          UnlockMusic 团队
        </Link>
        {' | '}
        <Link href="https://git.unlock-music.dev/um/um-react/src/branch/main/LICENSE" isExternal>
          使用 MIT 授权协议
        </Link>
      </Text>
    </Center>
  );
}
