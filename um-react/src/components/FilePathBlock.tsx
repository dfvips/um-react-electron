import { Code, Text } from '@chakra-ui/react';
import React from 'react';

export function FilePathBlock({ children }: { children: React.ReactNode }) {
  return (
    <Text as="pre" whiteSpace="pre-wrap" wordBreak="break-all">
      <Code>{children}</Code>
    </Text>
  );
}
