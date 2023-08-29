import {
  chakra,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { PanelQMCv2Key } from './panels/PanelQMCv2Key';
import { useState } from 'react';
import { MdExpandMore, MdMenu, MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { commitStagingChange, discardStagingChanges } from './settingsSlice';
import { PanelKWMv2Key } from './panels/PanelKWMv2Key';
import { selectIsSettingsNotSaved } from './settingsSelector';

const TABS: { name: string; Tab: () => JSX.Element }[] = [
  { name: 'QMCv2 密钥', Tab: PanelQMCv2Key },
  { name: 'KWMv2 密钥', Tab: PanelKWMv2Key },
  {
    name: '其它／待定',
    Tab: () => <Text>这里空空如也～</Text>,
  },
];

export function Settings() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isLargeWidthDevice =
    useBreakpointValue({
      base: false,
      lg: true,
    }) ?? false;

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
  };
  const handleResetSettings = () => {
    dispatch(discardStagingChanges());

    toast({
      status: 'info',
      title: '未储存的设定已舍弃',
      description: '已还原到更改前的状态。',
      isClosable: true,
    });
  };
  const handleApplySettings = () => {
    dispatch(commitStagingChange());
    toast({
      status: 'success',
      title: '设定已应用',
      isClosable: true,
    });
  };
  const isSettingsNotSaved = useAppSelector(selectIsSettingsNotSaved);

  return (
    <Flex flexDir="column" flex={1}>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<MdMenu />}
          rightIcon={<MdExpandMore />}
          colorScheme="gray"
          variant="outline"
          w="full"
          flexShrink={0}
          hidden={isLargeWidthDevice}
          mb="4"
        >
          {TABS[tabIndex].name}
        </MenuButton>
        <Portal>
          <MenuList w="100px">
            {TABS.map(({ name }, i) => (
              <MenuItem key={name} onClick={() => setTabIndex(i)}>
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>

      <Tabs
        orientation={isLargeWidthDevice ? 'vertical' : 'horizontal'}
        align="start"
        variant="line-i"
        display="flex"
        flex={1}
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList hidden={!isLargeWidthDevice} minW="8em" width="8em" textAlign="right" justifyContent="center">
          {TABS.map(({ name }) => (
            <Tab key={name}>{name}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {TABS.map(({ name, Tab }) => (
            <Flex as={TabPanel} flex={1} flexDir="column" h="100%" key={name}>
              <Flex h="100%" flex={1} minH={0}>
                <Tab />
              </Flex>

              <VStack mt="4" alignItems="flex-start" w="full">
                <Flex flexDir="row" gap="2" w="full">
                  <Center>
                    {isSettingsNotSaved ? (
                      <Box color="gray">
                        有未储存的更改{' '}
                        <chakra.span color="red" wordBreak="keep-all">
                          设定将在保存后生效
                        </chakra.span>
                      </Box>
                    ) : (
                      <Box color="gray">设定将在保存后生效</Box>
                    )}
                  </Center>
                  <Spacer />
                  <HStack gap="2" justifyContent="flex-end">
                    <IconButton
                      icon={<Icon as={MdOutlineSettingsBackupRestore} />}
                      onClick={handleResetSettings}
                      colorScheme="red"
                      variant="ghost"
                      title="放弃未储存的更改，将设定还原为储存前的状态。"
                      aria-label="放弃未储存的更改"
                    />
                    <Button onClick={handleApplySettings}>保存</Button>
                  </HStack>
                </Flex>
              </VStack>
            </Flex>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
