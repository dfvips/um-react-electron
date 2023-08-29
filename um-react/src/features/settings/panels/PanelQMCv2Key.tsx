import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  List,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { qmc2AddKey, qmc2AllowFuzzyNameSearch, qmc2ClearKeys, qmc2ImportKeys } from '../settingsSlice';
import { selectStagingQMCv2Settings } from '../settingsSelector';
import React, { useState } from 'react';
import { MdAdd, MdDeleteForever, MdExpandMore, MdFileUpload } from 'react-icons/md';
import { QMCv2EKeyItem } from './QMCv2/QMCv2EKeyItem';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { ImportSecretModal } from '~/components/ImportSecretModal';
import { StagingQMCv2Key } from '../keyFormats';
import { DatabaseKeyExtractor } from '~/util/DatabaseKeyExtractor';
import { MMKVParser } from '~/util/MMKVParser';
import { getFileName } from '~/util/pathHelper';
import { InstructionsIOS } from './QMCv2/InstructionsIOS';
import { InstructionsMac } from './QMCv2/InstructionsMac';
import { InstructionsPC } from './QMCv2/InstructionsPC';
import { AndroidADBPullInstruction } from '~/components/AndroidADBPullInstruction/AndroidADBPullInstruction';

export function PanelQMCv2Key() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { keys: qmc2Keys, allowFuzzyNameSearch } = useSelector(selectStagingQMCv2Settings);
  const [showImportModal, setShowImportModal] = useState(false);

  const addKey = () => dispatch(qmc2AddKey());
  const clearAll = () => dispatch(qmc2ClearKeys());

  const handleAllowFuzzyNameSearchCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(qmc2AllowFuzzyNameSearch({ enable: e.target.checked }));
  };

  const handleSecretImport = async (file: File) => {
    try {
      const fileBuffer = await file.arrayBuffer();

      let qmc2Keys: null | Omit<StagingQMCv2Key, 'id'>[] = null;

      if (/[_.]db$/i.test(file.name)) {
        const extractor = await DatabaseKeyExtractor.getInstance();
        qmc2Keys = extractor.extractQmAndroidDbKeys(fileBuffer);
        if (!qmc2Keys) {
          alert(`不是支持的 SQLite 数据库文件。\n表名：${qmc2Keys}`);
          return;
        }
      } else if (/MMKVStreamEncryptId|filenameEkeyMap/i.test(file.name)) {
        const fileBuffer = await file.arrayBuffer();
        const map = MMKVParser.toStringMap(new DataView(fileBuffer));
        qmc2Keys = Array.from(map.entries(), ([name, ekey]) => ({ name: getFileName(name), ekey }));
      }

      if (qmc2Keys?.length === 0) {
        toast({
          title: '未导入密钥',
          description: '选择的密钥数据库文件未发现任何可用的密钥。',
          isClosable: true,
          status: 'warning',
        });
      } else if (qmc2Keys) {
        dispatch(qmc2ImportKeys(qmc2Keys));
        setShowImportModal(false);
        toast({
          title: `导入成功 (${qmc2Keys.length})`,
          description: '记得保存更改来应用。',
          isClosable: true,
          status: 'success',
        });
      } else {
        alert(`不支持的文件：${file.name}`);
      }
    } catch (e) {
      console.error('error during import: ', e);
      alert(`导入数据库时发生错误：${e}`);
    }
  };

  return (
    <Flex minH={0} flexDir="column" flex={1}>
      <Heading as="h2" size="lg">
        QMCv2 解密密钥
      </Heading>

      <Text>
        QQ 音乐目前采用的加密方案（QMCv2）。在使用「QQ 音乐」安卓、Mac 或 iOS
        客户端的情况下，其「离线加密文件」对应的「密钥」储存在独立的数据库文件内。
      </Text>

      <HStack pb={2} pt={2}>
        <ButtonGroup isAttached colorScheme="purple" variant="outline">
          <Button onClick={addKey} leftIcon={<Icon as={MdAdd} />}>
            添加一条密钥
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<MdExpandMore />}></MenuButton>
            <MenuList>
              <MenuItem onClick={() => setShowImportModal(true)} icon={<Icon as={MdFileUpload} boxSize={5} />}>
                从文件导入密钥…
              </MenuItem>
              <MenuDivider />
              <MenuItem color="red" onClick={clearAll} icon={<Icon as={MdDeleteForever} boxSize={5} />}>
                清空密钥
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>

        <HStack>
          <Checkbox isChecked={allowFuzzyNameSearch} onChange={handleAllowFuzzyNameSearchCheckbox}>
            <Text>匹配相似文件名</Text>
          </Checkbox>
          <Tooltip
            hasArrow
            closeOnClick={false}
            label={
              <Box>
                <Text>若文件名匹配失败，则使用相似文件名的密钥。</Text>
                <Text>
                  使用「
                  <ruby>
                    莱文斯坦距离
                    <rp> (</rp>
                    <rt>Levenshtein distance</rt>
                    <rp>)</rp>
                  </ruby>
                  」算法计算相似程度。
                </Text>
                <Text>若密钥数量过多，匹配时可能会造成浏览器卡顿或无响应一段时间。</Text>
                <Text>若不确定，请勾选该项。</Text>
              </Box>
            }
          >
            <InfoOutlineIcon />
          </Tooltip>
        </HStack>
      </HStack>

      <Box flex={1} minH={0} overflow="auto" pr="4">
        <List spacing={3}>
          {qmc2Keys.map(({ id, ekey, name }, i) => (
            <QMCv2EKeyItem key={id} id={id} ekey={ekey} name={name} i={i} />
          ))}
        </List>
        {qmc2Keys.length === 0 && <Text>还没有添加密钥。</Text>}
      </Box>

      <ImportSecretModal
        clientName="QQ 音乐"
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleSecretImport}
      >
        <TabList>
          <Tab>安卓</Tab>
          <Tab>iOS</Tab>
          <Tab>Mac</Tab>
          <Tab>Windows</Tab>
        </TabList>
        <TabPanels flex={1} overflow="auto">
          <TabPanel>
            <AndroidADBPullInstruction dir="/data/data/com.tencent.qqmusic/databases" file="player_process_db" />
          </TabPanel>
          <TabPanel>
            <InstructionsIOS />
          </TabPanel>
          <TabPanel>
            <InstructionsMac />
          </TabPanel>
          <TabPanel>
            <InstructionsPC />
          </TabPanel>
        </TabPanels>
      </ImportSecretModal>
    </Flex>
  );
}
