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
import { qmc2DeleteKey, qmc2UpdateKey } from '../../settingsSlice';
import { useAppDispatch } from '~/hooks';
import { memo } from 'react';

export const QMCv2EKeyItem = memo(({ id, name, ekey, i }: { id: string; name: string; ekey: string; i: number }) => {
  const dispatch = useAppDispatch();

  const updateKey = (prop: 'name' | 'ekey', e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(qmc2UpdateKey({ id, field: prop, value: e.target.value }));
  const deleteKey = () => dispatch(qmc2DeleteKey({ id }));

  return (
    <ListItem mt={0} pt={2} pb={2} _even={{ bg: 'gray.50' }}>
      <HStack>
        <Text w="2em" textAlign="center">
          {i + 1}
        </Text>

        <VStack flex={1}>
          <Input
            variant="flushed"
            placeholder="文件名，包括后缀名。如 “AAA - BBB.mflac”"
            value={name}
            onChange={(e) => updateKey('name', e)}
          />

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
