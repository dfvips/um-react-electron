import { chakra, Box, Button, Collapse, Text, useDisclosure } from '@chakra-ui/react';
import { DecryptErrorType } from '~/decrypt-worker/util/DecryptError';

export interface FileErrorProps {
  error: null | string;
  code: null | string;
}

const errorMap = new Map<string | null | DecryptErrorType, string>([
  [DecryptErrorType.UNSUPPORTED_FILE, '尚未支持的文件格式'],
]);

export function FileError({ error, code }: FileErrorProps) {
  const { isOpen, onToggle } = useDisclosure();
  const errorSummary = errorMap.get(code) ?? '未知错误';

  return (
    <Box>
      <Text>
        <chakra.span>
          解密错误：<chakra.span color="red.700">{errorSummary}</chakra.span>
        </chakra.span>
        {error && (
          <Button ml="2" onClick={onToggle} type="button">
            详细
          </Button>
        )}
      </Text>
      {error && (
        <Collapse in={isOpen} animateOpacity>
          <Box as="pre" display="inline-block" mt="2" px="4" py="2" bg="red.100" color="red.800" rounded="md">
            {error}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
