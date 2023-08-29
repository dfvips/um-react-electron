import {
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MdDelete, MdVpnKey } from 'react-icons/md';
import { kwm2DeleteKey, kwm2UpdateKey } from '../../settingsSlice';
import { useAppDispatch } from '~/hooks';
import { memo } from 'react';
import { StagingKWMv2Key } from '../../keyFormats';

export const KWMv2EKeyItem = memo(({ id, ekey, quality, rid, i }: StagingKWMv2Key & { i: number }) => {
  const dispatch = useAppDispatch();

  const updateKey = (prop: keyof StagingKWMv2Key, e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(kwm2UpdateKey({ id, field: prop, value: e.target.value }));
  const deleteKey = () => dispatch(kwm2DeleteKey({ id }));

  return (
    <ListItem mt={0} pt={2} pb={2} _even={{ bg: 'gray.50' }}>
      <HStack>
        <Text w="2em" textAlign="center">
          {i + 1}
        </Text>

        <VStack flex={1}>
          <HStack flex={1} w="full">
            <Input
              variant="flushed"
              placeholder="资源 ID"
              value={rid}
              onChange={(e) => updateKey('rid', e)}
              type="number"
              maxW="8em"
            />
            <Input
              variant="flushed"
              placeholder="音质格式"
              value={quality}
              onChange={(e) => updateKey('quality', e)}
              flex={1}
            />
          </HStack>

          <InputGroup size="xs">
            <InputLeftElement pr="2">
              <Icon as={MdVpnKey} />
            </InputLeftElement>
            <Input
              variant="flushed"
              placeholder="密钥，通常包含 364 或 704 位字符，没有空格。"
              value={ekey}
              onChange={(e) => updateKey('ekey', e)}
            />
            <InputRightElement>
              <Text pl="2" color={ekey.length ? 'green.500' : 'red.500'}>
                <code>{ekey.length || '?'}</code>
              </Text>
            </InputRightElement>
          </InputGroup>
        </VStack>

        <IconButton
          aria-label="删除该密钥"
          icon={<Icon as={MdDelete} boxSize={6} />}
          variant="ghost"
          colorScheme="red"
          type="button"
          onClick={deleteKey}
        />
      </HStack>
    </ListItem>
  );
});
